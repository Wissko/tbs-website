// Records the project sites that play on the case openings' Mac (public/motion/{eva,kobble,wissem}.mp4).
//   PLAYWRIGHT=<path to playwright> FFMPEG=<ffmpeg.exe> node scripts/captures/films.cjs [id ...]
//
// The first recordings came from Playwright's recorder (VP8 at 1 Mbit/s, 1280 × 800): blocky and blurred, text smeared.
// These are drawn frame by frame instead, at 2560 × 1600 (a 1280 × 800 window at scale 2) and 30 fps, under Chrome's
// virtual time: the page's clock (timers, animation frames) moves exactly one frame between two screenshots, however
// long a screenshot takes, so scrolls and animations come out even. CSS animations and media follow the same clock
// (see CLOCK). The scale is forced on the browser (an emulated one gives 1× screenshots), and Chrome runs on the GPU.
// Floating widgets are hidden; the scroll bar too. The film is delivered at 1920 × 1200, drawn down from the 2× frames:
// the opening's Mac screen is 500 to 900 CSS px wide, so this covers it on Retina screens and keeps text supersampled.
const fs = require('fs');
const os = require('os');
const path = require('path');
const {execFileSync} = require('child_process');
const {chromium} = require(process.env.PLAYWRIGHT || 'playwright');

const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const pub = path.join(__dirname, '..', '..', 'public', 'motion');
const FPS = 30;
const FRAME = 1000 / FPS;
const VIEW = {width: 1280, height: 800};

const ease = x => x <= 0 ? 0 : x >= 1 ? 1 : x < .5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
/** Scroll from `from` to `to` (px, or a selector's top minus `offset`) between two times, eased. */
const glide = (start, end, to, offset = 0) => ({start, end, to, offset});

/**
 * `warm` loads the page once first, so the recorded load comes from cache. `fromLoad` records from the navigation
 * itself (Eva's opening is part of the film) and `skip` drops its first seconds; otherwise the page settles for `settle`
 * ms of real time and the film starts on it. `scroll` lists glides; `act` lists clicks at a time (dblclick for Wissem
 * OS, whose windows open on double click).
 */
const sites = {
  eva: {
    url: 'https://eva-meszoly-v2.vercel.app/', fromLoad: true, skip: 3.0, seconds: 8.4, hide: '.cursor-gold',
    // The covers drop between the two halves of the name (the film opens on the first ones, which the opening's still
    // shows), the curtain lifts on the showreel, then the page glides to the project grid.
    scroll: [glide(6.2, 7.8, 'h2.display-name', 40)],
  },
  kobble: {
    url: 'https://kobble-cottage.vercel.app/', settle: 9000, seconds: 6.4, hide: '.sticky-cta',
    // The arrival film under the header, then the page glides to the rooms.
    scroll: [glide(1.4, 3.6, '.showcase', 110)],
  },
  wissem: {
    url: 'https://portfolio-peach-five-wlgkr5fj19.vercel.app/', settle: 2500, seconds: 6,
    // The desktop, then Projects opens.
    act: [{at: 1.2, dblclick: 'text=Projects'}],
  },
};

/**
 * Runs before the page's own scripts: media and CSS animations wait for the film's clock instead of the wall clock
 * (virtual time drives timers and animation frames, not CSS animations, which would otherwise finish between two
 * screenshots). Each animation is paused and set to the time since it appeared; past its end it is finished, so its
 * events still fire.
 */
const CLOCK = `(() => {
  const P = HTMLMediaElement.prototype, pause = P.pause;
  P.play = function () { this.__playing = true; pause.call(this); return Promise.resolve(); };
  P.pause = function () { this.__playing = false; pause.call(this); };
  Object.defineProperty(P, 'paused', {configurable: true, get() { return !(this.__playing ?? this.autoplay); }});
  window.__stepMedia = dt => {
    for (const v of document.querySelectorAll('video')) {
      pause.call(v);
      if (!(v.__playing ?? v.autoplay) || v.readyState < 1 || !v.duration) continue;
      const t = v.currentTime + dt;
      v.currentTime = v.loop ? t % v.duration : Math.min(t, v.duration - .001);
    }
  };
  window.__stepAnimations = () => {
    const now = performance.now();
    for (const a of document.getAnimations()) {
      if (a.__done) continue;
      if (a.__start === undefined) {
        // Found already over (a settled page): left as it is. Found running: taken over where it stands.
        if (a.playState === 'finished') { a.__done = true; continue; }
        a.__start = now - (Number(a.currentTime) || 0) / (a.playbackRate || 1);
      }
      a.pause();
      const t = (now - a.__start) * (a.playbackRate || 1);
      const end = a.effect ? a.effect.getComputedTiming().endTime : Infinity;
      if (t >= end) { a.__done = true; a.finish(); } else a.currentTime = t;
    }
  };
})();`;

async function record(id, site, frames) {
  const t0 = Date.now();
  const log = text => console.log(`${id} ${String(Math.round((Date.now() - t0) / 1000)).padStart(4)} s  ${text}`);
  const browser = await chromium.launch({
    channel: 'chrome',
    // Animations stay on the main thread: setting a compositor animation's time while the clock stands still stalls the
    // next screenshot for good.
    args: ['--hide-scrollbars', '--force-device-scale-factor=2', `--window-size=${VIEW.width + 18},${VIEW.height + 96}`,
      '--enable-gpu', '--ignore-gpu-blocklist', '--use-angle=d3d11', '--mute-audio',
      '--disable-threaded-animation', '--disable-threaded-scrolling', '--run-all-compositor-stages-before-draw', '--disable-checker-imaging'],
  });
  const context = await browser.newContext({viewport: null});
  if (site.fromLoad) {
    // A first visit fills the cache, every film of the page included, so the recorded load does not wait on the network.
    const warm = await context.newPage();
    await warm.goto(site.url, {waitUntil: 'networkidle', timeout: 90000}).catch(() => {});
    log('warm: page loaded');
    await warm.evaluate(() => Promise.all([...document.querySelectorAll('video')].map(v => new Promise(done => {
      v.preload = 'auto';
      v.addEventListener('canplaythrough', done, {once: true});
      setTimeout(done, 30000);
      v.load();
    }))));
    await warm.close();
    log('warm: films cached');
  }
  await context.addInitScript(CLOCK);
  const page = await context.newPage();
  const inner = await page.evaluate(() => [innerWidth, innerHeight, devicePixelRatio]);
  if (inner.join() !== `${VIEW.width},${VIEW.height},2`) throw new Error(`${id}: window is ${inner}`);
  const cdp = await context.newCDPSession(page);
  const js = expression => cdp.send('Runtime.evaluate', {expression, returnByValue: true}).then(r => r.result.value);
  const advance = ms => new Promise(resolve => {
    cdp.once('Emulation.virtualTimeBudgetExpired', resolve);
    cdp.send('Emulation.setVirtualTimePolicy', {policy: 'advance', budget: ms});
  });
  const hide = `html{scrollbar-width:none;scroll-behavior:auto!important}::-webkit-scrollbar{display:none}${site.hide ? `${site.hide}{display:none!important}` : ''}`;
  const style = `(() => { const s = document.createElement('style'); s.textContent = ${JSON.stringify(hide)}; document.head.append(s); })()`;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  /** One frame of the film's clock: media one frame on (their seeks let through in 1 ms steps), the rest of the frame, animations set. */
  const tick = async (media = true) => {
    if (media) await js(`__stepMedia(${1 / FPS})`);
    let used = 0;
    while (used < 20 && await js('[...document.querySelectorAll("video")].some(v => v.seeking)')) { await wait(15); await advance(1); used++; }
    await advance(FRAME - used);
    await js('__stepAnimations()');
  };

  if (site.fromLoad) {
    await page.goto(site.url, {waitUntil: 'commit'});
    await cdp.send('Emulation.setVirtualTimePolicy', {policy: 'pause'});
    // The document arrives while the clock stands still (its animations held from their first instant), the films load
    // from the cache, then the clock runs to the first kept frame.
    for (let i = 0; i < 200 && !(await js('document.readyState === "complete" && document.fonts.status === "loaded"')); i++) { await js('__stepAnimations()'); await wait(50); }
    log(`load: ${await js('document.readyState')}`);
    await js(style);
    await js('document.querySelectorAll("video").forEach(v => { if (v.readyState < 2) { v.preload = "auto"; v.load(); } })');
    for (let i = 0; i < 300 && !(await js('[...document.querySelectorAll("video")].every(v => v.readyState >= 2)')); i++) { await js('__stepAnimations()'); await wait(50); await advance(1); }
    log(`load: films ${await js('[...document.querySelectorAll("video")].map(v => v.readyState).join("")')}`);
    for (let t = 0; t < site.skip * 1000; t += FRAME) await tick();
    log('load: skipped');
  } else {
    await page.goto(site.url, {waitUntil: 'networkidle', timeout: 90000}).catch(() => {});
    await page.evaluate(style);
    await page.waitForTimeout(site.settle);
    await page.evaluate(() => scrollTo(0, 0));
  }
  // Where each click lands, found while the clock still runs (Playwright's own calls wait on it).
  const acts = [];
  for (const a of site.act || []) {
    const box = await page.locator(a.dblclick).first().boundingBox();
    acts.push({frame: Math.round(a.at * FPS), x: box.x + box.width / 2, y: box.y + box.height / 2});
  }
  if (!site.fromLoad) {
    await cdp.send('Emulation.setVirtualTimePolicy', {policy: 'pause'});
    await js('__stepAnimations()');
  }

  const count = Math.round(site.seconds * FPS);
  const glides = (site.scroll || []).map(g => ({...g, target: null}));
  let from = await js('scrollY');
  const started = Date.now();
  for (let f = 0; f < count; f++) {
    const t = f / FPS;
    let y = null;
    for (const g of glides.filter(g => t >= g.start)) {
      // A glide measures its target as it starts, once the page above has settled.
      if (g.target === null) {
        g.from = from;
        g.target = typeof g.to === 'number' ? g.to : await js(`Math.round(document.querySelector(${JSON.stringify(g.to)}).getBoundingClientRect().top + scrollY - ${g.offset})`);
      }
      y = g.from + (g.target - g.from) * ease((t - g.start) / (g.end - g.start));
      from = t >= g.end ? g.target : from;
    }
    if (y !== null) await js(`scrollTo({top: ${y.toFixed(2)}, behavior: 'instant'})`);
    for (const a of acts.filter(a => a.frame === f)) {
      await js(`(() => { const el = document.elementFromPoint(${a.x}, ${a.y}); for (const [type, detail] of [['mousedown', 1], ['mouseup', 1], ['click', 1], ['mousedown', 2], ['mouseup', 2], ['click', 2], ['dblclick', 2]]) el.dispatchEvent(new MouseEvent(type, {bubbles: true, cancelable: true, view: window, detail, clientX: ${a.x}, clientY: ${a.y}})); })()`);
    }
    await tick(f > 0);
    const {data} = await cdp.send('Page.captureScreenshot', {format: 'png'});
    fs.writeFileSync(path.join(frames, `${String(f).padStart(4, '0')}.png`), Buffer.from(data, 'base64'));
  }
  console.log(`${id}: ${count} frames in ${Math.round((Date.now() - started) / 1000)} s`);
  await browser.close();
}

(async () => {
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(sites);
  for (const id of ids) {
    const frames = fs.mkdtempSync(path.join(os.tmpdir(), `tbs-film-${id}-`));
    await record(id, sites[id], frames);
    execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', path.join(frames, '%04d.png'),
      '-vf', 'scale=1920:1200:flags=lanczos', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'veryslow', '-crf', '20', '-level', '5.1', '-g', String(FPS * 2),
      '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart',
      path.join(pub, `${id}.mp4`)], {stdio: 'inherit'});
    if (process.env.KEEP) console.log(`frames kept in ${frames}`);
    else fs.rmSync(frames, {recursive: true, force: true});
    console.log(`${id}.mp4`.padEnd(12), `${Math.round(fs.statSync(path.join(pub, `${id}.mp4`)).size / 1024)} KB`);
  }
})();

// Device mockups of the project sites: an iPhone-like phone (status bar, island), a MacBook-like laptop and a browser
// window, drawn in CSS and rendered with Chrome on each project's colour.
//   PLAYWRIGHT=<path to playwright> CHROME=<chrome.exe> node scripts/mockups/build.cjs <captures> [id ...]
//   FOLDER=<dir> … writes the full set for retouching instead: every composition at 3200 × 2000 (2400 × 3000 for the
//   tilted phone) with film grain, plus the device screenshots (Mac 2880 × 1800, iPhone 1179 × 2556 with status bar).
// <captures> is the folder written by scripts/captures/devices.cjs.
//
// Site output, public/projects/mockups/<id>-<name>, without grain (the site lays its own):
//   opening       Mac and iPhone, 16:10: case opening, next-project chaining, services
//   base, layer   the opening without the phone, and the phone alone (transparent), for projects whose recording plays on
//                 the Mac screen (OPENING_SCREEN, kept in step with .scene__screen in pages.css)
//   wide          every screen in perspective
//   pair-1/2      two browser windows; the Mac face on (Loyalty Pass: the pass beside the phone)
//   closing       three iPhones
//   phone         the iPhone upright, transparent, for the case chapter
//   tile          the iPhone tilted, 4:5: tiles and menu
//   identity      the logo the studio designed, on paper, beside its colours (sampled from the logo file)
const fs = require('fs');
const path = require('path');
const {chromium} = require(process.env.PLAYWRIGHT || 'playwright');
const sharp = require('sharp');

const captures = process.argv[2];
if (!captures) throw new Error('Usage: node scripts/mockups/build.cjs <captures> [id ...]');
const only = process.argv.slice(3);
const folder = process.env.FOLDER;
const root = path.join(__dirname, '..', '..');
const site = path.join(root, 'public', 'projects', 'mockups');
const work = fs.mkdtempSync(path.join(require('os').tmpdir(), 'tbs-mockups-'));
const url = file => 'file:///' + path.resolve(file).replace(/\\/g, '/');
const FONT = url(path.join(root, 'public', 'fonts', 'public-sans-latin.woff2'));
const GRAIN = url(path.join(root, 'public', 'brand', 'grain.png'));

/**
 * Which captured screens each composition shows. `tilt` alternates so neighbouring tiles lean apart; `motion` names the
 * recording (public/motion) that plays on the opening's Mac.
 */
const projects = {
  eva: {bg: '#141414', domain: 'eva-meszoly-v2.vercel.app', motion: 'eva', tilt: 8,
    opening: {mac: '01', iphone: '02'}, three: ['07', '05', '10'], tile: '02', phone: '01', windows: ['03', '04'], face: '05', perspective: true},
  kobble: {bg: '#efe4d3', domain: 'kobble-cottage.vercel.app', motion: 'kobble', tilt: -8,
    opening: {mac: '02', iphone: '04'}, three: ['03', '05', '07'], tile: '12', phone: '03', windows: ['06', '07'], face: '04', perspective: true},
  wissem: {bg: '#235bd6', domain: 'portfolio-peach-five-wlgkr5fj19.vercel.app', motion: 'wissem', tilt: -8,
    opening: {mac: '01', iphone: '01'}, three: ['01', 'about', 'projects'], tile: 'about', phone: '01', windows: ['about', 'projects'], face: 'about'},
  niumi: {bg: '#d5222a', domain: 'niumidistributors.com', tilt: 8,
    opening: {mac: '01', iphone: '01'}, three: ['04', '06', '10'], tile: '06', phone: '01', windows: ['03', '04'], face: '03', perspective: true},
  // The studio designed the Blue Pacific logo (confirmed by the owner, 2026-10-08).
  bluepacific: {bg: '#062f63', domain: 'bluepacifictradesolutions.com', tilt: -8,
    identity: [['Navy', '#010D2A'], ['Deep blue', '#052369'], ['Blue', '#0569C5']],
    opening: {mac: '01', iphone: '01'}, three: ['01', '03', '06'], tile: '02', phone: '01', windows: ['02', '03'], face: '02', perspective: true},
  // The owner's app captures (demonstration data): admin workspace on the Mac, merchant app on the phones.
  loyalty: {bg: '#060f90', label: 'Loyalty Pass · Admin workspace', tilt: -7,
    opening: {mac: '01', iphone: '01'}, three: ['06', '04', '02'], tile: '01', phone: '05', windows: ['01', '02'], pass: true, perspective: true},
  // The real CRM, from the owner's anonymised captures: only the screens an audit cleared, the user's name painted out
  // (scripts/captures/devices.cjs). 01 cockpit, 02 reports, 03 Howard Prime, 04 data model, 05 reports settings,
  // 06 record layout, 07 sign-in.
  howard: {bg: '#cbd0d6', label: 'Howard Partners · CRM', tilt: -4,
    opening: {mac: '01', iphone: '03'}, three: ['01', '03', '02'], tile: '01', phone: '07', windows: ['02', '04'], face: '03', perspective: true},
};

/** The Mac screen inside the opening, in % of the scene (laptop at 224, 150, zoom .69, screen inset 22, 24, 1440 × 900). */
const OPENING_SCREEN = {left: (224 + 22 * .69) / 16, top: (150 + 24 * .69) / 10, width: 1440 * .69 / 16, height: 900 * .69 / 10};

/** Dominant colour of a screenshot's top or bottom rows (the page's own ground, not a picture crossing it). */
async function edge(file, where) {
  const {width, height} = await sharp(file).metadata();
  const {data} = await sharp(file).extract({left: 0, top: where === 'top' ? 0 : height - 9, width, height: 9}).removeAlpha().raw().toBuffer({resolveWithObject: true});
  const buckets = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const key = (data[i] >> 4) << 8 | (data[i + 1] >> 4) << 4 | data[i + 2] >> 4;
    const bucket = buckets.get(key) || [0, 0, 0, 0];
    bucket[0] += data[i]; bucket[1] += data[i + 1]; bucket[2] += data[i + 2]; bucket[3]++;
    buckets.set(key, bucket);
  }
  const top = [...buckets.values()].sort((x, y) => y[3] - x[3])[0];
  const [r, g, b] = top.slice(0, 3).map(v => Math.round(v / top[3]));
  return {color: `rgb(${r},${g},${b})`, dark: (.2126 * r + .7152 * g + .0722 * b) / 255 < .55};
}

const SIGNAL = '<svg width="19" height="12" viewBox="0 0 19 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx="1"/><rect x="5" y="5" width="3.2" height="7" rx="1"/><rect x="10" y="2.5" width="3.2" height="9.5" rx="1"/><rect x="15" y="0" width="3.2" height="12" rx="1"/></svg>';
const WIFI = '<svg width="17" height="12" viewBox="0 0 17 12"><path d="M8.5 2.3c2.4 0 4.6.9 6.3 2.5l1.3-1.3C14.1 1.6 11.4.5 8.5.5S2.9 1.6.9 3.5l1.3 1.3C3.9 3.2 6.1 2.3 8.5 2.3zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.3-1.3C12.2 4.8 10.4 4.1 8.5 4.1s-3.7.7-5 1.9l1.3 1.3c1-.9 2.3-1.4 3.7-1.4zm0 3.5c-.6 0-1.2.2-1.6.6l1.6 1.7 1.6-1.7c-.4-.4-1-.6-1.6-.6z"/></svg>';
const BATTERY = '<svg width="28" height="13" viewBox="0 0 28 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2.4"/><path d="M25 4.4v4.2c.9-.3 1.5-1.1 1.5-2.1s-.6-1.8-1.5-2.1z" fill-opacity=".45"/></svg>';
const LOCK = '<svg width="11" height="14" viewBox="0 0 11 14"><path d="M5.5 0C3.3 0 1.8 1.6 1.8 3.8V6H1C.4 6 0 6.4 0 7v6c0 .6.4 1 1 1h9c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1h-.8V3.8C9.2 1.6 7.7 0 5.5 0zm0 1.6c1.3 0 2.1.9 2.1 2.2V6H3.4V3.8c0-1.3.8-2.2 2.1-2.2z"/></svg>';

const CSS = `
@font-face { font-family: 'Public Sans'; src: url('${FONT}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: var(--w); height: var(--h); overflow: hidden; }
body { position: relative; background: var(--canvas); font-family: 'Public Sans', sans-serif; }
body.grain::after { content: ''; position: absolute; inset: 0; z-index: 50; background: url('${GRAIN}'); opacity: .05; mix-blend-mode: overlay; pointer-events: none; }
.place { position: absolute; }

/* Phone: 393 × 852 screen, 54 pt status bar, island, home indicator, titanium band and buttons. */
.phone { position: relative; width: 423px; height: 882px; padding: 4px; border-radius: 70px;
  background: linear-gradient(140deg, #5a5a60 0%, #232326 16%, #6a6a70 42%, #1f1f22 68%, #5f5f65 100%);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), inset 0 0 2px 1px rgba(0,0,0,.6), var(--phone-shadow); }
.phone__btn { position: absolute; width: 4px; border-radius: 2px; background: linear-gradient(90deg, #2a2a2d, #7d7d83 50%, #2a2a2d); }
.phone__btn--action { left: -3px; top: 124px; height: 34px; }
.phone__btn--up { left: -3px; top: 186px; height: 62px; }
.phone__btn--down { left: -3px; top: 262px; height: 62px; }
.phone__btn--power { right: -3px; top: 222px; height: 100px; }
.phone__bezel { width: 100%; height: 100%; padding: 11px; border-radius: 66px; background: #050506; }
.phone__screen { position: relative; width: 393px; height: 852px; overflow: hidden; border-radius: 55px; background: var(--top); }
.status { display: flex; align-items: center; justify-content: space-between; height: 54px; padding: 4px 30px 0 52px; color: var(--ink); background: var(--top); }
.status__time { width: 54px; font-size: 17px; font-weight: 600; letter-spacing: -.01em; text-align: center; }
.status__icons { display: flex; gap: 6px; align-items: center; fill: currentColor; }
.phone__screen img { display: block; width: 393px; height: 798px; }
.fit { position: relative; display: block; width: 393px; height: 798px; overflow: hidden; }
.phone__screen .fit img { position: absolute; inset: 0; width: 100%; height: 100%; }
.fit__under { object-fit: fill; }
.fit__over { object-fit: contain; }
/* A page captured as Safari shows it (390 × 664): Safari's bottom bar fills the rest of the screen. */
.safari { display: flex; flex-direction: column; width: 393px; height: 798px; background: #f6f6f6; }
.phone__screen .safari__page { flex: none; height: auto; }
.safari__bar { flex: 1; display: flex; flex-direction: column; padding: 8px 12px 0; background: #f6f6f6; border-top: .5px solid rgba(0,0,0,.16); }
.safari__url { display: flex; align-items: center; justify-content: space-between; height: 42px; padding: 0 14px; border-radius: 13px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.08); color: #111; font-size: 15px; }
.safari__url b { font-size: 16px; font-weight: 600; letter-spacing: -.02em; }
.safari__url span { display: flex; align-items: center; gap: 6px; font-weight: 500; }
.safari__url svg { fill: #3c3c43; }
.safari__icons { display: flex; justify-content: space-between; padding: 12px 16px 0; color: #007aff; }
.safari__icons svg { fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.safari__icons svg.off { color: #b4b4b8; }
.island { position: absolute; top: 11px; left: 50%; width: 124px; height: 36px; margin-left: -62px; border-radius: 20px; background: #000; }
.home { position: absolute; bottom: 8px; left: 50%; width: 138px; height: 5px; margin-left: -69px; border-radius: 3px; background: var(--home); }
.glare { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(118deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,0) 34%); pointer-events: none; }

/* Laptop: 1440 × 900 display in a black bezel with an aluminium edge, on a wider base with a thumb notch. */
.laptop { position: relative; width: 1484px; }
.laptop__lid { position: relative; padding: 24px 22px 34px; border-radius: 34px 34px 12px 12px; background: #0b0b0d;
  box-shadow: 0 0 0 2.5px #c6c8cb, 0 0 0 4px #8e9093, inset 0 0 0 1px #26262a; }
.laptop__cam { position: absolute; top: 9px; left: 50%; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #3b4b5e, #0b0e13 70%); }
.laptop__screen { width: 1440px; height: 900px; overflow: hidden; border-radius: 9px 9px 3px 3px; background: #000; }
.laptop__screen img { display: block; width: 100%; height: 100%; object-fit: cover; }
.laptop__base { position: relative; width: 1700px; height: 30px; margin-left: -108px; border-radius: 3px 3px 30px 30px / 3px 3px 24px 24px;
  background: linear-gradient(180deg, #f6f7f8 0%, #dfe1e3 16%, #c5c7ca 48%, #9b9da0 82%, #6c6e71 100%); }
.laptop__notch { position: absolute; top: 0; left: 50%; width: 250px; height: 11px; margin-left: -125px; border-radius: 0 0 14px 14px; background: linear-gradient(180deg, #a1a3a6, #d0d2d5); }
.laptop__shadow { position: absolute; z-index: -1; left: -150px; right: -150px; bottom: -40px; height: 60px; border-radius: 50%; background: rgba(0,0,0,var(--laptop-shadow)); filter: blur(22px); }
.laptop__lift { position: absolute; z-index: -1; inset: 40px 30px 0; border-radius: 40px; box-shadow: 0 50px 90px -30px rgba(0,0,0,var(--laptop-shadow)); }

/* Browser window: traffic lights and an address bar over a 1440 × 900 page. */
.window { position: relative; width: 1440px; overflow: hidden; border-radius: 16px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.14), var(--window-shadow); }
.window__bar { position: relative; display: flex; align-items: center; justify-content: center; height: 56px; background: linear-gradient(#f7f7f7, #ececec); border-bottom: 1px solid #d6d6d6; }
.window__dots { position: absolute; top: 50%; left: 22px; display: flex; gap: 9px; transform: translateY(-50%); }
.window__dots i { width: 13px; height: 13px; border-radius: 50%; box-shadow: inset 0 0 0 .6px rgba(0,0,0,.18); }
.window__url { display: flex; align-items: center; justify-content: center; gap: 8px; width: 560px; height: 32px; border-radius: 9px; background: #e1e1e3; color: #48484b; font-size: 14px; font-weight: 500; }
.window__url svg { fill: #6c6c70; }
.window img { display: block; width: 1440px; height: 900px; object-fit: cover; object-position: top; }

.card { display: block; box-shadow: var(--card-shadow); }
.paper { position: absolute; display: flex; align-items: center; justify-content: center; border-radius: 18px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.05), var(--card-shadow); }
.paper img { display: block; }
.swatch { position: absolute; display: flex; flex-direction: column; justify-content: flex-end; padding: 26px 28px; border-radius: 18px; color: #fff; box-shadow: var(--card-shadow); }
.swatch b { font-size: 24px; font-weight: 600; letter-spacing: -.01em; }
.swatch span { margin-top: 6px; font-size: 17px; font-weight: 500; letter-spacing: .04em; opacity: .8; }
.plane { position: absolute; top: 50%; left: 50%; display: flex; flex-direction: column; gap: 56px; transform-style: preserve-3d; }
.plane__row { display: flex; gap: 56px; align-items: flex-start; }
.plane__mac { width: 760px; height: 475px; object-fit: cover; border-radius: 14px; box-shadow: 0 0 0 1px rgba(0,0,0,.08), 30px 40px 60px rgba(0,0,0,.28); }
.plane__phone { width: 300px; height: 609px; object-fit: cover; object-position: top; border-radius: 34px; box-shadow: 0 0 0 1px rgba(0,0,0,.08), 30px 40px 60px rgba(0,0,0,.28); }
`;

const screenVars = shot => `--top:${shot.top.color};--ink:${shot.top.dark ? '#fff' : '#000'};--home:${shot.bottom.dark ? 'rgba(255,255,255,.92)' : 'rgba(0,0,0,.86)'}`;
const status = `<div class="status"><span class="status__time">9:41</span><span class="status__icons">${SIGNAL}${WIFI}${BATTERY}</span></div>`;
const SAFARI_ICONS = ['<path d="M14 5l-7 7 7 7"/>', '<path class="off" d="M10 5l7 7-7 7"/>', '<path d="M12 3v12M8 7l4-4 4 4M6 11v9h12v-9"/>', '<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14"/>', '<path d="M7 7h12v12H7zM4 4h12"/>']
  .map(d => `<svg width="24" height="24" viewBox="0 0 24 24"${d.includes('class="off"') ? ' class="off"' : ''}>${d.replace(' class="off"', '')}</svg>`).join('');
const RELOAD = '<svg width="16" height="16" viewBox="0 0 24 24" style="fill:none;stroke:#3c3c43;stroke-width:2.2;stroke-linecap:round"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/></svg>';
/**
 * The page under the status bar. A capture of the visible Safari viewport (390 × 664) gets Safari's bottom bar, with the
 * project's label in place of an address it has no public one for; another shape (an app shot at 390 × 844) is fitted,
 * its edges extended.
 */
const screenImg = shot => Math.abs(shot.ratio - 393 / 798) < .01
  ? `<img src="${url(shot.file)}" alt="">`
  : Math.abs(shot.ratio - 390 / 664) < .01
  ? `<span class="safari"><img class="safari__page" src="${url(shot.file)}" alt=""><span class="safari__bar"><span class="safari__url"><b>aA</b><span>${LOCK}${shot.label}</span>${RELOAD}</span><span class="safari__icons">${SAFARI_ICONS}</span></span></span>`
  : `<span class="fit"><img class="fit__under" src="${url(shot.file)}" alt=""><img class="fit__over" src="${url(shot.file)}" alt=""></span>`;
const phone = shot => `<div class="phone"><i class="phone__btn phone__btn--action"></i><i class="phone__btn phone__btn--up"></i><i class="phone__btn phone__btn--down"></i><i class="phone__btn phone__btn--power"></i>
<div class="phone__bezel"><div class="phone__screen" style="${screenVars(shot)}">${status}${screenImg(shot)}<span class="island"></span><span class="home"></span><span class="glare"></span></div></div></div>`;
const laptop = file => `<div class="laptop"><div class="laptop__lift"></div><div class="laptop__lid"><span class="laptop__cam"></span><div class="laptop__screen"><img src="${url(file)}" alt=""></div></div><div class="laptop__base"><span class="laptop__notch"></span></div><div class="laptop__shadow"></div></div>`;
/** A browser window; `label` replaces the address when the page has no public one. */
const browser = (file, {domain, label}) => `<div class="window"><div class="window__bar"><span class="window__dots"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></span><span class="window__url">${domain ? LOCK + domain : label}</span></div><img src="${url(file)}" alt=""></div>`;
const at = (style, inner) => `<div class="place" style="${style}">${inner}</div>`;
const zoom = (k, inner) => `<div style="zoom:${k}">${inner}</div>`;
const deep = bg => `radial-gradient(120% 95% at 50% 0%, color-mix(in srgb, ${bg} 84%, #fff) 0%, ${bg} 52%, color-mix(in srgb, ${bg} 82%, #000) 100%)`;
const soft = bg => `radial-gradient(120% 95% at 50% 0%, #fbfbfa 0%, color-mix(in srgb, ${bg} 9%, #f1f0ed) 70%, color-mix(in srgb, ${bg} 14%, #e7e5e1) 100%)`;
const WIDE = {w: 1600, h: 1000};
const TALL = {w: 1200, h: 1500};

/** Each scene: a canvas, its ground (dark grounds get deeper shadows) and its body. */
const scenes = {
  // Mac and iPhone together. `only` keeps one device (for the layered opening), `screen` replaces the Mac's picture.
  opening: (p, s, {only, screen} = {}) => ({...WIDE, canvas: deep(p.bg), dark: true, body:
    (only !== 'phone' ? at('left:224px;top:150px', zoom(.69, laptop(screen || s.mac(p.opening.mac)))) : '') +
    (only !== 'laptop' ? at('left:1171px;top:262px', zoom(.66, phone(s.iphone(p.opening.iphone)))) : '')}),
  three: (p, s) => ({...WIDE, canvas: soft(p.bg), dark: false, body:
    p.three.map((name, i) => at(`left:${203 + i * 419}px;top:${129 + (i === 1 ? -30 : 16)}px`, zoom(.84, phone(s.iphone(name))))).join('')}),
  tilted: (p, s) => ({...TALL, canvas: deep(p.bg), dark: true, body:
    at(`left:335px;top:198px;transform:rotate(${p.tilt}deg)`, zoom(1.25, phone(s.iphone(p.tile))))}),
  windows: (p, s) => ({...WIDE, canvas: soft(p.bg), dark: false, body:
    at('left:140px;top:104px', zoom(.6, browser(s.mac(p.windows[0]), p))) + at('left:506px;top:268px', zoom(.66, browser(s.mac(p.windows[1]), p)))}),
  face: (p, s) => ({...WIDE, canvas: soft(p.bg), dark: false, body: at('left:206px;top:116px', zoom(.8, laptop(s.mac(p.face))))}),
  perspective: (p, s) => {
    const macs = s.list('mac').slice(0, 6), phones = s.list('iphone').slice(0, 6);
    const rows = [macs.slice(0, 3), phones, macs.slice(3, 6)].filter(row => row.length);
    // Phone captures keep their own height (a Safari viewport is shorter than a full screen).
    const body = rows.map(row => `<div class="plane__row">${row.map(f => f.includes('-mac-') ? `<img class="plane__mac" src="${url(f)}" alt="">` : `<img class="plane__phone" style="height:auto;aspect-ratio:auto" src="${url(f)}" alt="">`).join('')}</div>`).join('');
    return {...WIDE, canvas: deep(p.bg), dark: true, body: `<div class="plane" style="transform:translate(-50%,-50%) scale(.62) rotateX(48deg) rotateZ(-32deg)">${body}</div>`};
  },
  // The iPhone upright and alone on a transparent ground, for the dark case chapter.
  upright: (p, s) => ({w: 560, h: 1040, canvas: 'transparent', dark: true, body: at('left:68px;top:46px', phone(s.iphone(p.phone)))}),
  // Loyalty Pass: the merchant app beside the pass (a product illustration, captioned as such on the card).
  pass: (p, s) => ({...WIDE, canvas: deep(p.bg), dark: true, body:
    at('left:452px;top:150px', zoom(.8, phone(s.iphone('01')))) +
    at('left:846px;top:176px;transform:rotate(7deg)', `<img class="card" src="${url(s.piece('loyalty-pass'))}" style="width:400px;border-radius:14px" alt="">`)}),
  // A logo the studio designed: on paper, as published, beside its colours.
  identity: (p, s) => ({...WIDE, canvas: soft(p.bg), dark: false, body:
    `<div class="paper" style="left:120px;top:150px;width:960px;height:700px"><img src="${url(s.logo)}" style="width:620px" alt=""></div>` +
    p.identity.map(([name, hex], i) => `<div class="swatch" style="left:1120px;top:${150 + i * 240}px;width:360px;height:220px;background:${hex}"><b>${name}</b><span>${hex}</span></div>`).join('')}),
};

function html({w, h, canvas, dark, body}, grain) {
  const vars = [`--w:${w}px`, `--h:${h}px`, `--canvas:${canvas}`,
    `--phone-shadow:0 2px 4px rgba(0,0,0,.3), 0 46px 80px -20px rgba(0,0,0,${dark ? .7 : .42}), 0 20px 34px -18px rgba(0,0,0,${dark ? .6 : .34})`,
    `--laptop-shadow:${dark ? .62 : .36}`,
    `--window-shadow:0 50px 90px -30px rgba(0,0,0,${dark ? .7 : .36}), 0 18px 36px -18px rgba(0,0,0,${dark ? .5 : .24})`,
    `--card-shadow:0 2px 4px rgba(0,0,0,.18), 0 40px 80px -24px rgba(0,0,0,${dark ? .7 : .4})`].join(';');
  return `<!doctype html><html><head><meta charset="utf-8"><style>:root{${vars}}${CSS}</style></head><body class="${grain ? 'grain' : ''}">${body}</body></html>`;
}

(async () => {
  const chrome = await chromium.launch({executablePath: process.env.CHROME || undefined});
  /** Renders a scene to JPEG (or PNG with `alpha`, on a transparent ground). */
  async function render(scene, file, {scale = 1.5, grain = false, alpha = false, quality = 84} = {}) {
    const page = await chrome.newPage({deviceScaleFactor: scale, viewport: {width: scene.w, height: scene.h}});
    const source = path.join(work, `${path.basename(file)}.html`);
    fs.writeFileSync(source, html(alpha ? {...scene, canvas: 'transparent'} : scene, grain));
    await page.goto(url(source), {waitUntil: 'load'});
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({type: 'png', omitBackground: alpha});
    await page.close();
    fs.mkdirSync(path.dirname(file), {recursive: true});
    if (alpha) await sharp(png).png({compressionLevel: 9, palette: false}).toFile(file);
    else await sharp(png).jpeg({quality, chromaSubsampling: '4:4:4', mozjpeg: true}).toFile(file);
  }

  for (const [id, p] of Object.entries(projects).filter(([id]) => !only.length || only.includes(id))) {
    const files = fs.readdirSync(captures).filter(f => f.startsWith(`${id}-`));
    const shots = {};
    for (const f of files.filter(f => f.startsWith(`${id}-iphone-`))) {
      const file = path.join(captures, f);
      const {width, height} = await sharp(file).metadata();
      const ratio = width / height;
      const safari = Math.abs(ratio - 390 / 664) < .01;
      shots[f.slice(`${id}-iphone-`.length, -4)] = {file, ratio, label: p.domain || p.label, top: await edge(file, 'top'), bottom: safari ? {color: '#f6f6f6', dark: false} : await edge(file, 'bottom')};
    }
    const s = {
      mac: name => path.join(captures, `${id}-mac-${name}.png`),
      iphone: name => shots[name],
      list: device => files.filter(f => f.startsWith(`${id}-${device}-`)).sort().map(f => path.join(captures, f)),
      piece: name => path.join(captures, `${name}.png`),
    };
    if (p.identity) {
      // The published logo carries transparent margins: trimmed so the paper centres the mark itself.
      s.logo = path.join(work, `${id}-logo.png`);
      await sharp(path.join(captures, `${id}-logo.png`)).trim({threshold: 1}).toFile(s.logo);
    }

    if (folder) {
      // The retouching set: every composition with grain, and the device screenshots.
      const dir = name => path.join(folder, id, name);
      for (const f of files.filter(f => f.startsWith(`${id}-mac-`))) {
        fs.mkdirSync(dir('mac'), {recursive: true});
        await sharp(path.join(captures, f)).jpeg({quality: 94, chromaSubsampling: '4:4:4', mozjpeg: true}).toFile(path.join(dir('mac'), f.replace('.png', '.jpg')));
      }
      for (const [name, shot] of Object.entries(shots)) {
        await render({w: 393, h: 852, canvas: shot.top.color, dark: false,
          body: `<div class="phone__screen" style="border-radius:0;${screenVars(shot)}">${status}${screenImg(shot)}<span class="home"></span></div>`},
        path.join(dir('iphone'), `${id}-iphone-${name}.jpg`), {scale: 3, quality: 94});
      }
      const named = [['1-mac-et-iphone', p.opening && 'opening'], ['2-trois-iphone', p.three && 'three'], ['3-iphone-incline', p.tile && 'tilted'],
        ['4-fenetres', p.windows && 'windows'], ['5-mac-de-face', p.face && 'face'], ['6-perspective', p.perspective && 'perspective'],
        ['pass-et-iphone', p.pass && 'pass'], ['7-identite', p.identity && 'identity']];
      for (const [name, scene] of named.filter(([, scene]) => scene)) {
        await render(scenes[scene](p, s), path.join(dir('mockups'), `${id}-${name}.jpg`), {scale: 2, grain: true, quality: 92});
      }
      console.log(id, 'folder done');
      continue;
    }

    const out = name => path.join(site, `${id}-${name}`);
    // A recording plays on the opening's Mac, so its first frame (the video poster) is what the Mac shows when still.
    const poster = p.motion && path.join(root, 'public', 'motion', `${p.motion}.webp`);
    await render(scenes.opening(p, s, {screen: poster}), out('opening.jpg'));
    if (p.motion) {
      await render(scenes.opening(p, s, {only: 'laptop', screen: poster}), out('base.jpg'));
      await render(scenes.opening(p, s, {only: 'phone'}), out('layer.png'), {alpha: true});
    }
    await render(scenes.upright(p, s), out('phone.png'), {alpha: true});
    await render(scenes.tilted(p, s), out('tile.jpg'), {scale: 1});
    if (p.perspective) await render(scenes.perspective(p, s), out('wide.jpg'));
    if (p.windows) await render(scenes.windows(p, s), out('pair-1.jpg'));
    if (p.face || p.pass) await render(p.face ? scenes.face(p, s) : scenes.pass(p, s), out('pair-2.jpg'));
    if (p.three) await render(scenes.three(p, s), out('closing.jpg'));
    if (p.identity) await render(scenes.identity(p, s), out('identity.jpg'));
    console.log(id, fs.readdirSync(site).filter(f => f.startsWith(`${id}-`)).join(' '));
  }
  await chrome.close();
  fs.rmSync(work, {recursive: true, force: true});
  console.log('opening screen (%):', Object.entries(OPENING_SCREEN).map(([k, v]) => `${k} ${v.toFixed(3)}`).join(', '));
})();

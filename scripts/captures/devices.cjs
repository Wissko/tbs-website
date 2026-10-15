// Captures each live project site the way the device mockups need it (scripts/mockups/build.cjs).
//   PLAYWRIGHT=<path to playwright> CHROME=<chrome.exe> [LOYALTY=<folder>] [HOWARD=<folder>] node scripts/captures/devices.cjs <out> [id ...]
// Mac: 1440 × 900 at scale 2 (2880 × 1800). iPhone: 393 × 798 at scale 3, the page under a 54 pt status bar that the
// mockups draw. Floating widgets are hidden and each screen starts at a section (tall sections in screen steps).
// Writes lossless PNG: <id>-mac-01.png …, <id>-iphone-01.png …, plus the Loyalty Pass card from the previous studio
// site, straightened, at scale 3.
// The Howard Partners CRM is private: its screens are the owner's anonymised captures (HOWARD=<folder>), and only the
// ones an audit found free of client data are taken (2026-10-08). The user's name is painted out on each (desktop
// sidebar footer, phone header). Phone captures there are Safari's visible viewport (390 × 664).
// Loyalty Pass shows only a sign-in publicly: its screens are the owner's captures of the app with demonstration data
// (LOYALTY=<folder holding admin/ and merchant/>, each labelled DEMO DATA), copied in; desktop ones are cut to the Mac's
// 16:10 from the top, phone ones (390 × 844) are fitted under the status bar by the mockups.
// Logos the studio designed are fetched as published (<id>-logo.png) for the identity boards.
const fs = require('fs');
const path = require('path');
const {chromium} = require(process.env.PLAYWRIGHT || 'playwright');
const sharp = require('sharp');

const out = process.argv[2];
if (!out) throw new Error('Usage: node scripts/captures/devices.cjs <out> [id ...]');
const only = process.argv.slice(3);

/** `hide` drops floating widgets; `sections` lists the blocks to stop at; `header` is a sticky header to stop under. */
const sites = [
  {id: 'eva', url: 'https://eva-meszoly-v2.vercel.app/', pre: 9000, hide: '.cursor-gold', film: {name: 'hero-tpur', at: 1.5}},
  {id: 'kobble', url: 'https://kobble-cottage.vercel.app/', pre: 9000, hide: '.sticky-cta', sections: 'section, footer'},
  // Wissem OS is one desktop; its windows open on double click (a tap on phones), each from a fresh load.
  {id: 'wissem', url: 'https://portfolio-peach-five-wlgkr5fj19.vercel.app/', pre: 2500, extra: [{name: 'about', click: 'text=About Me'}, {name: 'projects', click: 'text=Projects'}]},
  {id: 'niumi', url: 'https://niumidistributors.com/', pre: 2500, hide: 'aside.fixed', sections: 'section, footer', header: 'header'},
  {id: 'bluepacific', url: 'https://bluepacifictradesolutions.com/', pre: 2500, sections: 'section, footer'},
];
const logos = [['bluepacific', 'https://bluepacifictradesolutions.com/images/bpts-logo-transparent.png']];
const loyalty = {
  mac: ['admin/desktop-01-network-overview.png', 'admin/desktop-02-merchant-insights.png'],
  iphone: ['merchant/mobile-01-overview.png', 'merchant/mobile-02-clients.png', 'merchant/mobile-03-activity.png', 'merchant/mobile-04-offers.png',
    'merchant/mobile-05-rewards.png', 'merchant/mobile-06-scanner.png', 'merchant/mobile-07-profile.png', 'merchant/mobile-04-offers-history.png',
    'admin/mobile-01-network-overview.png', 'admin/mobile-02-merchant-insights.png'],
};
// Screens cleared by the anonymisation audit (amounts are fictional, the owner confirmed): the cockpit, the reports, the
// AI copilot, the data model, the reports and record layout settings, the sign-in. The others still carried client
// names, internal addresses or identifiers.
const howard = ['01-pilotage/01-tableau-de-bord', '01-pilotage/04-rapports', '06-howard-prime/01-howard-prime', '07-parametres/04-parametres-modele',
  '07-parametres/08-parametres-rapports', '07-parametres/03-parametres-fiches', '00-connexion/01-connexion'];
/** Paints the signed-in user's name out: the sidebar footer on desktop, the line under the logo on phones. */
const masks = {
  mac: [{left: 0, top: 1660, width: 446, height: 140, colour: '#0c1733'}],
  iphone: [{left: 0, top: 222, width: 760, height: 60, colour: '#f9f9f9'}],
};
/** And, per screen, the avatar letters that still came from the real names (the cockpit's two visible accounts). */
const extraMasks = {'01-pilotage/01-tableau-de-bord': {mac: [{left: 560, top: 1676, width: 36, height: 27, colour: '#f1f1f1'}, {left: 560, top: 1780, width: 36, height: 20, colour: '#f1f1f1'}]}};
const pieces = [
  ['https://tobeseen-studio.vercel.app/en/work/loyalty-pass/', [['loyalty-pass', '.wallet-demo']]],
];
const devices = {
  mac: {viewport: {width: 1440, height: 900}, deviceScaleFactor: 2},
  iphone: {viewport: {width: 393, height: 798}, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'},
};

async function open(browser, site, device) {
  const page = await browser.newPage(devices[device]);
  await page.goto(site.url, {waitUntil: 'networkidle', timeout: 90000}).catch(() => {});
  await page.addStyleTag({content: `html{scrollbar-width:none}::-webkit-scrollbar{display:none}${site.hide ? `${site.hide}{display:none!important}` : ''}`});
  await page.waitForTimeout(site.pre);
  return page;
}

/** Shows one of a cycling hero's films, paused on a given second, so the opening frame is always the same. */
async function showFilm(page, {name, at}) {
  await page.evaluate(({name, at}) => document.querySelectorAll('video').forEach(video => {
    if (!video.currentSrc.includes(name)) return;
    document.querySelectorAll('video').forEach(other => {
      const show = other === video;
      other.style.setProperty('opacity', show ? '1' : '0', 'important');
      other.style.setProperty('visibility', show ? 'visible' : 'hidden', 'important');
      other.pause();
    });
    video.currentTime = at;
  }), {name, at});
  await page.waitForTimeout(800);
}

/** Scroll positions: each section's top (under a sticky header), tall sections in screen steps, gaps filled, the end. */
function stops({selector, header, vh}) {
  scrollTo(0, 0);
  const max = document.documentElement.scrollHeight - innerHeight;
  const offset = header ? document.querySelector(header)?.getBoundingClientRect().height || 0 : 0;
  const tops = [0];
  if (selector) for (const el of document.querySelectorAll(selector)) {
    if (el.parentElement.closest(selector)) continue;
    const r = el.getBoundingClientRect();
    if (r.height < 120) continue;
    const top = r.top + scrollY - offset;
    tops.push(top);
    for (let y = top + vh; y < top + r.height - vh * .5; y += vh) tops.push(y);
  }
  const all = [...tops, max].map(y => Math.round(Math.max(0, Math.min(max, y)))).sort((a, b) => a - b);
  const filled = [];
  for (const y of all) {
    const last = filled[filled.length - 1];
    if (last !== undefined) for (let g = last + vh; g < y - vh * .4; g += vh) filled.push(Math.round(g));
    if (last === undefined || y - filled[filled.length - 1] >= vh * .4) filled.push(y);
  }
  return filled;
}

(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROME || undefined});
  for (const site of sites.filter(s => !only.length || only.includes(s.id))) {
    for (const device of Object.keys(devices)) {
      const page = await open(browser, site, device);
      const positions = await page.evaluate(stops, {selector: site.sections || null, header: site.header || null, vh: devices[device].viewport.height});
      const names = [];
      let y = 0;
      for (const [index, stop] of positions.entries()) {
        // Step down so lazy images and reveals fire on the way.
        for (; y < stop; y = Math.min(y + 200, stop)) { await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(70); }
        await page.evaluate(v => scrollTo(0, v), stop);
        await page.waitForTimeout(1600);
        if (stop === 0 && site.film) await showFilm(page, site.film);
        const name = String(index + 1).padStart(2, '0');
        await page.screenshot({path: path.join(out, `${site.id}-${device}-${name}.png`)});
        names.push(name);
      }
      await page.close();
      for (const extra of site.extra || []) {
        const fresh = await open(browser, site, device);
        if (device === 'iphone') await fresh.tap(extra.click).catch(() => {}); else await fresh.dblclick(extra.click).catch(() => {});
        await fresh.waitForTimeout(1800);
        await fresh.screenshot({path: path.join(out, `${site.id}-${device}-${extra.name}.png`)});
        names.push(extra.name);
        await fresh.close();
      }
      console.log(site.id, device, names.join(' '));
    }
  }
  for (const [id, source] of logos.filter(([id]) => !only.length || only.includes(id))) {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`${source}: ${response.status}`);
    fs.writeFileSync(path.join(out, `${id}-logo.png`), Buffer.from(await response.arrayBuffer()));
    console.log(id, 'logo');
  }
  if (process.env.LOYALTY && (!only.length || only.includes('loyalty'))) {
    const number = index => String(index + 1).padStart(2, '0');
    for (const [index, file] of loyalty.mac.entries()) {
      await sharp(path.join(process.env.LOYALTY, file)).extract({left: 0, top: 0, width: 2880, height: 1800}).toFile(path.join(out, `loyalty-mac-${number(index)}.png`));
    }
    for (const [index, file] of loyalty.iphone.entries()) fs.copyFileSync(path.join(process.env.LOYALTY, file), path.join(out, `loyalty-iphone-${number(index)}.png`));
    console.log('loyalty', loyalty.mac.length, 'mac,', loyalty.iphone.length, 'iphone (owner captures)');
  }
  if (process.env.HOWARD && (!only.length || only.includes('howard'))) {
    const number = index => String(index + 1).padStart(2, '0');
    for (const [index, name] of howard.entries()) {
      const signedIn = !name.startsWith('00-');
      for (const [device, suffix] of [['mac', '__bureau.png'], ['iphone', '__mobile.png']]) {
        const boxes = signedIn ? [...masks[device], ...(extraMasks[name]?.[device] || [])] : [];
        const covers = await Promise.all(boxes.map(async ({colour, ...box}) => ({
          input: await sharp({create: {width: box.width, height: box.height, channels: 3, background: colour}}).png().toBuffer(), left: box.left, top: box.top,
        })));
        await sharp(path.join(process.env.HOWARD, name + suffix)).composite(covers).toFile(path.join(out, `howard-${device}-${number(index)}.png`));
      }
    }
    console.log('howard', howard.length, 'screens (owner captures, name masked)');
  }
  if (!only.length || only.includes('loyalty')) {
    const page = await browser.newPage({viewport: {width: 1440, height: 1000}, deviceScaleFactor: 3});
    for (const [url, list] of pieces) {
      await page.goto(url, {waitUntil: 'networkidle', timeout: 60000}).catch(() => {});
      await page.waitForTimeout(3000);
      for (const [name, selector] of list) {
        const el = page.locator(selector).first();
        await el.evaluate(node => {
          for (const [key, value] of [['transform', 'none'], ['animation', 'none'], ['box-shadow', 'none'], ['height', 'auto'], ['overflow', 'visible']]) node.style.setProperty(key, value, 'important');
          node.scrollIntoView({block: 'center'});
        });
        await page.waitForTimeout(1200);
        await el.screenshot({path: path.join(out, `${name}.png`)});
        console.log(name);
      }
    }
    await page.close();
  }
  await browser.close();
})();

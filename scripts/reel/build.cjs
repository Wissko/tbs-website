// Builds every film the site plays.
//   FFMPEG=<ffmpeg.exe> node scripts/reel/build.cjs
//
// Art direction films (brand-originals/da, supplied by the owner, 1280 × 720, 24 fps, with sound):
//   tbs-da-paint.mp4     the TBS mark poured in wine paint on concrete, its eye blinks → hero.mp4, the home opening (2026-10-08)
//   tbs-da-paint-9x16.mp4  the same scene composed upright by the owner (720 × 1280)      → hero-tall.mp4, the opening on upright screens (2026-10-11)
//   tbs-da-portrait.mp4  a portrait on sky crossed by a glass ribbon edged in wine     → ribbon.mp4, the home interlude (+ portrait cut, Studio)
//   tbs-da-eyes.mp4      five eyes on black, blinking out of step                      → eyes.mp4, the home spotlight
//   tbs-da-bottle.mp4    the TBS bottle opened by a wine glove, then a wine wipe       → bottle.mp4 (portrait crop), contact
// Loops are crossfaded on themselves (the end dissolves into the start) so they turn without a cut.
//
// Project recordings (public/motion/{eva,kobble,wissem}.mp4, 1280 × 800, played on the case openings' Mac): posters.
const path = require('path');
const fs = require('fs');
const os = require('os');
const {execFileSync} = require('child_process');
const sharp = require('sharp');

const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const root = path.join(__dirname, '..', '..');
const pub = path.join(root, 'public');
const da = path.join(root, '..', 'brand-originals', 'da');
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'tbs-films-'));
const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], {stdio: 'inherit'});
const p = file => path.join(pub, file);
const source = name => path.join(da, `tbs-da-${name}.mp4`);

// The films are BT.601 (smpte170m) YUV; outputs keep that matrix.
const tags = ['-colorspace', 'smpte170m', '-color_primaries', 'smpte170m', '-color_trc', 'smpte170m'];
const video = (crf = 23) => ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', String(crf), '-tune', 'film', '-g', '48', ...tags, '-movflags', '+faststart'];

// 9:16 window on the ribbon portrait's face. The bottle's contact frame is 63:88.
const PORTRAIT = {w: 406, h: 720};
const FACE_X = Math.round((1280 - PORTRAIT.w) / 2);
const CONTACT = {w: 516, h: 720, x: Math.round(627 - 516 / 2)};

/** A loop that dissolves its last `fade` seconds into its first, so it turns without a cut. */
function loop(input, output, {fade = .6, end = 10, filter = 'null', crf = 23} = {}) {
  const graph = [
    `[0:v]split[a][b]`,
    `[a]trim=start=${fade}:end=${end},setpts=PTS-STARTPTS[body]`,
    `[b]trim=start=0:end=${fade},setpts=PTS-STARTPTS[head]`,
    `[body][head]xfade=transition=fade:duration=${fade}:offset=${(end - fade * 2).toFixed(3)},${filter},setsar=1[v]`,
  ].join(';');
  run(['-i', input, '-filter_complex', graph, '-map', '[v]', '-an', ...video(crf), output]);
}

/**
 * The upright opening (720 × 1560, about 9:19.5). The owner's 9:16 film fills its width with the mark, so a phone
 * taller than 9:16 would crop the T, the S and the can: the film is extended by 140 px of its own concrete above and
 * below (the edge bands mirrored, softened), so upright phones show it whole and other upright screens crop floor only.
 * Looped like the others first, so it turns without a cut. The concrete is costly to encode: a light denoise (the site
 * lays its own grain) brings it near 2.8 MB with no visible loss.
 */
function tall(input, output, {fade = .6, end = 10, band = 140} = {}) {
  const graph = [
    '[0:v]split[a][b]',
    `[a]trim=start=${fade}:end=${end},setpts=PTS-STARTPTS[body]`,
    `[b]trim=start=0:end=${fade},setpts=PTS-STARTPTS[head]`,
    `[body][head]xfade=transition=fade:duration=${fade}:offset=${(end - fade * 2).toFixed(3)},split=3[film][t][u]`,
    `[t]crop=iw:${band}:0:0,vflip,gblur=sigma=1.5[above]`,
    `[u]crop=iw:${band}:0:ih-${band},vflip,gblur=sigma=1.5[below]`,
    '[above][film][below]vstack=inputs=3,hqdn3d=1.5:1:3:3,setsar=1[v]',
  ].join(';');
  run(['-i', input, '-filter_complex', graph, '-map', '[v]', '-an', ...video(26), output]);
}

async function poster(film, output, at = 0) {
  const png = path.join(work, `${path.basename(output)}.png`);
  run(['-ss', String(at), '-i', film, '-frames:v', '1', png]);
  await sharp(png).webp({quality: 78}).toFile(output);
}

(async () => {
  // Home opening: the painted mark, landscape, and the owner's upright version, extended for tall phones.
  loop(source('paint'), p('motion/hero.mp4'), {crf: 21});
  tall(source('paint-9x16'), p('motion/hero-tall.mp4'));
  await poster(p('motion/hero.mp4'), p('motion/hero.webp'));
  await poster(p('motion/hero-tall.mp4'), p('motion/hero-tall.webp'));

  // The ribbon portrait: whole for the home interlude, a 9:16 cut on the face for the Studio collage.
  loop(source('portrait'), p('motion/ribbon.mp4'), {crf: 22});
  loop(source('portrait'), p('motion/ribbon-portrait.mp4'), {crf: 23, filter: `crop=${PORTRAIT.w}:720:${FACE_X}:0`});
  await poster(p('motion/ribbon.mp4'), p('motion/ribbon.webp'));
  await poster(p('motion/ribbon-portrait.mp4'), p('motion/ribbon-portrait.webp'));

  // Spotlight: the eyes, whole composition.
  loop(source('eyes'), p('motion/eyes.mp4'), {fade: .5});
  await poster(p('motion/eyes.mp4'), p('motion/eyes.webp'), .2);

  // Contact: the bottle, cut where the wipe fills the frame, in the frame's 63:88.
  loop(source('bottle'), p('motion/bottle.mp4'), {fade: .4, end: 9.4, filter: `crop=${CONTACT.w}:${CONTACT.h}:${CONTACT.x}:0`});
  await poster(p('motion/bottle.mp4'), p('motion/bottle.webp'), .8);

  // Project recordings: their first frame, the still the opening's Mac shows (scripts/mockups/build.cjs draws it too).
  for (const name of ['eva', 'kobble', 'wissem']) {
    await poster(p(`motion/${name}.mp4`), p(`motion/${name}.webp`));
  }

  for (const f of ['hero.mp4', 'hero-tall.mp4', 'ribbon.mp4', 'ribbon-portrait.mp4', 'eyes.mp4', 'bottle.mp4']) {
    console.log(f.padEnd(20), `${Math.round(fs.statSync(p(`motion/${f}`)).size / 1024)} KB`);
  }
  fs.rmSync(work, {recursive: true, force: true});
})();

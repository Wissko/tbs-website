// Doubles the art-direction films' definition before scripts/reel/build.cjs cuts them for the site.
//   FFMPEG=<ffmpeg.exe> REALESRGAN=<realesrgan-ncnn-vulkan.exe> node scripts/reel/upscale.cjs [name ...]
//
// The owner's films are 1280 × 720 (Gemini exports, no larger version exists): full screen on a Retina laptop the
// browser stretched them 2.5 times, and they read blurry. Each frame is redrawn at 2560 × 1440 by Real-ESRGAN
// (realesr-animevideov3, x2: of the x2, x3 and x4 models it kept the concrete's and the skin's texture best, and the
// x4plus photo model took 141 s a frame on this machine and left tile seams), then laid 80 / 20 over a lanczos
// enlargement of the same frame, so edges come out crisp while skin and concrete keep their grain (compared at 2.5×
// on a frame of each film, 2026-10-15). Real-ESRGAN: https://github.com/xinntao/Real-ESRGAN, release v0.2.5.0.
//
// Writes brand-originals/da/2x/tbs-da-<name>.mp4: same frames, timing and sound as the original, near-lossless.
const path = require('path');
const fs = require('fs');
const os = require('os');
const {execFileSync} = require('child_process');

const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const realesrgan = process.env.REALESRGAN || 'realesrgan-ncnn-vulkan';
const da = path.join(__dirname, '..', '..', '..', 'brand-originals', 'da');
const out = path.join(da, '2x');
const names = process.argv.slice(2).length ? process.argv.slice(2) : ['paint', 'paint-9x16', 'portrait', 'eyes', 'bottle'];
const AI = .8;

// The films are BT.601 (smpte170m) YUV; the masters keep that matrix.
const tags = ['-colorspace', 'smpte170m', '-color_primaries', 'smpte170m', '-color_trc', 'smpte170m'];
const run = (bin, args) => execFileSync(bin, args, {stdio: 'inherit'});

fs.mkdirSync(out, {recursive: true});
for (const name of names) {
  const source = path.join(da, `tbs-da-${name}.mp4`);
  const work = fs.mkdtempSync(path.join(os.tmpdir(), `tbs-2x-${name}-`));
  const frames = path.join(work, 'frames');
  const drawn = path.join(work, 'drawn');
  fs.mkdirSync(frames);
  fs.mkdirSync(drawn);
  const started = Date.now();

  run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-i', source, '-fps_mode', 'passthrough', path.join(frames, '%04d.png')]);
  run(realesrgan, ['-i', frames, '-o', drawn, '-n', 'realesr-animevideov3', '-s', '2', '-f', 'png']);

  const graph = [
    '[0:v]format=rgb24,setsar=1[ai]',
    '[1:v]scale=iw*2:ih*2:flags=lanczos,format=rgb24,setsar=1[soft]',
    `[ai][soft]blend=all_expr='A*${AI}+B*${(1 - AI).toFixed(2)}',format=yuv420p[v]`,
  ].join(';');
  run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-framerate', '24', '-i', path.join(drawn, '%04d.png'), '-i', source,
    '-filter_complex', graph, '-map', '[v]', '-map', '1:a?', '-shortest',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '10', '-tune', 'film', ...tags, '-c:a', 'copy', '-movflags', '+faststart',
    path.join(out, `tbs-da-${name}.mp4`),
  ]);

  fs.rmSync(work, {recursive: true, force: true});
  const size = Math.round(fs.statSync(path.join(out, `tbs-da-${name}.mp4`)).size / 1024 / 1024);
  console.log(`${name.padEnd(12)} ${size} MB, ${Math.round((Date.now() - started) / 1000)} s`);
}

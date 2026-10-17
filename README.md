# To Be Seen

Independent studio website. Next.js App Router, React, TypeScript, native CSS. No animation library: CSS keyframes, a few small client components and IntersectionObserver.

## Design system

The structure, grid, type scale and timing follow the BASIC/DEPT® reference (basicagency.com). Content, marks and imagery are To Be Seen's own.

- Palette (`src/styles/tokens.css`): light `#f4f4f4`, dark `#252422`, deep `#191918`, grey `#5e5e5e`. The accent is TBS sky `#bedffd`, used where the reference uses its pink: text on dark chapters, the drag cursor, the menu panel. One token, `--c-accent`.
- Themes: a page opts into dark with `data-page-theme="dark"` (Studio). A chapter with `data-theme-section="dark"` turns the whole page dark while it holds the middle of the screen (home spotlight). A case study takes its project's colour for the whole page. The footer inverts: dark under light pages, light under dark ones.
- Type: Public Sans (SIL OFL, `public/fonts/PublicSans-OFL.txt`), one variable latin woff2. Chosen against fifteen open grotesques as the closest match to the reference's face (same width and weight on a 90 px headline). Scale in rem (1rem = 10 px, scaled with the viewport past 1920): `t-h1` 6.25vw bold uppercase −0.05em, `t-h2` 4.2rem, `t-h3` 3.8rem medium, `t-h5` 2.2rem, `t-small` 1.4rem uppercase, body 1.8rem.
- Grid: 12 columns from 1280 px (6 below), 8rem margins (5.4vw on small screens), 2rem gutters. `--col` is one column computed from `100cqw` (`main` and the footer are inline-size containers).
- Responsive tiers (`tokens.css`): phones read at 16 px with 12 px labels; from 720 px (tablets, small laptops) 17 px with 13 px labels and headlines at 6.25vw; from 1280 px the desktop scale. Layouts that open from 1024 px are drawn on twelve columns with `--col12` (one column of twelve at any width), so tablets held sideways (1024–1279) get the same proportions as desktops instead of overflowing. On touch screens (`pointer: coarse`) the header's logo and menu, footer links and the room's links get finger-sized hit areas without moving the layout. Below 600 px of height (a phone held sideways, a small phone) the case room is not pinned: its reel is swiped (`case-room.tsx`). Checked at 320, 375, 390, 430 and 844×390 (phones), 768×1024, 1024×768 and 1180×820 (tablets), 1280 to 2560 (desktops).
- Pieces (`src/components/ui.tsx`): `Headline` (words rise out of their line; a part with `dot` opens with the round punctuation, one column wide), `Pill` (outlined button, fill rises on hover), `MetaBar` (rule + coordinates + dot; `meta-bar--half` on case studies), `TbsMark` and `ClientMark` (CSS masks that take the current colour).
- Grain: an original 256 px noise tile (`public/brand/grain.png`) over everything, stepped like film.

## Behaviour

- Header (`site-header.tsx`): transparent over an opening that sets `data-header-fg` (ink over the home film's concrete, a case-study colour). It hides while reading down, returns with a background when scrolling up. The three dots open the menu panel: a dialog with the seven projects on a drag track (desktop) or the four links (mobile); page inert, Escape closes, focus returns.
- Logo takeover: on a fresh load the mark rises out of view before the page arrives (CSS only, `layout.tsx` + `chrome.css`).
- Page changes (`runtime.tsx`): internal links fade the page out, then the next page's words rise in. A link into a case study blinks instead: two lids in the project's colour close to an almond, like the mark's eye, and open on its room (`.blink` in `chrome.css`, the lids drawn by a registered `--lid`). Reveals (`data-reveal="up|line|words|wipe"`) settle once in view.
- Drag tracks (`drag-scroller.tsx`): native scroll on touch, trackpad and keyboard; mouse drag with glide; round DRAG cursor that grows carets while dragging; progress bar.
- Opening (`home/hero-film.tsx`): the art-direction film loops silently under the header, with no controls. Landscape screens play `hero.mp4` (16:9, cropped around the mark); upright ones play `hero-tall.mp4`, the owner's 9:16 version extended with its own concrete to 720 × 1560 so tall phones show the whole mark and tablets crop floor only. Turning the screen loads the other one; a matching still sits behind while it loads. Safe zones for future edits: 16:9 master 1920 × 1080, keep the mark in the central 1440 × 810; 9:16 master 1080 × 1920, central 860 × 1400.
- Cursor (`site-cursor.tsx`, `logo-cursor.tsx`): wherever a fine pointer is used, the pointer is the small TBS mark (letters masked from `brand/tbs-mark-body.svg`, pupil and lid from `eye-path.ts`), whose eye blinks on every click. It inverts against what it crosses, stays plain white over the opening film, takes the text's colour on a case study (pictures and filled buttons excepted) and grows a little over anything clickable. Text fields keep the system caret; drag tracks keep their DRAG cursor; touch screens keep none.
- Projects in place (`media.tsx`): the tiles (home, Work, related work on service pages) and the menu show each project's site on a device in a setting from the client's world, as Neutomni stages its work; the case rooms and the Studio collage keep the drawn mockups.
- Case room (`case-room.tsx`, `room-stage.tsx`): a case study is one screen on the project's colour, after The First The Last and Synchronized. Coordinates on top (focus, field, 03 / 07, All work); a reel of numbered plates in the middle; under a rule, the name, the summary, Read the story, previous / next (round buttons, the target's name rises on hover) and the site. The room is pinned while its reel runs: scrolling down moves the plates sideways with a light glide, each picture drifts a little in its frame and the rule fills. Plates, in order: the Mac and iPhone (the site recording on the Mac for Eva, Kobble and Wissem: `OpeningScene`), the project's line set in the room's colours reversed and signed with the mark, the logo board (Blue Pacific), every screen in perspective, two browser windows, the iPhone upright, the Mac face on, three iPhones (Howard: the tilted overview). All plates share a height; on phones landscape ones fit the width. The story (brief, approach, logo, site, note, a product's features) follows the room. Without script the reel is a plain horizontal scroller; under reduced motion it follows the scroll without glide or drift.
- Identity work (`identity` in `data.ts`): a case study can show the logo the studio designed on a board with its colours, sampled from the logo file (Blue Pacific); the Brand identity service features only that work.
- Case studies chain: the end of each case fades from its colour into the next one's and draws the next project's room, inert and exactly like that page's top; scrolling it to the top opens it in place (`next-project.tsx`). Off under reduced motion, where it stays a link.
- Films carry no visible controls. Each has a pause button for keyboard users, out of sight until it takes focus. Nothing plays under reduced motion; the takeover and transitions are skipped.

## Media

- `public/projects/mockups`: device mockups of the seven projects (opening, layered opening, perspective, windows, Mac face on, upright iPhone, three iPhones), drawn in CSS by `scripts/mockups/build.cjs` from captures made by `scripts/captures/devices.cjs` (Mac 1440 × 900 at 2×, iPhone 393 × 798 at 3× under a drawn status bar, floating widgets hidden, one screen per section). Loyalty Pass is shown from the owner's captures of the app with demonstration data, each labelled DEMO DATA (`LOYALTY=<folder>` for `devices.cjs`); its case study lists the product's features (`highlights` in `data.ts`), never the demo figures. The Howard Partners CRM is private: it is shown from the owner's anonymised captures (`HOWARD=<folder>`), only the seven screens an audit found free of client data (cockpit, reports, copilot, data model, reports and record settings, sign-in; amounts are fictional), with the signed-in user's name and two avatars' initials painted out; its case carries a cost case (`costCase` in `data.ts`): estimates of what the same scope costs off the shelf, from public list prices, with the basis printed; its phone captures are Safari's visible viewport, drawn under Safari's bottom bar. The Loyalty Pass card comes from the previous studio presentation, straightened, captioned as a product illustration.
- `public/projects/scenes`: each project in place, 4:5 (1600 × 2000): Eva Meszoly on a laptop in a photography studio, Kobble Cottage on a phone on a farm cottage verandah among gum trees, Wissem OS on a laptop on a desk at night, Niumi Distributors on a laptop on cartons in a warehouse, Blue Pacific on a phone on a shipping container at a port, Loyalty Pass on a phone on a café counter, the Howard Partners CRM on a laptop on an executive desk. The settings are generated (Canva AI, approved by the owner on 2026-10-18, a device with a pure green screen, kept in the Desktop screens folder, « 6 Mises en situation »); the screens are always the real captures, the same ones the site publishes elsewhere (Howard's cleaned cockpit, Loyalty Pass labelled DEMO DATA), set in perspective by `scripts/scenes/build.py`, which keys the green, fits the glass's corners, draws the phones' island and takes the screen's green glow off the surface below.
- Art direction films (`brand-originals/da`, supplied by the owner, 1280 × 720, 24 fps, with sound): the TBS mark poured in wine paint on concrete, the portrait crossed by a glass ribbon, the five eyes, the TBS bottle. At 720p they read blurry on dense screens, so `scripts/reel/upscale.cjs` redraws each frame at 2560 × 1440 with Real-ESRGAN (`brand-originals/da/2x`, kept out of git) and `scripts/reel/build.cjs` cuts those masters into `hero.mp4` + `hero-tall.mp4` (home opening, the paint; 1440 × 3120 for upright screens), `ribbon.mp4` (home interlude, full width between the overview and the work) + `ribbon-portrait.mp4` (Studio collage, 9:16 on the face), `eyes.mp4` (home spotlight), `bottle.mp4` (contact, 63:88 crop). All play silently. Loops dissolve their end into their start, so they turn without a cut.
- `public/motion` also holds the three website recordings played on the case openings' Mac (`scripts/captures/films.cjs`: 2560 × 1600, 30 fps, drawn frame by frame under Chrome's virtual time) and their posters (`scripts/reel/build.cjs`).
- `public/logos`: single-colour masks of the client marks (Kobble, Eva Meszoly and Niumi from their live sites, Blue Pacific's logo file, Howard Partners from `public/projects/howard-logo.webp`), plus typeset marks for Wissem OS and Loyalty Pass. Captured 2026-10-06; check with each client before publishing their mark.

```sh
FFMPEG=<ffmpeg.exe> REALESRGAN=<realesrgan-ncnn-vulkan.exe> node scripts/reel/upscale.cjs [name ...]   # about 15 min a film
PLAYWRIGHT=<path to playwright> FFMPEG=<ffmpeg.exe> node scripts/captures/films.cjs [id ...]
FFMPEG=<ffmpeg.exe> node scripts/reel/build.cjs
PLAYWRIGHT=<path to playwright> CHROME=<chrome.exe> node scripts/captures/devices.cjs <captures> [id ...]
PLAYWRIGHT=<path to playwright> CHROME=<chrome.exe> node scripts/mockups/build.cjs <captures> [id ...]   # FOLDER=<dir> for the retouching set
python -I scripts/scenes/build.py <settings> <captures> [id ...]   # Python 3 with numpy and opencv-python
```

## Run

```sh
npm install
npm run dev -- --port 3008
npm run typecheck
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the deployment origin. Development output uses `.next-dev`, production output uses `.next`.

## Content

`src/lib/data.ts` holds the seven projects (with their case-study colours, sampled from each site), the four work chapters and the seven services. Pages are pre-rendered. The contact form opens a composed draft in the visitor's email app; it does not claim server submission. No analytics, cookie trackers or embedded remote players. Recognition, snapshot numbers and principles are factual: no awards, team or figures that the studio cannot stand behind.

## Production and indexing

The site is live on `tobeseen.agency`. The code is mirrored into two Vercel projects of the To Be Seen team: `tbs-website` (repo `Wissko/tbs-website`, staging at tbs-website-seven.vercel.app) and `aiga-v2` (repo `Wissko/aiga-v2`, holds `tobeseen.agency`, `www.` redirects to it). Each repo carries the contents of `site/` at its root; a push to their `main` deploys to production.

Only a production build whose project domain is `tobeseen.agency` is indexed (`indexed` in `data.ts`): robots allow and point to the sitemap, pages are `index,follow`. Every other build, previews and the `tbs-website` staging copy included, stays `noindex,nofollow` and robots-disallowed. Canonical URLs and the Schema.org graph (`layout.tsx`) use `NEXT_PUBLIC_SITE_URL`, `https://tobeseen.agency` by default. Every URL of the two previous sites (the AIGA version and the first To Be Seen site: `/results`, the anonymous `/work` types, `/menu`, `/terms`, `/pricing`…) has a permanent redirect in `next.config.ts`.

## Quality

`audits/basic-direction` (`qa.cjs`, `report.json`): 12 routes × 4 viewports without overflow, broken image, console error, clipped text or text under 11 px; axe-core WCAG 2.0/2.1 A and AA clean on every route at desktop and mobile; visible keyboard focus; reduced motion honoured.

"""Projects in place: each site's real capture set into the screen of a setting from the client's world.

    python -I scripts/scenes/build.py <settings> <captures> [id ...]

<settings> is searched for <id>-setting.(png|jpg): a photograph of a device whose screen is pure chroma green
(#00FF00), generated for each project (Canva AI, approved by the owner on 2026-10-18; kept in the Desktop screens folder,
"6 Mises en situation"). <captures> is searched for the screen each scene shows: device screenshots with their status
bar, Mac 2880 x 1800 and iPhone 1179 x 2556 (the FOLDER set of scripts/mockups/build.cjs, "4 Captures améliorées").
Writes public/projects/scenes/<id>.jpg, 1600 x 2000 (4:5), for the project tiles, the menu and related work.

The screen is the largest green region; its four sides are fitted on their straight middles, so the corners are the
glass's true corners and the rounded ones are cut by the green itself. The capture is cropped to the screen's
proportions from the top, warped in perspective, and blended through the green's own soft edge, so anything standing in
front of the screen stays in front. Phones get the island drawn on. The screen's green glow is taken off the rim and off
the surface below the device; plants and props elsewhere keep their own green.
"""
import argparse
import glob
import os

import cv2
import numpy as np

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
OUT = os.path.join(ROOT, 'public', 'projects', 'scenes')
WIDTH, HEIGHT = 1600, 2000

# The screen each scene shows (the same screens the site already publishes; Howard's is the cleaned cockpit).
SCENES = {
    'eva': 'eva-mac-01',
    'kobble': 'kobble-iphone-12',
    'wissem': 'wissem-mac-01',
    'niumi': 'niumi-mac-01',
    'bluepacific': 'bluepacific-iphone-02',
    'loyalty': 'loyalty-iphone-01',
    'howard': 'howard-mac-01',
}


def read(path):
    # imdecode, not imread: the Desktop folders have accented names.
    return cv2.imdecode(np.fromfile(path, dtype=np.uint8), cv2.IMREAD_COLOR)


def find(root, name):
    matches = [p for ext in ('png', 'jpg') for p in glob.glob(os.path.join(root, '**', f'{name}.{ext}'), recursive=True)]
    if len(matches) != 1:
        raise SystemExit(f'{name}: {"not found" if not matches else "found " + str(len(matches)) + " times"} under {root}')
    return matches[0]


def green_alpha(img):
    b, g, r = [c.astype(np.float32) for c in cv2.split(img)]
    # Fully green above 70, nothing below 25: a soft key that keeps the rim's antialiasing.
    return np.clip((g - np.maximum(r, b) - 25) / 45, 0, 1)


def order(points):
    """Top-left, top-right, bottom-right, bottom-left."""
    c = points.mean(axis=0)
    p = points[np.argsort(np.arctan2(points[:, 1] - c[1], points[:, 0] - c[0]))]
    return np.roll(p, -int(np.argmin(p.sum(axis=1))), axis=0)


def screen_quad(alpha):
    mask = (alpha > .5).astype(np.uint8)
    _, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    region = (labels == 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))).astype(np.uint8)
    contours, _ = cv2.findContours(region, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    contour = max(contours, key=cv2.contourArea)[:, 0, :].astype(np.float32)
    hull = cv2.convexHull(contour)
    rough = None
    for eps in np.linspace(.01, .1, 40):
        approx = cv2.approxPolyDP(hull, eps * cv2.arcLength(hull, True), True)
        if len(approx) == 4:
            rough = approx[:, 0, :].astype(np.float32)
            break
    if rough is None:
        rough = cv2.boxPoints(cv2.minAreaRect(contour)).astype(np.float32)
    rough = order(rough)
    lines = []
    for i in range(4):
        a, c = rough[i], rough[(i + 1) % 4]
        length = np.linalg.norm(c - a)
        u = (c - a) / length
        n = np.array([-u[1], u[0]])
        t = (contour - a) @ u
        pick = contour[(t > length * .2) & (t < length * .8) & (np.abs((contour - a) @ n) < length * .06)]
        if len(pick) < 10:
            pick = np.array([a, c])
        vx, vy, x0, y0 = cv2.fitLine(pick, cv2.DIST_HUBER, 0, .01, .01).ravel()
        lines.append((np.array([x0, y0]), np.array([vx, vy])))
    corners = []
    for i in range(4):
        (p1, d1), (p2, d2) = lines[i - 1], lines[i]
        s = np.linalg.solve(np.array([d1, -d2]).T, p2 - p1)
        corners.append(p1 + s[0] * d1)
    return order(np.array(corners, dtype=np.float32)), region


def island(capture):
    h, w = capture.shape[:2]
    out = capture.copy()
    iw, ih, top = int(w * .32), int(w * .095), int(w * .03)
    x0 = (w - iw) // 2
    cv2.rectangle(out, (x0 + ih // 2, top), (x0 + iw - ih // 2, top + ih), (8, 8, 9), -1, cv2.LINE_AA)
    for cx in (x0 + ih // 2, x0 + iw - ih // 2):
        cv2.circle(out, (cx, top + ih // 2), ih // 2, (8, 8, 9), -1, cv2.LINE_AA)
    return out


def compose(scene, capture):
    scene = cv2.resize(scene, (WIDTH, HEIGHT), interpolation=cv2.INTER_LANCZOS4)
    alpha = green_alpha(scene)
    quad, region = screen_quad(alpha)
    qw = (np.linalg.norm(quad[1] - quad[0]) + np.linalg.norm(quad[2] - quad[3])) / 2
    qh = (np.linalg.norm(quad[3] - quad[0]) + np.linalg.norm(quad[2] - quad[1])) / 2

    # The capture, cropped to the screen's proportions from the top (or evenly from the sides), then warped.
    ch, cw = capture.shape[:2]
    if cw * qh / qw < ch:
        capture = capture[:int(round(cw * qh / qw))]
    else:
        x0 = int((cw - ch * qw / qh) / 2)
        capture = capture[:, x0:cw - x0]
    ch, cw = capture.shape[:2]
    src = np.array([[0, 0], [cw, 0], [cw, ch], [0, ch]], dtype=np.float32)
    centre = quad.mean(axis=0)
    dst = (centre + (quad - centre) * 1.004).astype(np.float32)  # a hair past the glass, so no green survives
    warped = cv2.warpPerspective(capture, cv2.getPerspectiveTransform(src, dst), (WIDTH, HEIGHT), flags=cv2.INTER_AREA, borderMode=cv2.BORDER_REPLICATE)

    # A lit screen in a room: a touch less contrast and a faint sheen from the top left.
    yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH].astype(np.float32)
    sheen = np.clip(1 - ((xx - quad[0][0]) / qw + (yy - quad[0][1]) / qh) * .9, 0, 1)[..., None]
    screen = warped.astype(np.float32) * .95 + 8 + sheen * 14

    a = alpha.copy()
    ring = cv2.dilate(region, np.ones((5, 5), np.uint8)) > 0
    a[(region == 0) & ~ring] = 0
    a = cv2.GaussianBlur(a, (3, 3), 0)[..., None]

    # The glow lands on the rim and on the surface the device stands on: a ring all round and a band below the screen.
    near = cv2.dilate(region, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31))).astype(np.float32)
    x0, x1 = int(quad[:, 0].min() - qw * .6), int(quad[:, 0].max() + qw * .6)
    y0, y1 = int(quad[:, 1].max() - qh * .1), int(quad[:, 1].max() + qh * .9)
    near[max(0, y0):max(0, y1), max(0, x0):max(0, x1)] = 1
    soft = int(max(qw, qh) * .12) | 1
    near = np.maximum(cv2.GaussianBlur(near, (soft * 2 + 1, soft * 2 + 1), 0), (region > 0).astype(np.float32))
    # A surface's own green sits between its red and blue; what rises above that is glow, removed in proportion, so
    # the correction has no edge.
    b, g, r = cv2.split(scene.astype(np.float32))
    hi, lo = np.maximum(r, b), np.minimum(r, b)
    target = lo + (hi - lo) * .55
    g = g - np.clip((g - target) / 12, 0, 1) * near * np.maximum(g - target, 0)
    base = cv2.merge([b, g, r])
    return np.clip(base * (1 - a) + screen * a, 0, 255).astype(np.uint8), quad


def main():
    ap = argparse.ArgumentParser(description='Set each project\'s capture into its setting.')
    ap.add_argument('settings')
    ap.add_argument('captures')
    ap.add_argument('ids', nargs='*')
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    for id in args.ids or SCENES:
        name = SCENES[id]
        capture = read(find(args.captures, name))
        if '-iphone-' in name:
            capture = island(capture)
        out, quad = compose(read(find(args.settings, f'{id}-setting')), capture)
        params = [cv2.IMWRITE_JPEG_QUALITY, 86, cv2.IMWRITE_JPEG_PROGRESSIVE, 1]
        if hasattr(cv2, 'IMWRITE_JPEG_SAMPLING_FACTOR'):
            params += [cv2.IMWRITE_JPEG_SAMPLING_FACTOR, cv2.IMWRITE_JPEG_SAMPLING_FACTOR_444]
        ok, data = cv2.imencode('.jpg', out, params)
        data.tofile(os.path.join(OUT, f'{id}.jpg'))
        print(id, name, 'screen', [tuple(int(v) for v in p) for p in quad])


if __name__ == '__main__':
    main()

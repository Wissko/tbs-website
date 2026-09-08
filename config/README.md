# Portrait scroll settings

`portrait-motion.json` controls the homepage photographic-relief prototype.

- `background`: pale paper color behind the extracted monochrome image.
- `whitePoint`: source luminance mapped to transparent (0–1). Lower values remove more pale background; higher values retain more gray texture. The SVG filter retains dark hair detail without a polygon mask. This may slightly change photographic tonal values in the animated view.
- `desktop` / `mobile`: endpoint transforms, interpolated from the untouched pose using smoothstep scroll progress. `translateX` and `translateY` are pixels, `rotate` is degrees, and `scale` is a multiplier. Mobile applies at viewport widths up to 820 px.

The whole extracted photographic layer moves as one piece. This is a restrained 2.5D illusion, not a genuine head rotation, independently animated hair, or generated video. No video service or additional media file is required. Reversing scroll reverses the exact motion. JavaScript disabled or reduced-motion enabled displays the unfiltered original photograph without the extra scroll runway. The sticky distance is defined by the portrait CSS in `app/globals.css`.

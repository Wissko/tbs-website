import Image from 'next/image';
import type {Media, Project} from '@/lib/data';
import {AutoVideo} from './auto-video';

/** A picture that fills its frame (the frame sets the ratio). */
export function Fill({media, alt, sizes, priority = false, position}: {media: Media; alt: string; sizes: string; priority?: boolean; position?: string}) {
  return (
    <Image
      src={media.src}
      alt={media.alt ?? alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={82}
      style={{objectPosition: position ?? media.position ?? '50% 50%'}}
    />
  );
}

/** A picture at its own ratio. */
export function Natural({media, alt, sizes, priority = false}: {media: Media; alt: string; sizes: string; priority?: boolean}) {
  return <Image src={media.src} alt={media.alt ?? alt} width={media.width} height={media.height} sizes={sizes} priority={priority} quality={82} />;
}

/** The project's tile: its site in place, on a device in a setting from the client's world. */
export function ProjectTile({project, sizes, priority = false}: {project: Project; sizes: string; priority?: boolean}) {
  return <Fill media={project.mockup.tile} alt={`${project.name}, ${project.type.toLowerCase()}`} sizes={sizes} priority={priority} />;
}

/**
 * The case opening: Mac and iPhone on the project's colour. With a recording, the scene is drawn in layers so the
 * recording plays on the Mac screen beneath the phone (`live`), or shows its first frame when still (next-project
 * chaining draws the same picture, so the hand-over is seamless).
 */
export function OpeningScene({project, live = false, priority = false, decorative = false}: {project: Project; live?: boolean; priority?: boolean; decorative?: boolean}) {
  const {opening, layered} = project.mockup;
  const alt = decorative ? '' : opening.alt ?? `${project.name} on a laptop and a phone`;
  if (!project.motion || !layered) return <Image src={opening.src} alt={alt} fill sizes="100vw" priority={priority} quality={80} />;
  const poster = `/motion/${project.motion}.webp`;
  return (
    <>
      <Image src={layered.base.src} alt={alt} fill sizes="100vw" priority={priority} quality={80} />
      <span className="scene__screen">
        {live
          ? <AutoVideo src={`/motion/${project.motion}.mp4`} poster={poster} label={`${project.name} website recording`} />
          : <Image src={poster} alt="" fill sizes="62vw" quality={75} />}
      </span>
      <Image src={layered.layer.src} alt="" fill sizes="100vw" priority={priority} quality={80} />
    </>
  );
}

import Image from 'next/image';

type ProjectCoverProps = {
  src: string;
  alt: string;
  /** When true, loads eagerly (e.g. first card above the fold) */
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain';
};

export default function ProjectCover({ src, alt, priority = false, className = '', objectFit = 'cover' }: ProjectCoverProps) {
  return (
    <div
      className={`relative w-full aspect-video rounded-sm bg-[#020409] border border-[#1a2540] overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={objectFit === 'contain' ? 'object-contain' : 'object-cover'}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#020409]/75 via-[#020409]/20 to-transparent pointer-events-none z-[1]"
        aria-hidden="true"
      />
    </div>
  );
}

'use client';

interface TechTagProps {
  tag: string;
  className?: string;
}

export default function TechTag({ tag, className = '' }: TechTagProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm border border-sky-500/20 bg-sky-500/5 text-sky-300/80 font-mono text-[10px] sm:text-[11px] tracking-wider whitespace-nowrap ${className}`}
    >
      {tag}
    </span>
  );
}

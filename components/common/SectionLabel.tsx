'use client';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`} role="presentation">
      <span className="h-px w-6 sm:w-8 bg-sky-500/50" aria-hidden="true" />
      <span className="font-mono text-[10px] sm:text-xs tracking-widest text-sky-400/70 uppercase select-none">
        {label}
      </span>
    </div>
  );
}

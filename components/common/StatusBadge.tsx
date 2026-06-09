'use client';

import { useTranslations } from 'next-intl';

type Status = 'active' | 'completed' | 'in-development';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const styleConfig: Record<Status, { dotClass: string; badgeClass: string }> = {
  active: {
    dotClass: 'bg-emerald-400 pulse-dot',
    badgeClass: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  },
  completed: {
    dotClass: 'bg-sky-400',
    badgeClass: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
  },
  'in-development': {
    dotClass: 'bg-amber-400 pulse-dot',
    badgeClass: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  },
};

const labelKey: Record<Status, 'active' | 'completed' | 'inDevelopment'> = {
  active: 'active',
  completed: 'completed',
  'in-development': 'inDevelopment',
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const t = useTranslations('StatusBadge');
  const { dotClass, badgeClass } = styleConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border font-mono text-[10px] tracking-widest uppercase whitespace-nowrap ${badgeClass} ${className}`}
      role="status"
    >
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
      {t(labelKey[status])}
    </span>
  );
}

'use client';

import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Publication } from '@/lib/data/projects';

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

export default function PublicationCard({ publication, index }: PublicationCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative p-5 rounded-sm bg-[#0a0f1e] border border-[#1a2540] group hover:border-sky-500/30 transition-colors duration-300"
    >
      {/* Corner bracket */}
      <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-500/20 group-hover:border-sky-500/50 transition-colors" aria-hidden="true" />

      <div className="pl-2">
        <span className="font-mono text-[10px] tracking-widest text-sky-500/50 mb-3 block" aria-hidden="true">
          REF [{index + 1}] &middot; IEEE &middot; {publication.year}
        </span>
        <p className="text-sm text-slate-300 leading-relaxed mb-1">
          <span className="text-slate-500">{publication.authors},</span>{' '}
          <span className="font-medium text-slate-100">
            &ldquo;{publication.title},&rdquo;
          </span>{' '}
          <span className="text-slate-400 italic">{publication.conference}</span>
        </p>
        <a
          href={`https://doi.org/${publication.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2 font-mono text-[11px] text-sky-400/70 hover:text-sky-400 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
        >
          DOI: {publication.doi}
          <ExternalLink size={10} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

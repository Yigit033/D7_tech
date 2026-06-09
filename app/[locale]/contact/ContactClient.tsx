'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader as Loader2, CircleCheck as CheckCircle, MapPin, Globe, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/common/SectionLabel';

function YouTubeIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// Base schema for TypeScript type inference
const baseSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.enum(['general', 'collaboration', 'careers', 'press']),
  message: z.string().min(20),
});

type FormData = z.infer<typeof baseSchema>;

export default function ContactClient() {
  const t = useTranslations('ContactPage');
  const [submitted, setSubmitted] = useState(false);

  // Schema with translated validation messages
  const schema = z.object({
    name: z.string().min(2, t('validationNameMin')),
    email: z.string().email(t('validationEmailInvalid')),
    subject: z.enum(['general', 'collaboration', 'careers', 'press'], {
      required_error: t('validationSubjectRequired'),
    }),
    message: z.string().min(20, t('validationMessageMin')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to send');
    setSubmitted(true);
    reset();
  };

  const contactInfo = [
    { icon: Globe, label: t('websiteLabel'), value: 'd7tech.net', href: 'https://d7tech.net' },
    { icon: MapPin, label: t('locationLabel'), value: t('locationValue'), href: null },
  ];

  const social = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/d7-technology/' },
    { icon: YouTubeIcon, label: 'YouTube', href: 'https://www.youtube.com/@stegtu3983' },
  ];

  const subjectOptions = [
    { value: '', label: t('subjectPlaceholder') },
    { value: 'general', label: t('subjectGeneral') },
    { value: 'collaboration', label: t('subjectCollaboration') },
    { value: 'careers', label: t('subjectCareers') },
    { value: 'press', label: t('subjectPress') },
  ];

  return (
    <div className="min-h-screen bg-[#020409]">
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden" aria-labelledby="contact-heading">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label={t('heroLabel')} className="mb-5" />
          <h1 id="contact-heading" className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">{t('heroDescription')}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="h-px bg-[#1a2540] mb-12 sm:mb-16" aria-hidden="true" />
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-12">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-6">{t('reachOut')}</h2>
            <div className="space-y-4 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={14} className="text-sky-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-slate-300 hover:text-sky-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-[#1a2540] mb-8" aria-hidden="true" />
            <h3 className="font-mono text-[11px] tracking-widest text-slate-600 uppercase mb-4">{t('followUs')}</h3>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  className="w-10 h-10 rounded bg-[#0a0f1e] border border-[#1a2540] hover:border-sky-500/40 flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all duration-200"
                >
                  <s.icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-sm bg-[#0a0f1e] border border-[#1a2540] relative">
              <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-500/20" aria-hidden="true" />
              <p className="font-mono text-[10px] tracking-widest text-sky-500/50 uppercase mb-2" aria-hidden="true">
                {t('responseTimeLabel')}
              </p>
              <p className="text-sm text-slate-400">{t('responseTimeText')}</p>
            </div>
          </div>

          <div className="relative p-6 sm:p-8 rounded-sm bg-[#0a0f1e] border border-[#1a2540]">
            <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-sky-500/20" aria-hidden="true" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sky-500/20" aria-hidden="true" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center"
                >
                  <CheckCircle size={48} className="text-emerald-400" />
                  <h3 className="text-xl font-semibold text-slate-100">{t('successTitle')}</h3>
                  <p className="text-slate-400 text-sm max-w-xs">{t('successDescription')}</p>
                  <span className="font-mono text-[10px] text-sky-500/50 tracking-widest uppercase" aria-hidden="true">
                    {t('successLabel')}
                  </span>
                  <button onClick={() => setSubmitted(false)} className="mt-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
                    {t('sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                        {t('nameLabel')} <span className="text-sky-500/60">*</span>
                      </label>
                      <input
                        id="contact-name"
                        {...register('name')}
                        type="text"
                        placeholder={t('namePlaceholder')}
                        autoComplete="name"
                        className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors"
                        aria-invalid={errors.name ? 'true' : undefined}
                      />
                      {errors.name && <p className="mt-1 text-[11px] text-red-400" role="alert">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                        {t('emailLabel')} <span className="text-sky-500/60">*</span>
                      </label>
                      <input
                        id="contact-email"
                        {...register('email')}
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        autoComplete="email"
                        className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors"
                        aria-invalid={errors.email ? 'true' : undefined}
                      />
                      {errors.email && <p className="mt-1 text-[11px] text-red-400" role="alert">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                      {t('subjectLabel')} <span className="text-sky-500/60">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      {...register('subject')}
                      className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors appearance-none cursor-pointer"
                      aria-invalid={errors.subject ? 'true' : undefined}
                    >
                      {subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-[11px] text-red-400" role="alert">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                      {t('messageLabel')} <span className="text-sky-500/60">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      {...register('message')}
                      rows={5}
                      placeholder={t('messagePlaceholder')}
                      className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors resize-none"
                      aria-invalid={errors.message ? 'true' : undefined}
                    />
                    {errors.message && <p className="mt-1 text-[11px] text-red-400" role="alert">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed text-[#020409] font-semibold text-sm rounded transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={14} className="animate-spin" aria-hidden="true" />{t('sending')}</>
                    ) : t('submitButton')}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

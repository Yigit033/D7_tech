'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader as Loader2, CircleCheck as CheckCircle, MapPin, Globe, Linkedin, Twitter, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '@/components/common/SectionLabel';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.enum(['general', 'collaboration', 'careers', 'press'], {
    required_error: 'Please select a subject',
  }),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: Globe,
    label: 'Website',
    value: 'd7tech.net',
    href: 'https://d7tech.net',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Istanbul, Turkiye',
    href: null,
  },
];

const social = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
];

const subjectOptions = [
  { value: '', label: 'Select a subject...' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'careers', label: 'Careers' },
  { value: 'press', label: 'Press' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-[#020409]">
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden" aria-labelledby="contact-heading">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel label="// GET IN TOUCH" className="mb-5" />
          <h1 id="contact-heading" className="text-4xl sm:text-5xl font-bold text-slate-100 tracking-tight mb-4">
            Contact
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Inquiries, collaborations, research partnerships, or just to say hello.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="h-px bg-[#1a2540] mb-12 sm:mb-16" aria-hidden="true" />

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-12">
          {/* Left: Info */}
          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-6">Reach Out</h2>

            <div className="space-y-4 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={14} className="text-sky-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-slate-300 hover:text-sky-400 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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

            <h3 className="font-mono text-[11px] tracking-widest text-slate-600 uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  className="w-10 h-10 rounded bg-[#0a0f1e] border border-[#1a2540] hover:border-sky-500/40 flex items-center justify-center text-slate-500 hover:text-sky-400 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020409]"
                >
                  <s.icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-sm bg-[#0a0f1e] border border-[#1a2540] relative">
              <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-sky-500/20" aria-hidden="true" />
              <p className="font-mono text-[10px] tracking-widest text-sky-500/50 uppercase mb-2" aria-hidden="true">
                // Response Time
              </p>
              <p className="text-sm text-slate-400">
                We typically respond within 1–2 business days. For urgent matters, reach out via LinkedIn.
              </p>
            </div>
          </div>

          {/* Right: Form */}
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
                  <h3 className="text-xl font-semibold text-slate-100">Message Sent</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <span className="font-mono text-[10px] text-sky-500/50 tracking-widest uppercase" aria-hidden="true">
                    // MESSAGE RECEIVED
                  </span>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Send another message
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
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                        Name <span className="text-sky-500/60">*</span>
                      </label>
                      <input
                        id="contact-name"
                        {...register('name')}
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors"
                        aria-invalid={errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-[11px] text-red-400" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                        Email <span className="text-sky-500/60">*</span>
                      </label>
                      <input
                        id="contact-email"
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors"
                        aria-invalid={errors.email ? 'true' : undefined}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-[11px] text-red-400" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                      Subject <span className="text-sky-500/60">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      {...register('subject')}
                      className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors appearance-none cursor-pointer"
                      aria-invalid={errors.subject ? 'true' : undefined}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      {subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-[11px] text-red-400" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block font-mono text-[10px] tracking-widest text-slate-500 uppercase mb-1.5">
                      Message <span className="text-sky-500/60">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      {...register('message')}
                      rows={5}
                      placeholder="Tell us about your inquiry..."
                      className="w-full px-3 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors resize-none"
                      aria-invalid={errors.message ? 'true' : undefined}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-[11px] text-red-400" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed text-[#020409] font-semibold text-sm rounded transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
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

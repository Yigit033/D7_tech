'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CircleCheck as CheckCircle, Loader as Loader2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '@/components/common/SectionLabel';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#020409] relative overflow-hidden" aria-labelledby="newsletter-heading">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel label="// STAY INFORMED" className="justify-center mb-6" />

          <h2 id="newsletter-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight mb-3">
            Join 900+ subscribers
          </h2>
          <p className="text-slate-400 mb-8 text-sm sm:text-base">
            Stay in the loop on autonomous systems, sensing technology, and our latest research.
          </p>

          <div className="p-6 sm:p-8 rounded-sm bg-[#0a0f1e] border border-[#1a2540] relative">
            {/* Corner brackets */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-sky-500/30" aria-hidden="true" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-sky-500/30" aria-hidden="true" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <CheckCircle size={40} className="text-emerald-400" />
                  <p className="font-semibold text-slate-100">You&apos;re subscribed!</p>
                  <p className="text-sm text-slate-500">We&apos;ll be in touch with updates soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="flex-1 relative">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Mail
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="newsletter-email"
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="w-full pl-9 pr-4 py-2.5 bg-[#020409] border border-[#1a2540] rounded text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-colors"
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="newsletter-email-error" className="absolute -bottom-5 left-0 text-[11px] text-red-400" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-[#020409] font-semibold text-sm rounded transition-all duration-200 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]"
                  >
                    {isSubmitting ? (
                      <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                    ) : null}
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="text-[11px] text-slate-600 mt-5 font-mono">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

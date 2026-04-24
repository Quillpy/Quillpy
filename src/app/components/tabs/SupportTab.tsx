import { motion } from 'motion/react';

export function SupportTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto w-full max-w-5xl py-8 sm:py-12"
    >
      <div className="mb-8 text-center">
        <div className="mb-3 text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--brand)' }}>
          Support
        </div>
        <h1 className="mb-3 text-3xl sm:text-4xl" style={{ color: 'var(--text-strong)', fontWeight: 300 }}>
          Support Quillpy
        </h1>
        <p className="mx-auto max-w-xl" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
          Support helps keep projects online and makes more time for experimentation, writing, and shipping.
        </p>
      </div>

      <div className="mb-6 border px-5 py-5 ui-panel-soft" style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--border)' }}>
        <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
          What it supports
        </div>
        <div className="grid gap-3 sm:grid-cols-2" style={{ color: 'var(--text-muted)' }}>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)' }}>Hosting and domain costs</div>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)' }}>More open-source experiments</div>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)' }}>Time spent on content and notes</div>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)' }}>Longer late-night build sessions</div>
        </div>
      </div>

      <motion.a
        href="https://quillpy.gumroad.com"
        target="_blank"
        rel="noopener noreferrer"
        className="ui-hover ui-panel-soft block w-full border px-6 py-4 text-center text-sm"
        style={{
          backgroundColor: 'var(--brand)',
          color: 'var(--primary-foreground)',
          borderColor: 'var(--brand)',
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        Support on Gumroad
      </motion.a>
    </motion.div>
  );
}

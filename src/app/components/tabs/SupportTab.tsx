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
        <div className="mb-3 text-sm uppercase tracking-[0.2em]" style={{ color: '#7fbf9a' }}>
          Support
        </div>
        <h1 className="mb-3 text-3xl sm:text-4xl" style={{ color: '#e6f0ea', fontWeight: 300 }}>
          Support Quillpy
        </h1>
        <p className="mx-auto max-w-xl" style={{ color: '#9db0a5', lineHeight: '1.8' }}>
          Support helps keep projects online and makes more time for experimentation, writing, and shipping.
        </p>
      </div>

      <div className="mb-6 border px-5 py-5 ui-panel-soft" style={{ backgroundColor: '#0f1714', borderColor: '#1f2f28' }}>
        <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: '#7fbf9a' }}>
          What it supports
        </div>
        <div className="grid gap-3 sm:grid-cols-2" style={{ color: '#a6b8ad' }}>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: '#22332b' }}>Hosting and domain costs</div>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: '#22332b' }}>More open-source experiments</div>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: '#22332b' }}>Time spent on content and notes</div>
          <div className="border px-4 py-3 ui-hover" style={{ borderColor: '#22332b' }}>Longer late-night build sessions</div>
        </div>
      </div>

      <motion.a
        href="https://quillpy.gumroad.com"
        target="_blank"
        rel="noopener noreferrer"
        className="ui-hover ui-panel-soft block w-full border px-6 py-4 text-center text-sm"
        style={{
          backgroundColor: '#7fbf9a',
          color: '#0f1a16',
          borderColor: '#7fbf9a',
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        Support on Gumroad
      </motion.a>
    </motion.div>
  );
}

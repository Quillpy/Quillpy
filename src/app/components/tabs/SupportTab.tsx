import { motion } from 'motion/react';

export function SupportTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-2xl mx-auto py-8 sm:py-16"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{ backgroundColor: '#1b2a24' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7fbf9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </motion.div>
        <h1 
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: '#e6f0ea' }}
        >
          Support Quillpy
        </h1>
        <p 
          className="text-sm sm:text-base max-w-md mx-auto"
          style={{ color: '#a6b8ad' }}
        >
          Your support helps me continue building open-source projects, creating content, 
          and exploring new technologies. Every bit of support means a lot!
        </p>
      </div>

      <div 
        className="p-6 rounded-lg mb-6"
        style={{ backgroundColor: '#0f1a16', border: '1px solid #1b2a24' }}
      >
        <h2 
          className="text-lg font-semibold mb-4"
          style={{ color: '#7fbf9a' }}
        >
          Why Support?
        </h2>
        <ul className="space-y-3" style={{ color: '#a6b8ad' }}>
          <li className="flex items-start gap-2">
            <span style={{ color: '#7fbf9a' }}>→</span>
            <span>Helps cover hosting & domain costs for my projects</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#7fbf9a' }}>→</span>
            <span>Motivates me to create more open-source tools</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#7fbf9a' }}>→</span>
            <span>Supports the time spent on tutorials & content</span>
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#7fbf9a' }}>→</span>
            <span>Keeps the coffee flowing for late-night coding sessions ☕</span>
          </li>
        </ul>
      </div>

      <motion.a
        href="https://quillpy.gumroad.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-4 px-6 rounded-lg text-center font-semibold transition-all duration-200"
        style={{ 
          backgroundColor: '#7fbf9a', 
          color: '#0f1a16',
          border: '1px solid #7fbf9a'
        }}
        whileHover={{ scale: 1.02, backgroundColor: '#8fcfa8' }}
        whileTap={{ scale: 0.98 }}
      >
        Support on Gumroad →
      </motion.a>

      <p 
        className="text-center text-xs mt-4"
        style={{ color: '#3a4d42' }}
      >
        Thank you for being awesome! 💚
      </p>
    </motion.div>
  );
}
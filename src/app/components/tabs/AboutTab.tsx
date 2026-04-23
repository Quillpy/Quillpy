import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const TIPS = [
  { text: 'Try the address bar - type "projects" to navigate' },
  { text: 'Use the purple icons for quick navigation' },
];

export function AboutTab() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12">
      <div className="flex justify-center mb-8">
        <Avatar className="w-32 h-32">
          <AvatarImage src="/Quillpy.png" />
          <AvatarFallback className="bg-[#1b2a24] text-[#7fbf9a] font-bold">QP</AvatarFallback>
        </Avatar>
      </div>

      <p 
        className="mb-4 sm:mb-6"
        style={{ 
          fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
          color: '#e6f0ea',
          fontWeight: '400'
        }}
      >
        <span style={{ color: '#7fbf9a' }}>Alias:</span> Quillpy
      </p>

      <p 
        className="mb-4 sm:mb-6"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I'm a 16-year-old student who enjoys exploring how systems work and building small
        experimental tools around the ideas I discover. I see programming less as a subject
        and more as a way to understand the structure behind things.
      </p>

      <p 
        className="mb-6 sm:mb-8"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        My curiosity started in class 9 while wondering how games actually function behind
        the screen. That question slowly expanded into systems, scripting, and AI experiments.
        Since then, I’ve been learning by building — mostly small tools, ideas, and technical
        explorations that help me understand computers better.
      </p>

      <p 
        className="mb-6 sm:mb-8"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        The name <span style={{ color: '#7fbf9a' }}>Quillpy</span> started as an experiment.
        I originally planned to use “Shubhampy”, but after discovering it already existed,
        I explored alternatives and found “Quill”. It felt unique and expressive — so it stayed.
        Since then, Quillpy has become my identity for building and experimenting with ideas.
      </p>

      <div className="mb-6 sm:mb-8">
        <h3 
          className="mb-3 sm:mb-4"
          style={{ 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
            color: '#7fbf9a',
            fontWeight: '500'
          }}
        >
          Interests
        </h3>

        <ul className="space-y-2">
          {[
            'AI experiments 🤖',
            'systems exploration 🧠',
            'automation scripts & tools ⚙️',
            'Linux customization 🐧',
            'designing unusual interfaces 🎨',
            'understanding how things work internally 🔍'
          ].map((interest) => (
            <li 
              key={interest}
              className="flex items-center gap-3"
              style={{ color: '#a6b8ad', fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
            >
              <span style={{ color: '#6f9f84' }}>•</span>
              {interest}
            </li>
          ))}
        </ul>
      </div>

      <p 
        className="mb-4"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        Python is currently my primary language for experimentation and scripting,
        and I use C for understanding low-level concepts. I'm also interested in
        moving toward C++ or Rust in the future.
      </p>

      <p 
        className="mb-6"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I use Linux as my main environment and currently run Kubuntu with KDE.
        I enjoy modifying setups and learning how operating systems behave beneath
        the interface.
      </p>

      <p 
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        Long term, I want to contribute something meaningful to human development —
        whether through programming, systems thinking, or ideas that help people
        understand and build better technology.
      </p>

      <div className="mt-8 pt-4 border-t" style={{ borderColor: '#1b2a24' }}>
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentTip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            style={{ color: '#6f9f84', fontSize: '0.8rem' }}
          >
            <span style={{ color: '#8a5ca8' }}>💡</span> {TIPS[currentTip].text}
          </motion.p>
        </AnimatePresence>
      </div>

    </div>
  );
}
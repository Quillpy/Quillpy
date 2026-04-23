import { Github, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TIPS = [
  { text: 'Click the address bar to type commands directly' },
  { text: 'The colored buttons work - try them!' },
];

interface SocialLink {
  name: string;
  icon: any;
  url: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Quillpy',
    label: '@quillpy',
  },
  {
    name: 'Chess.com',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L4 7v5c0 5 8 10 8 10s8-5 8-10V7l-8-5z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    url: 'https://www.chess.com/member/quillpy',
    label: 'quillpy ♟',
  },
  {
    name: 'Codeforces',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect x="4" y="8" width="4" height="10" />
        <rect x="10" y="5" width="4" height="13" />
        <rect x="16" y="3" width="4" height="15" />
      </svg>
    ),
    url: 'https://codeforces.com/profile/quillpy',
    label: 'quillpy 💻',
  },
  {
    name: 'Instagram',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
    url: 'https://instagram.com/quillpy',
    label: '@quillpy',
  },
  {
    name: 'X',
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    url: 'https://x.com/quillpy',
    label: '@quillpy',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:gm.goofy304@passinbox.com',
    label: 'gm.goofy304@passinbox.com ✉️',
  },
];

export function ConnectTab() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Social Links */}
        <div>
          <h2 
            className="mb-2"
            style={{ 
              fontSize: '1.5rem',
              color: '#e6f0ea',
              fontWeight: '500'
            }}
          >
            Connect
          </h2>

          <p
            style={{
              color: '#a6b8ad',
              fontSize: '0.95rem',
              marginBottom: '1rem'
            }}
          >
            You can find me around the internet here.
          </p>

          <div className="space-y-3">
            {socialLinks.map((link) => (
              <SocialLinkItem key={link.name} link={link} />
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 
            className="mb-4"
            style={{ 
              fontSize: '1.5rem',
              color: '#e6f0ea',
              fontWeight: '500'
            }}
          >
            Send a Message
          </h2>
          <ContactForm />
        </div>

      </div>

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

function SocialLinkItem({ link }: { link: SocialLink }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = link.icon;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-lg transition-all duration-200"
      style={{
        backgroundColor: isHovered ? '#1a1824' : 'transparent',
        border: `1px solid ${isHovered ? '#8a5ca8' : '#1b2a24'}`,
        boxShadow: isHovered ? '0 0 20px rgba(138, 92, 168, 0.1)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ color: isHovered ? '#a78bda' : '#6f9f84' }}>
        <Icon size={24} />
      </div>

      <div className="flex-1">
        <div 
          style={{ 
            fontSize: '1.125rem',
            color: '#e6f0ea',
            fontWeight: '500'
          }}
        >
          {link.name}
        </div>

        <div 
          style={{ 
            fontSize: '0.875rem',
            color: '#a6b8ad'
          }}
        >
          {link.label}
        </div>
      </div>
    </a>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div 
        className="p-6 rounded-lg text-center"
        style={{ 
          backgroundColor: '#1b2a24',
          border: '1px solid #6f9f84'
        }}
      >
        <p style={{ color: '#7fbf9a', fontSize: '1.125rem' }}>
          Message sent! I'll get back to you soon 🚀
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label 
          htmlFor="name"
          className="block mb-2"
          style={{ color: '#a6b8ad', fontSize: '0.875rem' }}
        >
          Name
        </label>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200"
          style={{
            backgroundColor: '#1b2a24',
            border: '1px solid #1b2a24',
            color: '#e6f0ea',
          }}
          onFocus={(e) => e.target.style.borderColor = '#8a5ca8'}
          onBlur={(e) => e.target.style.borderColor = '#1b2a24'}
        />
      </div>

      <div>
        <label 
          htmlFor="email"
          className="block mb-2"
          style={{ color: '#a6b8ad', fontSize: '0.875rem' }}
        >
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200"
          style={{
            backgroundColor: '#1b2a24',
            border: '1px solid #1b2a24',
            color: '#e6f0ea',
          }}
          onFocus={(e) => e.target.style.borderColor = '#8a5ca8'}
          onBlur={(e) => e.target.style.borderColor = '#1b2a24'}
        />
      </div>

      <div>
        <label 
          htmlFor="message"
          className="block mb-2"
          style={{ color: '#a6b8ad', fontSize: '0.875rem' }}
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200 resize-none"
          style={{
            backgroundColor: '#1b2a24',
            border: '1px solid #1b2a24',
            color: '#e6f0ea',
          }}
          onFocus={(e) => e.target.style.borderColor = '#8a5ca8'}
          onBlur={(e) => e.target.style.borderColor = '#1b2a24'}
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 rounded-lg transition-all duration-200"
        style={{
          backgroundColor: '#6f9f84',
          color: '#0f1a16',
          fontWeight: '500',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#8a5ca8';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(138, 92, 168, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#6f9f84';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Send Message
      </button>

    </form>
  );
}
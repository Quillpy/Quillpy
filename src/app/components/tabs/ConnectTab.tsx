import { useState, useEffect, type ComponentType } from 'react';
import { CheckCircle2, Github, Mail, RotateCcw, SendHorizontal, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SocialLink {
  name: string;
  icon: ComponentType<{ size?: number }>;
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
    label: 'quillpy',
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
    label: 'quillpy',
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
        <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    url: 'https://x.com/quillpy',
    label: '@quillpy',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:gm.goofy304@passinbox.com',
    label: 'gm.goofy304@passinbox.com',
  },
];

export function ConnectTab() {
  return (
    <div className="mx-auto w-full max-w-5xl py-6 sm:py-10">
      <div className="mb-8 max-w-2xl">
        <div className="mb-3 text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--brand)' }}>
          Connect
        </div>
        <h1 className="mb-3 text-3xl sm:text-4xl" style={{ color: 'var(--text-strong)', fontWeight: 300 }}>
          Find me on the internet or send a message.
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
          A minimal contact page with the links I use most and a simple message form.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3">
          {socialLinks.map((link) => (
            <SocialLinkItem key={link.name} link={link} />
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

function SocialLinkItem({ link }: { link: SocialLink }) {
  const Icon = link.icon;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="ui-hover ui-panel-soft flex items-center gap-4 border px-4 py-4"
      style={{
        backgroundColor: 'var(--surface-1)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="border p-3" style={{ borderColor: 'var(--border)', color: 'var(--brand)', backgroundColor: 'var(--surface-2)' }}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="mb-1 text-base" style={{ color: 'var(--text-strong)', fontWeight: 400 }}>
          {link.name}
        </div>
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    setStatus('submitting');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', 'New message from Quillpy');
      formDataToSend.append('_gotcha', '');

      await fetch('https://formsubmit.co/gm.goofy304@passinbox.com', {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors',
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="border px-6 py-8 sm:px-8 sm:py-10 text-center"
        style={{
          background: 'var(--success-surface)',
          borderColor: 'var(--brand)',
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 20 }}
            className="mb-6 inline-flex items-center justify-center"
          >
            <div
              className="relative flex h-20 w-20 items-center justify-center"
              style={{ color: 'var(--brand)' }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeInOut' }}
              >
                <PartyPopper size={48} />
              </motion.div>
              <motion.div
                className="absolute -right-2 -top-2"
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CheckCircle2 size={28} />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3 text-2xl sm:text-3xl"
          style={{ color: 'var(--text-strong)', fontWeight: 300 }}
        >
          Message sent!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mb-8 max-w-md mx-auto"
          style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}
        >
          Thanks for reaching out. I&apos;ll get back to you soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="ui-hover ui-panel-soft flex items-center justify-center gap-2 border px-5 py-3"
            style={{ backgroundColor: 'var(--brand)', borderColor: 'var(--brand)', color: 'var(--primary-foreground)' }}
          >
            <RotateCcw size={16} />
            Send another
          </button>
          <a
            href="https://github.com/Quillpy"
            target="_blank"
            rel="noopener noreferrer"
            className="ui-hover ui-panel-soft flex items-center justify-center gap-2 border px-5 py-3"
            style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--border)', color: 'var(--text-strong)' }}
          >
            <Github size={16} style={{ color: 'var(--brand)' }} />
            View GitHub
          </a>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border px-5 py-5 space-y-4 ui-panel-soft" style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--border)' }}>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm" style={{ color: 'var(--text-muted)' }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          className="w-full border px-3 py-2.5 outline-none transition-colors"
          style={{ 
            backgroundColor: 'var(--surface-2)', 
            borderColor: 'var(--border)', 
            color: 'var(--text-strong)'
          }}
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm" style={{ color: 'var(--text-muted)' }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          className="w-full border px-3 py-2.5 outline-none transition-colors"
          style={{ 
            backgroundColor: 'var(--surface-2)', 
            borderColor: 'var(--border)', 
            color: 'var(--text-strong)'
          }}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm" style={{ color: 'var(--text-muted)' }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="min-h-36 w-full border px-3 py-2.5 outline-none"
          style={{ 
            backgroundColor: 'var(--surface-2)', 
            borderColor: 'var(--border)', 
            color: 'var(--text-strong)',
            resize: 'vertical',
            minHeight: '9rem'
          }}
          placeholder="Tell me what you want to build, ask, or share."
          required
        />
      </div>

      {status === 'error' && (
        <div
          className="border px-3 py-2 text-sm"
          style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--destructive)', color: 'var(--destructive)' }}
        >
          Something went wrong while sending the message. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="ui-hover ui-panel-soft flex w-full items-center justify-center gap-2 border px-4 py-3 text-sm"
        style={{ backgroundColor: 'var(--brand)', borderColor: 'var(--brand)', color: 'var(--primary-foreground)', opacity: status === 'submitting' ? 0.82 : 1 }}
      >
        <SendHorizontal size={16} />
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}

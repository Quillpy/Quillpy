import { useState } from 'react';
import { CheckCircle2, Github, Mail, RotateCcw, SendHorizontal } from 'lucide-react';

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
      const response = await fetch('https://formsubmit.co/ajax/gm.goofy304@passinbox.com', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      if (data.success === 'false') {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className="ui-panel border px-6 py-6 sm:px-7 sm:py-8"
        style={{
          background: 'var(--success-surface)',
          borderColor: 'var(--brand)',
        }}
      >
        <div className="mb-5 inline-flex items-center gap-2 border px-3 py-1 text-xs uppercase tracking-[0.22em]" style={{ borderColor: 'color-mix(in srgb, var(--brand) 45%, var(--border))', color: 'var(--brand)' }}>
          <CheckCircle2 size={14} />
          Sent
        </div>
        <h2 className="mb-3 text-2xl sm:text-3xl" style={{ color: 'var(--text-strong)', fontWeight: 300 }}>
          Message delivered successfully.
        </h2>
        <p className="max-w-xl" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
          Thanks for reaching out. I&apos;ve got your note and will get back to you soon. If you want to keep browsing, the links on the left are still here.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="https://github.com/Quillpy"
            target="_blank"
            rel="noopener noreferrer"
            className="ui-hover ui-panel-soft flex items-center justify-between border px-4 py-3"
            style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--border)', color: 'var(--text-strong)' }}
          >
            <span>Open GitHub</span>
            <Github size={16} style={{ color: 'var(--brand)' }} />
          </a>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="ui-hover ui-panel-soft flex items-center justify-between border px-4 py-3"
            style={{ backgroundColor: 'var(--brand)', borderColor: 'var(--brand)', color: 'var(--primary-foreground)' }}
          >
            <span>Send another message</span>
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} action="https://formsubmit.co/gm.goofy304@passinbox.com" method="POST" className="border px-5 py-5 space-y-4 ui-panel-soft" style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--border)' }}>
      <input type="text" name="_gotcha" style={{ display: 'none' }} />
      <input type="hidden" name="_subject" value="New message from Quillpy" />
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
          className="w-full border px-3 py-2.5 outline-none ui-hover"
          style={{ backgroundColor: 'var(--input-background)', borderColor: 'var(--border)', color: 'var(--text-strong)' }}
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
          className="w-full border px-3 py-2.5 outline-none ui-hover"
          style={{ backgroundColor: 'var(--input-background)', borderColor: 'var(--border)', color: 'var(--text-strong)' }}
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
          className="min-h-36 w-full border px-3 py-2.5 outline-none ui-hover"
          style={{ backgroundColor: 'var(--input-background)', borderColor: 'var(--border)', color: 'var(--text-strong)' }}
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

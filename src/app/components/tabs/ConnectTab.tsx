import { useState } from 'react';
import { Github, Mail } from 'lucide-react';

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
        <div className="mb-3 text-sm uppercase tracking-[0.2em]" style={{ color: '#7fbf9a' }}>
          Connect
        </div>
        <h1 className="mb-3 text-3xl sm:text-4xl" style={{ color: '#e6f0ea', fontWeight: 300 }}>
          Find me on the internet or send a message.
        </h1>
        <p style={{ color: '#9db0a5', lineHeight: '1.8' }}>
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
        backgroundColor: '#0f1714',
        borderColor: '#1f2f28',
      }}
    >
      <div className="border p-3" style={{ borderColor: '#22332b', color: '#7fbf9a' }}>
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="mb-1 text-base" style={{ color: '#e6f0ea', fontWeight: 400 }}>
          {link.name}
        </div>
        <div className="text-sm" style={{ color: '#9db0a5' }}>
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="border px-5 py-6 text-center ui-panel-soft" style={{ backgroundColor: '#101814', borderColor: '#294037' }}>
        <p style={{ color: '#7fbf9a' }}>Message sent. I will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border px-5 py-5 space-y-4 ui-panel-soft" style={{ backgroundColor: '#0f1714', borderColor: '#1f2f28' }}>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm" style={{ color: '#a6b8ad' }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          className="w-full border px-3 py-2.5 outline-none ui-hover"
          style={{ backgroundColor: '#101814', borderColor: '#22332b', color: '#e6f0ea' }}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm" style={{ color: '#a6b8ad' }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          className="w-full border px-3 py-2.5 outline-none ui-hover"
          style={{ backgroundColor: '#101814', borderColor: '#22332b', color: '#e6f0ea' }}
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm" style={{ color: '#a6b8ad' }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          className="min-h-36 w-full border px-3 py-2.5 outline-none ui-hover"
          style={{ backgroundColor: '#101814', borderColor: '#22332b', color: '#e6f0ea' }}
          required
        />
      </div>

      <button
        type="submit"
        className="ui-hover ui-panel-soft w-full border px-4 py-3 text-sm"
        style={{ backgroundColor: '#7fbf9a', borderColor: '#7fbf9a', color: '#0d1512' }}
      >
        Send message
      </button>
    </form>
  );
}

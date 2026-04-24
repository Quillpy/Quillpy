import { motion } from 'motion/react';
import { ArrowUpRight, FolderGit2, Sparkles } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  url: string;
  status: string;
  type: string;
  stack: string[];
}

const projects: Project[] = [
  {
    title: 'FastCR',
    description: 'A lightweight code runner built for quick local experiments and short feedback loops.',
    url: 'https://github.com',
    status: 'Active',
    type: 'Tooling',
    stack: ['Python', 'CLI', 'Automation'],
  },
  {
    title: 'Linux Setup',
    description: 'A refined Arch and KDE environment shaped around speed, focus, and a quieter desktop.',
    url: 'https://github.com',
    status: 'Iterating',
    type: 'System',
    stack: ['Linux', 'Shell', 'Dotfiles'],
  },
  {
    title: 'Dotfiles',
    description: 'Minimal personal configuration files for terminal, editor, and workflow setup.',
    url: 'https://github.com',
    status: 'Stable',
    type: 'Config',
    stack: ['Bash', 'Neovim', 'Git'],
  },
  {
    title: 'Experimental Ideas',
    description: 'A stream of smaller interfaces, scripts, and technical sketches that turn curiosity into code.',
    url: 'https://github.com',
    status: 'Growing',
    type: 'Lab',
    stack: ['UI', 'Scripts', 'Prototypes'],
  },
];

export function ProjectsTab() {
  const featured = projects[0];
  const remainingProjects = projects.slice(1);

  return (
    <div className="mx-auto w-full max-w-5xl py-6 sm:py-10">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10">
        <div className="inline-flex w-fit items-center gap-2 border px-3 py-1 text-xs uppercase tracking-[0.24em]" style={{ borderColor: '#22332b', color: '#6f9f84' }}>
          <FolderGit2 size={14} />
          Project Gallery
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '300',
            color: '#e6f0ea',
            lineHeight: '1.05',
          }}
        >
          Small systems, experiments, and tools.
        </h1>
        <p
          className="max-w-2xl"
          style={{
            color: '#9db0a5',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            lineHeight: '1.8',
          }}
        >
          A focused selection of projects that reflect how I learn: build something real, strip it down, then refine it until it feels useful.
        </p>
      </div>

      <motion.a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        className="ui-hover ui-panel mb-4 block border p-5 sm:mb-5 sm:p-7"
        whileHover={{ y: -4 }}
        style={{
          background: 'linear-gradient(180deg, rgba(19, 29, 24, 0.96) 0%, rgba(12, 18, 15, 0.96) 100%)',
          borderColor: '#294037',
          boxShadow: '0 18px 40px rgba(0, 0, 0, 0.22)',
        }}
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 border px-3 py-1 text-xs" style={{ borderColor: '#2c443a', color: '#7fbf9a' }}>
              <Sparkles size={12} />
              Featured
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl" style={{ color: '#e6f0ea', fontWeight: 400 }}>
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl" style={{ color: '#a6b8ad', lineHeight: '1.8' }}>
                {featured.description}
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 border px-3 py-1.5 text-sm ui-hover" style={{ borderColor: '#22332b', color: '#c6d4cc' }}>
            View project
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ProjectMeta label="Status" value={featured.status} />
          <ProjectMeta label="Type" value={featured.type} />
          <ProjectMeta label="Stack" value={featured.stack.join(' / ')} />
        </div>
      </motion.a>

      <div className="grid gap-4 md:grid-cols-2">
        {remainingProjects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-hover ui-panel-soft block border p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index, duration: 0.35 }}
            whileHover={{ y: -3 }}
            style={{
              backgroundColor: '#0f1714',
              borderColor: '#1f2f28',
            }}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="mb-2 inline-flex border px-2.5 py-1 text-xs" style={{ borderColor: '#22332b', color: '#6f9f84' }}>
                  {project.type}
                </div>
                <h3 className="text-xl" style={{ color: '#e6f0ea', fontWeight: 400 }}>
                  {project.title}
                </h3>
              </div>
              <ArrowUpRight size={18} style={{ color: '#6f9f84' }} />
            </div>

            <p className="mb-5" style={{ color: '#a6b8ad', lineHeight: '1.75' }}>
              {project.description}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border px-2.5 py-1 text-xs ui-hover"
                  style={{ borderColor: '#22332b', color: '#8ea99a' }}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="text-sm" style={{ color: '#7fbf9a' }}>
              {project.status}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function ProjectMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border px-4 py-3 ui-panel-soft" style={{ borderColor: '#22332b', backgroundColor: 'rgba(11, 18, 15, 0.45)' }}>
      <div className="mb-1 text-xs uppercase tracking-[0.18em]" style={{ color: '#5e776a' }}>
        {label}
      </div>
      <div style={{ color: '#dbe6df' }}>{value}</div>
    </div>
  );
}

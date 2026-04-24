import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const INTERESTS = [
  'AI experiments',
  'systems exploration',
  'automation scripts and tools',
  'Linux customization',
  'unusual interfaces',
  'understanding how things work internally',
];

export function AboutTab() {
  return (
    <div className="mx-auto w-full max-w-5xl py-6 sm:py-10">
      <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar className="h-28 w-28 border" style={{ borderColor: 'var(--border)', borderRadius: 0, boxShadow: '0 12px 28px var(--shadow-color)' }}>
          <AvatarImage src="/Quillpy.png" />
          <AvatarFallback className="font-bold" style={{ backgroundColor: 'var(--surface-2)', color: 'var(--brand)' }}>QP</AvatarFallback>
        </Avatar>

        <div>
          <div className="mb-2 text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--brand)' }}>
            About
          </div>
          <h1 className="text-3xl sm:text-4xl" style={{ color: 'var(--text-strong)', fontWeight: 300 }}>
            Quillpy
          </h1>
          <p className="mt-3 max-w-xl" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            A student learning through projects, systems curiosity, and repeated experimentation.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AboutPanel>
          I am a 16-year-old student who enjoys understanding how systems work and building small technical ideas around that curiosity. Programming feels less like a subject and more like a way to study structure.
        </AboutPanel>
        <AboutPanel>
          My interest started in class 9 while wondering how games actually worked behind the screen. That question expanded into scripting, Linux, AI experiments, and the habit of learning by building.
        </AboutPanel>
        <AboutPanel>
          Python is my main language for experiments and scripting. I also use C to understand lower-level ideas, and I want to keep moving toward C++ or Rust over time.
        </AboutPanel>
        <AboutPanel>
          I use Linux as my main environment and enjoy reshaping the setup until it becomes quieter, faster, and more intentional.
        </AboutPanel>
      </div>

      <div className="mt-6 border px-5 py-5 ui-panel-soft" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)' }}>
        <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
          Interests
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {INTERESTS.map((interest) => (
            <div key={interest} className="border px-3 py-2.5 text-sm ui-hover" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', backgroundColor: 'var(--surface-2)' }}>
              {interest}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-hover ui-panel-soft border px-5 py-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)', color: 'var(--text-muted)', lineHeight: '1.85' }}>
      {children}
    </div>
  );
}

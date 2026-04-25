import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const INTERESTS = [
  'building websites and tools',
  'user experience and design',
  'how things work under the hood',
  'tech that matters',
  'psychology and human behavior',
  'history and strategy',
];

const SYSTEM_SPECS = {
  os: 'Kubuntu 25.10',
  kernel: '6.17.0-22-generic',
  de: 'KDE Plasma 6.4.5',
  cpu: 'Intel Core i3-4160 @ 3.60GHz',
  ram: '4 GiB (3.7 GiB usable, tragic)',
  graphics: 'Intel HD Graphics 4400',
};

export function AboutTab() {
  return (
    <div className="mx-auto w-full max-w-5xl py-6 sm:py-10">
      <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar className="h-28 w-28 border" style={{ borderColor: 'var(--border)', borderRadius: 0, boxShadow: '0 12px 28px var(--shadow-color)' }}>
          <AvatarImage src="/Quillpy.png" />
          <AvatarFallback className="font-bold" style={{ backgroundColor: 'var(--surface-2)', color: 'var(--brand)' }}>SP</AvatarFallback>
        </Avatar>

        <div>
          <div className="mb-2 text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--brand)' }}>
            About
          </div>
          <h1 className="text-3xl sm:text-4xl" style={{ color: 'var(--text-strong)', fontWeight: 300 }}>
            Shubham Pandey
          </h1>
          <p className="mt-3 max-w-xl" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            16-year-old tinkerer from a small town in India. Born 29 Nov 2009. Yes, I'm that guy who breaks things to understand them.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AboutPanel>
          So here's the deal — I grew up in a village so small it had less than 100 people. Before I turned 5, we moved to a slightly bigger town (still tiny by any reasonable measure, but hey, it had a computer lab). I've got a fun little health situation: my left kidney decided to stay small since childhood, which means I can't go crazy with physical activities. But hey, I'm alive and that's what matters! Blood pressure likes to play jump rope sometimes but it's all good.
        </AboutPanel>
        <AboutPanel>
          First time I touched a computer was in school lab, class 3. Couldn't even use a mouse properly (true story). Then in class 7 or 8, I got my own PC and that's when things got interesting. Started with online classes (school computers were basically vintage artifacts), but by class 9 I was deep into exploring everything. Found programming and went full curious mode. Took about a year before I made my first project. Class 10 hit and studies happened. After 10th, I did CS50, YouTube'd my way through the rest, and here we are.
        </AboutPanel>
        <AboutPanel>
          Currently running the show on Kubuntu 25.10 with KDE Plasma. It's a 2014-era machine with an Intel i3-4160, 4GB RAM (usable: 3.7GB, thanks biology), and Intel HD Graphics 4400. Yes, it runs. Barely, but it runs. Waiting for class 11 and will probably upgrade soon. Also will shift to Delhi soon — watch this space.
        </AboutPanel>
      </div>

      <div className="mt-6 border px-5 py-5 ui-panel-soft" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)' }}>
        <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
          Machine Specs (for the curious)
        </div>
        <div className="grid gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <div className="flex justify-between border-b py-2" style={{ borderColor: 'var(--border)' }}>
            <span>OS</span>
            <span style={{ color: 'var(--brand)' }}>{SYSTEM_SPECS.os}</span>
          </div>
          <div className="flex justify-between border-b py-2" style={{ borderColor: 'var(--border)' }}>
            <span>DE</span>
            <span style={{ color: 'var(--brand)' }}>{SYSTEM_SPECS.de}</span>
          </div>
          <div className="flex justify-between border-b py-2" style={{ borderColor: 'var(--border)' }}>
            <span>Kernel</span>
            <span style={{ color: 'var(--brand)' }}>{SYSTEM_SPECS.kernel}</span>
          </div>
          <div className="flex justify-between border-b py-2" style={{ borderColor: 'var(--border)' }}>
            <span>CPU</span>
            <span style={{ color: 'var(--brand)' }}>{SYSTEM_SPECS.cpu}</span>
          </div>
          <div className="flex justify-between border-b py-2" style={{ borderColor: 'var(--border)' }}>
            <span>RAM</span>
            <span style={{ color: 'var(--brand)' }}>{SYSTEM_SPECS.ram}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Graphics</span>
            <span style={{ color: 'var(--brand)' }}>{SYSTEM_SPECS.graphics}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 border px-5 py-5 ui-panel-soft" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)' }}>
        <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
          Interests
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {INTERESTS.map((interest) => (
            <div key={interest} className="border px-3 py-2.5 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', backgroundColor: 'var(--surface-2)' }}>
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
    <div className="ui-panel-soft border px-5 py-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)', color: 'var(--text-muted)', lineHeight: '1.85' }}>
      {children}
    </div>
  );
}

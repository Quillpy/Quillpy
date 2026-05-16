import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const INTERESTS = [
  'building websites and tools',
  'user experience and design',
  'how things work under the hood',
  'tech that matters',
  'psychology and human behavior',
  'math and science',
];

const SKILLS = [
  { category: 'Languages', items: ['Python', 'C', 'JavaScript', 'SQL', 'HTML/CSS'] },
  { category: 'Tools', items: ['Linux', 'Git', 'VS Code', 'Vim', 'Github'] },
  { category: 'Concepts', items: ['Data Structures', 'Algorithms', 'Memory Management'] },
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
            16 year old from India. I like breaking stuff to see how it works, then putting it back together better.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AboutPanel>
          So here's my story — I grew up in a tiny village with less than 100 people. Before I turned 5, we moved to a slightly bigger town (still pretty small though).

          I've got a health thing going on: my left kidney has been smaller since I was a kid, so I can't do heavy physical stuff. But I'm doing okay — still here, still going. Blood pressure acts up sometimes, but it's manageable.
        </AboutPanel>
        <AboutPanel>
          First time I touched a computer was in school lab, class 3. Couldn't even use a mouse properly (true story). Now, I know that those computers on school were trash. Then, in class 7 or 8, I got my own PC and that's when things got interesting. Started with online classes, but by class 9 I was deep into exploring everything. I found programming and went full curious mode. Took about a year before I made my first project. Class 10 hit and studies happened. After 10th, I did CS50, YouTube'd my way through the rest, and here we are.
        </AboutPanel>
        <AboutPanel>
          Currently running the show on Kubuntu 25.10 with KDE Plasma. It's a 2014-era machine with an Intel i3-4160, 4GB RAM (usable: 3.7GB, thanks biology), and Intel HD Graphics 4400. Yes, it runs. Barely, but it runs. I am waiting for class 11 schools to start and will probably upgrade soon. Also will shift to Delhi soon — watch this space.
        </AboutPanel>
      </div>

      <div className="mt-6 border px-5 py-5 ui-panel-soft" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)' }}>
          <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
            My Machine (for the curious)
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
          GitHub Stats
        </div>
        <div className="flex justify-center">
          <a href="https://awesome-github-stats.azurewebsites.net/index.html??cardType=github&theme=gotham&fontFamily=Allerta&preferLogin=false" target="_blank" rel="noopener noreferrer">
            <img 
              alt="Quillpy's GitHub Stats" 
              src="https://awesome-github-stats.azurewebsites.net/user-stats/Quillpy?cardType=github&theme=gotham&fontFamily=Allerta&preferLogin=false" 
              className="max-w-full"
              style={{ borderRadius: '0' }}
            />
          </a>
        </div>
      </div>

      <div className="mt-6 border px-5 py-5 ui-panel-soft" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)' }}>
        <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
          Things I Like
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {INTERESTS.map((interest) => (
            <div key={interest} className="border px-3 py-2.5 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', backgroundColor: 'var(--surface-2)' }}>
              {interest}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border px-5 py-5 ui-panel-soft" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)' }}>
          <div className="mb-4 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
            Stuff I Know
          </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {SKILLS.map((skill) => (
            <div key={skill.category}>
              <div className="mb-2 text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--text-soft)' }}>
                {skill.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="border px-2.5 py-1.5 text-xs"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', backgroundColor: 'var(--surface-2)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
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

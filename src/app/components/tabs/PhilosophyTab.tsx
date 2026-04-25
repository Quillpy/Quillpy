const principles = [
  'Truth matters more than comfort.',
  'Question everything—systems, leaders, and accepted norms.',
  'History is shaped by human nature more than ideology.',
  'Power often hides behind narratives, propaganda, and selective morality.',
  'Peace is admirable, but peace without strength is fragile.',
  'Aggression wins battles; restraint wins legitimacy.',
  'Revolution inspires emotion; strategy sustains nations.',
  'Leaders are judged differently in war and peace.',
  'India and Pakistan reflect the long-term consequences of political psychology.',
  'Societies inherit trauma, pride, and fear across generations.',
  'Military power can defend borders but can also shape politics.',
  'Human emotion influences politics more than logic admits.',
  'Most people follow systems; few question why systems exist.',
  'Simplicity is intelligence; unnecessary complexity is often insecurity.',
  'Speed, elegance, and precision create delight.',
  'Technology should feel magical yet useful.',
  'Curiosity is the engine of progress.',
  'Build things so good they feel inevitable.',
  'National borders are political; humanity is larger.',
  'Every system can be redesigned.',
];

export function PhilosophyTab() {
  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-12 w-full">
      <h1
        className="mb-6"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
          color: 'var(--text-strong)',
          fontWeight: '300'
        }}
      >
        Philosophy
      </h1>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '1rem',
          marginBottom: '2rem'
        }}
      >
        Thoughts that shape how I see history, power, people, and the things I build.
      </p>

      <div className="space-y-6 sm:space-y-8">
        {principles.map((principle, index) => (
          <div
            key={index}
            className="py-3 sm:py-4 border-l-2 pl-4 sm:pl-6"
            style={{ borderColor: 'var(--brand)' }}
          >
            <p
              style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                color: 'var(--text-strong)',
                fontWeight: '300',
                lineHeight: '1.6'
              }}
            >
              {principle}
            </p>
          </div>
        ))}
      </div>

      <p
        style={{
          color: 'var(--text-soft)',
          marginTop: '2rem',
          fontSize: '0.9rem'
        }}
      >
        Built on curiosity, realism, design, and the belief that history and systems can be understood—and improved.
      </p>
    </div>
  );
}

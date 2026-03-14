const principles = [
  'Curiosity is more valuable than certainty.',
  'Understand systems instead of memorizing tools.',
  'Simplicity beats unnecessary complexity.',
  'Progress happens when people question what is.',
  'Human nature matters more than ideal theories.',
  'Technology should feel elegant.',
  'We are citizens of one world.',
  'Build things that make you curious.',
];

export function PhilosophyTab() {
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12">

      <h1
        className="mb-6"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
          color: '#e6f0ea',
          fontWeight: '300'
        }}
      >
        Philosophy
      </h1>

      <p
        style={{
          color: '#a6b8ad',
          fontSize: '1rem',
          marginBottom: '2rem'
        }}
      >
        A few ideas that shape how I think and build.
      </p>

      <div className="space-y-6 sm:space-y-8">
        {principles.map((principle, index) => (
          <div
            key={index}
            className="py-3 sm:py-4 border-l-2 pl-4 sm:pl-6"
            style={{ borderColor: '#6f9f84' }}
          >
            <p
              style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                color: '#e6f0ea',
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
          color: '#7b8f86',
          marginTop: '2rem',
          fontSize: '0.9rem'
        }}
      >
        Inspired by philosophy, systems thinking, and curiosity about the world.
      </p>

    </div>
  );
}
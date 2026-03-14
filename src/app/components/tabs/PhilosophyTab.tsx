const principles = [
  'Simplicity beats complexity.',
  'Build things that make you curious.',
  'Understand systems instead of memorizing tools.',
  'Technology should feel elegant.',
];

export function PhilosophyTab() {
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12">
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
    </div>
  );
}
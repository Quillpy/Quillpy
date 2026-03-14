export function AboutTab() {
  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-12">
      <p 
        className="mb-4 sm:mb-6"
        style={{ 
          fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
          color: '#e6f0ea',
          fontWeight: '400'
        }}
      >
        <span style={{ color: '#7fbf9a' }}>Alias:</span> Quillpy
      </p>
      
      <p 
        className="mb-6 sm:mb-8"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I like building things with code and experimenting with systems.
      </p>
      
      <div className="mb-6 sm:mb-8">
        <h3 
          className="mb-3 sm:mb-4"
          style={{ 
            fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
            color: '#7fbf9a',
            fontWeight: '500'
          }}
        >
          Interests:
        </h3>
        <ul className="space-y-2">
          {['programming', 'Linux customization', 'chess', 'game mechanics', 'creative engineering ideas'].map((interest) => (
            <li 
              key={interest}
              className="flex items-center gap-3"
              style={{ color: '#a6b8ad', fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
            >
              <span style={{ color: '#6f9f84' }}>•</span>
              {interest}
            </li>
          ))}
        </ul>
      </div>
      
      <p 
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I enjoy simple tools, minimal design, and learning by building.
      </p>
    </div>
  );
}
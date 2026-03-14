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
        className="mb-4 sm:mb-6"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I'm a 16 year old student who enjoys building things with code and exploring how systems work.
      </p>

      <p 
        className="mb-6 sm:mb-8"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I first got my PC in class 7. Like most people I used it for games and school work,
        but in class 9 I became curious about how games are made. That curiosity led me
        to programming — and I haven't looked back since.
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
          Interests
        </h3>

        <ul className="space-y-2">
          {[
            'programming 💻',
            'Linux customization 🐧',
            'chess ♟',
            'game mechanics 🎮',
            'creative engineering ideas ⚙️'
          ].map((interest) => (
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
        className="mb-4"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        Python is my main language, and I also use C++ for competitive programming.
      </p>

      <p 
        className="mb-6"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I moved from Windows to Linux while exploring different systems and
        currently use Arch Linux with KDE — though I enjoy switching things
        and experimenting with setups.
      </p>

      <p 
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I'm interested in the intersection of programming, systems, and creative engineering.
      </p>

    </div>
  );
}
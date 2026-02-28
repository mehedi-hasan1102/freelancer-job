'use client';

export default function SkillsSkeleton() {
  const isDarkMode =
    typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true;
  const shimmerBg = isDarkMode ? '#2a2a2a' : '#d1d5db';
  const shimmerAnimation = `
    @keyframes shimmer {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `;

  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg)', minHeight: '600px' }}>
      <style>{shimmerAnimation}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div
            style={{
              height: '48px',
              background: shimmerBg,
              borderRadius: '8px',
              marginBottom: '1rem',
              animation: 'shimmer 1.5s infinite',
              width: '60%',
              margin: '0 auto 1rem',
            }}
          />
          <div
            style={{
              height: '20px',
              background: shimmerBg,
              borderRadius: '8px',
              animation: 'shimmer 1.5s infinite',
              width: '40%',
              margin: '0 auto',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ padding: '2rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px' }}>
              <div
                style={{
                  height: '24px',
                  background: shimmerBg,
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  animation: 'shimmer 1.5s infinite',
                }}
              />
              <div
                style={{
                  height: '16px',
                  background: shimmerBg,
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  animation: 'shimmer 1.5s infinite',
                  width: '90%',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {Array.from({ length: 3 }).map((_, j) => (
                  <div
                    key={j}
                    style={{
                      height: '32px',
                      background: shimmerBg,
                      borderRadius: '6px',
                      animation: 'shimmer 1.5s infinite',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

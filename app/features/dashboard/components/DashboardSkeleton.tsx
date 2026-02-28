'use client';

import { CARD, DASHBOARD, DASHBOARD_CONTAINER, MAIN_GRID, PROJECTS_GRID, PROJECT_CARD } from '../constants';

export default function DashboardSkeleton() {
  const isDarkMode =
    typeof document !== 'undefined'
      ? !document.documentElement.classList.contains('light-mode')
      : true;
  const shimmerBg = isDarkMode ? '#2a2a2a' : '#d1d5db';

  return (
    <div className={DASHBOARD}>
      <div className={DASHBOARD_CONTAINER}>
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              width: '60%',
              height: '64px',
              borderRadius: '12px',
              background: shimmerBg,
              margin: '0 auto',
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>

        <div className={MAIN_GRID}>
          {[1, 2].map((i) => (
            <div key={i} className={CARD}>
              <div
                style={{
                  width: '40%',
                  height: '24px',
                  borderRadius: '6px',
                  background: shimmerBg,
                  marginBottom: '1.25rem',
                  animation: 'shimmer 2s infinite',
                }}
              />
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  style={{
                    width: j === 3 ? '70%' : '100%',
                    height: '14px',
                    borderRadius: '6px',
                    background: shimmerBg,
                    marginBottom: '0.75rem',
                    animation: 'shimmer 2s infinite',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div className={CARD}>
            <div
              style={{
                width: '30%',
                height: '24px',
                borderRadius: '6px',
                background: shimmerBg,
                marginBottom: '1.5rem',
                animation: 'shimmer 2s infinite',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '140px',
                borderRadius: '12px',
                background: shimmerBg,
                animation: 'shimmer 2s infinite',
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              width: '35%',
              height: '24px',
              borderRadius: '6px',
              background: shimmerBg,
              marginBottom: '1.5rem',
              animation: 'shimmer 2s infinite',
            }}
          />
          <div className={PROJECTS_GRID}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={PROJECT_CARD}>
                <div
                  style={{
                    width: '70%',
                    height: '18px',
                    borderRadius: '6px',
                    background: shimmerBg,
                    marginBottom: '0.75rem',
                    animation: 'shimmer 2s infinite',
                  }}
                />
                {[1, 2].map((j) => (
                  <div
                    key={j}
                    style={{
                      width: j === 2 ? '60%' : '100%',
                      height: '12px',
                      borderRadius: '6px',
                      background: shimmerBg,
                      marginBottom: '0.5rem',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                ))}
                <div
                  style={{
                    width: '100%',
                    height: '12px',
                    borderRadius: '6px',
                    background: shimmerBg,
                    marginTop: '1rem',
                    animation: 'shimmer 2s infinite',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

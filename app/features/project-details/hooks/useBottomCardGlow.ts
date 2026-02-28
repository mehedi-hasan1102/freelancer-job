'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export const useBottomCardGlow = () => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const cards = document.querySelectorAll('.projectDetailsPage .bottomCard');

      cards.forEach((card) => {
        const glow = card.querySelector('.bottomGlow') as HTMLElement | null;
        if (!glow) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          gsap.to(glow, {
            left: x - 60,
            top: y - 60,
            duration: 0.3,
            ease: 'power2.out',
          });
          glow.style.opacity = '0.8';
        } else {
          glow.style.opacity = '0';
        }
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.projectDetailsPage .bottomCard');
      cards.forEach((card) => {
        const glow = card.querySelector('.bottomGlow') as HTMLElement | null;
        if (glow) {
          glow.style.opacity = '0';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
};

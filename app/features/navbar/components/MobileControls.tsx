'use client';

import { FiCalendar, FiMenu, FiX } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

type MobileControlsProps = {
  isDark: boolean;
  isOpen: boolean;
  onOpenBookingModal: () => void;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
};

export default function MobileControls({
  isDark,
  isOpen,
  onOpenBookingModal,
  onToggleTheme,
  onToggleMenu,
}: MobileControlsProps) {
  return (
    <div className="flex items-center gap-1.5 lg:hidden sm:gap-2">
      <button
        onClick={onOpenBookingModal}
        className="rounded-full bg-[rgba(var(--accent-rgb),0.2)] p-1.5 text-[var(--accent)] transition-all duration-300 hover:scale-110 sm:p-2"
        aria-label="Book a call"
      >
        <FiCalendar size={18} />
      </button>

      <button
        type="button"
        onClick={onToggleTheme}
        className="rounded-full bg-[rgba(var(--accent-rgb),0.1)] p-1.5 text-[var(--accent)] transition-all duration-300 hover:scale-110 sm:p-2"
        aria-label="Toggle theme"
        title="Toggle theme"
        data-theme-toggle-btn
      >
        {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>

      <button
        onClick={onToggleMenu}
        className="rounded-full bg-[rgba(var(--accent-rgb),0.1)] p-1.5 text-[var(--accent)] transition-all duration-300 hover:scale-110 sm:p-2"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>
    </div>
  );
}

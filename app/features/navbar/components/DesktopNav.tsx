'use client';

import Link from 'next/link';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
import { type MouseEvent, type RefObject } from 'react';
import gsap from 'gsap';
import { MORE_ITEMS, NAV_LINKS } from '../constants';

type DesktopNavProps = {
  pathname: string;
  isDark: boolean;
  isDropdownOpen: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onToggleTheme: () => void;
  onLinkHover: (event: MouseEvent<HTMLAnchorElement>) => void;
  onLinkHoverEnd: (event: MouseEvent<HTMLAnchorElement>) => void;
  onOpenDropdown: () => void;
  onCloseDropdownWithDelay: () => void;
  onToggleDropdownLock: () => void;
  onCloseDropdown: () => void;
  onOpenBookingModal: () => void;
};

export default function DesktopNav({
  pathname,
  isDark,
  isDropdownOpen,
  dropdownRef,
  onToggleTheme,
  onLinkHover,
  onLinkHoverEnd,
  onOpenDropdown,
  onCloseDropdownWithDelay,
  onToggleDropdownLock,
  onCloseDropdown,
  onOpenBookingModal,
}: DesktopNavProps) {
  return (
    <div className="hidden shrink-0 items-center rounded-full border border-[rgba(var(--accent-rgb),0.15)] bg-[rgba(var(--accent-rgb),0.08)] py-2 backdrop-blur-[10px] lg:flex lg:gap-4 lg:px-4 xl:gap-6 xl:px-6">
      <button
        type="button"
        onClick={onToggleTheme}
        className="inline-flex rounded-full bg-[rgba(var(--accent-rgb),0.1)] p-2 text-[var(--accent)] transition-all duration-300 hover:bg-[rgba(var(--accent-rgb),0.15)]"
        aria-label="Toggle theme"
        title="Toggle theme"
        data-theme-toggle-btn
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.1)';
        }}
      >
        {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
      </button>

      <div className="h-6 w-px bg-[rgba(var(--accent-rgb),0.2)]" />

      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkHoverEnd}
            className={`relative cursor-pointer whitespace-nowrap text-sm font-medium uppercase tracking-[0.025em] transition-all duration-300 ${
              isActive ? 'text-[var(--accent)]' : 'text-[var(--text)]'
            }`}
          >
            {link.label}
            {isActive ? (
              <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
            ) : null}
          </Link>
        );
      })}

      <div
        ref={dropdownRef}
        className="relative"
        onMouseEnter={onOpenDropdown}
        onMouseLeave={onCloseDropdownWithDelay}
      >
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          aria-controls="desktop-more-menu"
          className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium uppercase tracking-[0.025em] transition-all duration-200 active:scale-[0.98] ${
            isDropdownOpen
              ? 'bg-[rgba(var(--accent-rgb),0.14)] text-[var(--accent)] shadow-[0_0_14px_rgba(var(--accent-rgb),0.2)]'
              : 'text-[var(--text)] hover:bg-[rgba(var(--accent-rgb),0.1)] hover:text-[var(--accent)]'
          }`}
          onClick={onToggleDropdownLock}
          onFocus={onOpenDropdown}
        >
          More
          <span
            aria-hidden
            className={`inline-block transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <FiChevronDown size={16} />
          </span>
        </button>

        <div
          id="desktop-more-menu"
          role="menu"
          onMouseEnter={onOpenDropdown}
          onMouseLeave={onCloseDropdownWithDelay}
          className={`absolute left-0 top-full mt-3 w-52 origin-top rounded-xl border border-[rgba(var(--accent-rgb),0.2)] bg-[var(--bg)] shadow-[0_14px_30px_rgba(var(--accent-rgb),0.16)] transition-all duration-200 ${
            isDropdownOpen
              ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
          }`}
        >
          {MORE_ITEMS.map((item, idx) => {
            const isLastItem = idx === MORE_ITEMS.length - 1;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                tabIndex={isDropdownOpen ? 0 : -1}
                className={`block w-full cursor-pointer bg-transparent px-4 py-3 text-left text-sm transition-colors duration-200 hover:bg-[rgba(var(--accent-rgb),0.1)] hover:text-[var(--accent)] ${
                  isLastItem ? 'border-none' : 'border-b border-[rgba(var(--accent-rgb),0.1)]'
                } ${isActive ? 'bg-[rgba(var(--accent-rgb),0.1)] text-[var(--accent)]' : 'text-[var(--text)]'}`}
                onClick={onCloseDropdown}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {isActive ? (
                    <span className="inline-block h-1 w-1 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                  ) : null}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="h-6 w-px bg-[rgba(var(--accent-rgb),0.2)]" />

      <button
        onClick={onOpenBookingModal}
        className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[var(--accent)] px-5 py-1.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:scale-105 active:scale-95"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: '0 8px 20px rgba(var(--accent-rgb), 0.4)',
            duration: 0.3,
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: '0 0px 0px rgba(var(--accent-rgb), 0)',
            duration: 0.3,
          });
        }}
      >
        <FiCalendar
          size={18}
          className="shrink-0 transition-all duration-300 group-hover:scale-[1.15] group-hover:-rotate-20"
        />
        Book a Call
      </button>
    </div>
  );
}

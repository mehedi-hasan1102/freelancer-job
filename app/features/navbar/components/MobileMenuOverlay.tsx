'use client';

import Link from 'next/link';
import { FiChevronDown } from 'react-icons/fi';
import { type RefObject } from 'react';
import {
  MOBILE_MAIN_ITEM_CLASS,
  MOBILE_MAIN_LABEL_CLASS,
  MOBILE_MAIN_NUMBER_CLASS,
  MORE_ITEMS,
  NAV_LINKS,
  SOCIAL_ITEMS,
} from '../constants';

type MobileMenuOverlayProps = {
  pathname: string;
  isOpen: boolean;
  isMobileMoreOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onToggleMore: () => void;
};

export default function MobileMenuOverlay({
  pathname,
  isOpen,
  isMobileMoreOpen,
  menuRef,
  onClose,
  onToggleMore,
}: MobileMenuOverlayProps) {
  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-30 m-4 mt-16 rounded-2xl bg-[var(--accent)] [font-family:'Staatliches',serif] transition-opacity duration-300 lg:hidden ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={(event) => {
        if (event.target === menuRef.current) {
          onClose();
        }
      }}
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-12 pt-6" onClick={(e) => e.stopPropagation()}>
        <div className="mt-8 min-h-0 flex-1 space-y-3 overflow-y-auto pb-6 sm:mt-12">
          {NAV_LINKS.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={MOBILE_MAIN_ITEM_CLASS}
                data-menu-link
                onClick={onClose}
              >
                <span className={MOBILE_MAIN_NUMBER_CLASS}>{String(idx + 1).padStart(2, '0')}</span>
                <span className={MOBILE_MAIN_LABEL_CLASS}>
                  {link.label}
                  {isActive ? (
                    <span className="inline-block h-2 w-2 rounded-full bg-[var(--bg)] shadow-[0_0_12px_var(--bg)]" />
                  ) : null}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={onToggleMore}
            className={`${MOBILE_MAIN_ITEM_CLASS} border-none bg-transparent text-left`}
            data-menu-link
          >
            <span className={MOBILE_MAIN_NUMBER_CLASS}>{String(NAV_LINKS.length + 1).padStart(2, '0')}</span>
            <span className={MOBILE_MAIN_LABEL_CLASS}>
              More
              <span
                aria-hidden
                className={`inline-block transition-transform duration-300 ${
                  isMobileMoreOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <FiChevronDown size={20} />
              </span>
            </span>
          </button>

          {isMobileMoreOpen ? (
            <div className="space-y-1 pl-20">
              {MORE_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block cursor-pointer text-lg font-bold text-[var(--bg)] transition-transform origin-left hover:scale-105"
                    data-menu-link
                    onClick={onClose}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {isActive ? (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--bg)] shadow-[0_0_10px_var(--bg)]" />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex gap-8">
          {SOCIAL_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--bg)] transition-transform hover:scale-110"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type UseNavbarControllerArgs = {
  pathname: string;
};

export const useNavbarController = ({ pathname }: UseNavbarControllerArgs) => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownLocked, setIsDropdownLocked] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const clearDropdownCloseTimeout = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!navRef.current) {
      return;
    }

    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
    });
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) {
      return;
    }

    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      const links = mobileMenuRef.current.querySelectorAll('[data-menu-link]');
      gsap.killTweensOf(links);
      gsap.set(links, { opacity: 1, y: 0 });
      gsap.from(links, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.1,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearDropdownCloseTimeout();
    };
  }, []);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        clearDropdownCloseTimeout();
        setIsDropdownOpen(false);
        setIsDropdownLocked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearDropdownCloseTimeout();
        setIsDropdownOpen(false);
        setIsDropdownLocked(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen]);

  const handleLinkHover = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, { y: -4, duration: 0.3, ease: 'power2.out' });
  };

  const handleLinkHoverEnd = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, { y: 0, duration: 0.3, ease: 'power2.out' });
  };

  const scrollToTop = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDropdown = () => {
    clearDropdownCloseTimeout();
    setIsDropdownOpen(true);
  };

  const closeDropdownWithDelay = () => {
    if (isDropdownLocked) {
      return;
    }

    clearDropdownCloseTimeout();
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      dropdownTimeoutRef.current = null;
    }, 180);
  };

  const toggleDropdownLock = () => {
    clearDropdownCloseTimeout();
    setIsDropdownLocked((prev) => {
      const nextLocked = !prev;
      setIsDropdownOpen(nextLocked);
      return nextLocked;
    });
  };

  const closeDropdown = () => {
    clearDropdownCloseTimeout();
    setIsDropdownOpen(false);
    setIsDropdownLocked(false);
  };

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setIsMobileMoreOpen(false);
  };

  return {
    navRef,
    mobileMenuRef,
    dropdownRef,
    isOpen,
    isDropdownOpen,
    isMobileMoreOpen,
    isBookingModalOpen,
    setIsMobileMoreOpen,
    setIsBookingModalOpen,
    openDropdown,
    closeDropdownWithDelay,
    toggleDropdownLock,
    closeDropdown,
    toggleMobileMenu,
    closeMobileMenu,
    handleLinkHover,
    handleLinkHoverEnd,
    scrollToTop,
  };
};

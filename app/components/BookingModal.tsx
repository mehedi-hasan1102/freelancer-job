'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiCalendar, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

/* ------------------ ENV ------------------ */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/8801747874773';
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mehedi-hasan1102/30min';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Show modal with animation
      gsap.to(modalRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Animate form
      const form = formRef.current;
      if (form) {
        gsap.from(form, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.1,
        });
      }

      document.body.style.overflow = 'hidden';
    } else {
      // Hide modal with animation
      gsap.to(modalRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.inOut',
      });

      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (!formRef.current) return;

      // Send email using EmailJS
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID);

      // Success
      setSubmitStatus('success');
      setFormData({ email: '', message: '' });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Email send error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] p-4 opacity-0 [backdrop-filter:blur(4px)] pointer-events-none transition-opacity duration-300 [transition-timing-function:ease] max-[480px]:px-2 max-[480px]:py-4"
      onClick={(e) => {
        if (e.target === modalRef.current) {
          onClose();
        }
      }}
    >
      <form
        ref={formRef}
        className="relative w-full max-w-[500px] rounded-[12px] border border-[rgba(6,182,212,0.2)] bg-[var(--bg)] p-10 shadow-[0_20px_60px_rgba(6,182,212,0.15)] [animation:bookingModalSlideIn_0.4s_ease-out] max-[600px]:rounded-[10px] max-[600px]:px-6 max-[600px]:py-8 max-[480px]:rounded-[8px] max-[480px]:px-5 max-[480px]:py-7"
        onSubmit={handleSubmit}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex cursor-pointer items-center justify-center border-none bg-transparent p-2 text-[var(--text-secondary)] transition-all duration-300 [transition-timing-function:ease] hover:rotate-90 hover:scale-110 hover:text-[var(--accent)] max-[480px]:right-4 max-[480px]:top-4"
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>

        {/* Heading */}
        <h2 className="mb-2 font-['Staatliches',serif] text-[2rem] font-normal leading-none tracking-[0.05em] text-[var(--text)] max-[600px]:mb-1.5 max-[600px]:text-[1.75rem] max-[480px]:mb-1 max-[480px]:text-[1.5rem]">
          Book a Project Call
        </h2>
        <p className="mb-8 font-['Inter',monospace] text-[0.875rem] tracking-[0.02em] text-[var(--text-secondary)] max-[600px]:mb-6 max-[600px]:text-[0.8rem] max-[480px]:mb-5 max-[480px]:text-[0.75rem]">
          Share your goals. I help with landing pages, React/Next.js builds, and performance fixes.
        </p>

        {/* Quick Actions */}
        <div className="mb-5 grid grid-cols-2 gap-3 max-[480px]:grid-cols-1">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-[8px] border border-[rgba(37,211,102,0.35)] bg-[rgba(37,211,102,0.1)] px-4 py-3 font-['Inter',monospace] text-[0.85rem] font-medium tracking-[0.02em] text-[#25D366] transition-all duration-300 [transition-timing-function:ease] hover:-translate-y-0.5 hover:bg-[rgba(37,211,102,0.2)]"
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-[8px] border border-[rgba(6,182,212,0.35)] bg-[rgba(6,182,212,0.1)] px-4 py-3 font-['Inter',monospace] text-[0.85rem] font-medium tracking-[0.02em] text-[var(--accent)] transition-all duration-300 [transition-timing-function:ease] hover:-translate-y-0.5 hover:bg-[rgba(6,182,212,0.2)]"
          >
            <FiCalendar size={16} />
            <span>Book 20-min Call</span>
          </a>
        </div>

        <div className="mb-6 flex items-center gap-3 max-[600px]:mb-5 max-[480px]:mb-4">
          <span className="h-px flex-1 bg-[rgba(6,182,212,0.2)]" />
          <span className="font-['Inter',monospace] text-[0.72rem] tracking-[0.12em] text-[var(--text-secondary)]">
            OR SEND PROJECT BRIEF
          </span>
          <span className="h-px flex-1 bg-[rgba(6,182,212,0.2)]" />
        </div>

        {/* Form Fields */}
        <div className="mb-6 max-[600px]:mb-5 max-[480px]:mb-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full rounded-[8px] border border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.05)] px-4 py-3.5 font-['Inter',monospace] text-[0.95rem] tracking-[0.02em] text-[var(--text)] outline-none transition-all duration-300 [transition-timing-function:ease] placeholder:text-[var(--text-secondary)] placeholder:opacity-60 focus:border-[var(--accent)] focus:bg-[rgba(6,182,212,0.08)] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.1)] max-[600px]:px-[0.875rem] max-[600px]:py-3 max-[600px]:text-[0.9rem] max-[480px]:px-3 max-[480px]:py-2.5 max-[480px]:text-[0.85rem]"
          />
        </div>

        <div className="mb-6 max-[600px]:mb-5 max-[480px]:mb-4">
          <textarea
            name="message"
            placeholder="Tell me what you need (e.g. landing page audit, Next.js fixes, UI refactor)..."
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="min-h-[120px] w-full resize-y rounded-[8px] border border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.05)] px-4 py-3.5 font-['Inter',monospace] text-[0.95rem] tracking-[0.02em] text-[var(--text)] outline-none transition-all duration-300 [transition-timing-function:ease] placeholder:text-[var(--text-secondary)] placeholder:opacity-60 focus:border-[var(--accent)] focus:bg-[rgba(6,182,212,0.08)] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.1)] max-[600px]:px-[0.875rem] max-[600px]:py-3 max-[600px]:text-[0.9rem] max-[480px]:min-h-[100px] max-[480px]:px-3 max-[480px]:py-2.5 max-[480px]:text-[0.85rem]"
          />
        </div>

        <input type="hidden" name="time" value={new Date().toLocaleString()} />

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 rounded-[8px] border border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.1)] p-4 text-center font-['Inter',monospace] text-[0.9rem] text-[#22c55e] [animation:bookingModalSlideDown_0.3s_ease-out]">
            ✓ Brief sent successfully! I&apos;ll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 rounded-[8px] border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.1)] p-4 text-center font-['Inter',monospace] text-[0.9rem] text-[#ef4444] [animation:bookingModalSlideDown_0.3s_ease-out]">
            ✗ Something went wrong. Please try again.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full overflow-hidden rounded-[8px] border-2 border-[var(--accent)] bg-[var(--accent)] p-4 font-['Staatliches',serif] text-[1rem] font-normal tracking-[0.1em] text-[var(--bg)] transition-all duration-300 [transition-timing-function:ease] before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-[rgba(255,255,255,0.1)] before:transition-[left] before:duration-500 before:[transition-timing-function:ease] before:content-[''] hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_8px_20px_rgba(6,182,212,0.4)] hover:not-disabled:before:left-full disabled:cursor-not-allowed disabled:opacity-70 active:not-disabled:translate-y-0 max-[600px]:p-3.5 max-[600px]:text-[0.95rem] max-[480px]:p-3 max-[480px]:text-[0.9rem]"
        >
          {isSubmitting ? 'Sending...' : 'Send Project Brief'}
        </button>
      </form>
    </div>
  );
}

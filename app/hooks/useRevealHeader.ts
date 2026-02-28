"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useRevealHeader = (headerRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    gsap.set(header.children, { y: 80, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: "top 80%",
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [headerRef]);
};

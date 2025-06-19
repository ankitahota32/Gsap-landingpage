"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import LoginPage from "@/components/auth/login";

export default function Home() {
  const manRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(manRef.current, {
      scale: 0.8,
      duration: 2,
      ease: "power2.out",
    });

    tl.to(
      logoRef.current,
      {
        scale: 1.2,
        color: "#FF0000",
        duration: 2,
        ease: "power2.out",
      },
      "<"
    );
  }, []);

  return (
    <main>
      <LoginPage />
    </main>
  );
}

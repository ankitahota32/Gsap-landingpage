"use client"; // This tells Next.js that this is a client componenent, not a server component

import { useEffect, useRef } from "react"; //useEffect to run animations after the component is mounted. useRef points to DOM nodes so we can animate them
import gsap from "gsap"; // used for animation
import { ScrollTrigger } from "gsap/ScrollTrigger"; // scroll trigger plugin
import Image from "next/image"; // image
import { User } from "lucide-react"; //icon 
import Link from "next/link";

export default function LandingPage() {
  const manRef = useRef(null); //model img
  const logoRef = useRef(null); //logo text 
  const containerRef = useRef(null); //fullscreen scroll container
  const navRef = useRef(null); // nav bar
  const labTextRef = useRef(null); //lab tex
  const numberRef = useRef(null); // number (100)
  const redBoxRef = useRef(null); // red box with img
  const initialTimelineRef = useRef<gsap.core.Timeline | null>(null); //to store the initial timeline

  const playInitialAnimation = () => { // this function triggers the intro animation when the page first page loads
    if (initialTimelineRef.current) {
      initialTimelineRef.current.kill();
    } // Prevents overlapping animations by destroying the precious one if it exists

    // Here we set initial states
    gsap.set(manRef.current, { scale: 1.2 });
    gsap.set(logoRef.current, { scale: 0.8, color: "#000000" });

    gsap.set(navRef.current, { y: -100, opacity: 0 });
    gsap.set(labTextRef.current, { x: -200, opacity: 0 });
    gsap.set(numberRef.current, { y: 100, opacity: 0 });
    gsap.set(redBoxRef.current, { x: "100vw", opacity: 0 });

    const tl = gsap.timeline(); //timeline sequence. GSAP timeline lets you chain animations with precise control over their sequencing

    tl.fromTo( //gsap method that creates an animation from starting value to an ending value and adds it to the timeline. 
      manRef.current,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 2,
        ease: "power2.out", // the animation will start faster and then slow down 
      }
    );

    tl.fromTo(
      logoRef.current,
      { scale: 0.8 },
      {
        scale: window.innerWidth < 768 ? 1.5 : 2,
        color: "#a10000",
        duration: 3,
        ease: "power2.out",
      },
      "<" // this means start at the same time as previous animation
    );

    initialTimelineRef.current = tl;
    return tl;
  };

  useEffect(() => { // runs when the component is mounted 

    window.scrollTo(0, 0); // ensures that the user always starts at the top of the page 

    gsap.registerPlugin(ScrollTrigger); //registering gsap plugin. it must be registered before use. 

    playInitialAnimation();

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    const initialLogoScale = isMobile ? 1.5 : 2;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, //animation trigger
        start: "top top",
        end: "+=100%",
        scrub: 1, //syncs scroll position with animation progress 
        pin: true, // pins the container in place during scroll
        onEnterBack: () => { // replays initial animation when scrolling back up 
          playInitialAnimation();
        },
      },
    });

    scrollTl.fromTo( // logo animation
      logoRef.current,
      {
        scale: initialLogoScale,
        color: "#a10000",
      },
      {
        scale: isMobile ? 3 : isTablet ? 3.5 : 4,
        color: "#e5e5e5",
        transformOrigin: "center center",
        duration: 1,
        ease: "none",
      }
    );

    scrollTl.to( // model moves to bottom-right
      manRef.current,
      {
        x: isMobile ? "20vw" : isTablet ? "30vw" : "35vw",
        y: isMobile ? "15vh" : "20vh",
        duration: 1,
        ease: "none",
      },
      0
    );

    scrollTl.to( // nav bar appears
      navRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "none",
      },
      0.2
    );

    scrollTl.to( //red box slides in
      redBoxRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "none",
      },
      0.3
    );

    scrollTl.to( //lab text animation
      labTextRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "none",
      },
      0.4
    );

    scrollTl.to( //100 number animation
      numberRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "none",
      },
      0.5
    );

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => { //cleanup on unmount
      if (initialTimelineRef.current) {
        initialTimelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-[200vh]">
      <div
        ref={containerRef}
        className="relative h-screen w-screen bg-white overflow-hidden flex items-center justify-center"
      >
        <nav
          ref={navRef}
          className="absolute top-0 left-0 right-0 z-30 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-6 gap-4 sm:gap-0"
          style={{ transform: "translateY(-100)", opacity: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="text-lg sm:text-xl font-bold text-black">
              PRODUCTS
            </div>
          </div>
          <div className="flex space-x-4 sm:space-x-8">
            <a
              href="/shop"
              className="text-sm sm:text-base text-black hover:text-gray-600 transition-colors"
            >
              SHOP
            </a>
            <a
              href="/new-arrivals"
              className="text-sm sm:text-base text-black hover:text-gray-600 transition-colors"
            >
              NEW ARRIVALS
            </a>
            <Link
              href="/profile"
              className="hover:bg-gray-100 rounded-md transition-colors"
            >
              <User className="w-5 h-5 text-black" />
            </Link>
          </div>
        </nav>

        <h1
          ref={logoRef}
          className="absolute text-[15vw] sm:text-[12vw] lg:text-[10vw] font-extrabold tracking-tight text-black z-0"
          style={{ transform: "scale(0.8)", color: "#000000" }}
        >
          X-LABS
        </h1>

        <div
          ref={redBoxRef}
          className="absolute w-[60vw] sm:w-[55vw] lg:w-[50vw] h-[30vh] sm:h-[35vh] lg:h-[40vh] bg-red-600 z-5"
          style={{
            right: "2vw",
            top: "60vh",
            transform: "translateX(100vw)",
            opacity: 0,
          }}
        >
          <div className="flex h-full px-4 py-2">
            <Image
              src="/pngfind.com-magazine-png-895190.png"
              alt="text img"
              className="h-[100%] w-auto object-contain"
              width={300}
              height={400}
            />
          </div>
        </div>

        <div
          ref={labTextRef}
          className="absolute left-[4vw] sm:left-[6vw] lg:left-[8vw] top-[30vh] sm:top-[32vh] lg:top-[35vh] z-20"
          style={{ transform: "translateX(-200px)", opacity: 0 }}
        >
          <h2 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-black text-stone-800 leading-none">
            lab.
          </h2>
        </div>

        <div
          ref={numberRef}
          className="absolute left-[4vw] sm:left-[6vw] lg:left-[8vw] bottom-[10vh] sm:bottom-[12vh] lg:bottom-[15vh] z-20"
          style={{ transform: "translateY(100px)", opacity: 0 }}
        >
          <span className="text-[6vw] sm:text-[5vw] lg:text-[4vw] font-black text-stone-600 transform -rotate-90 inline-block origin-center">
            100
          </span>
        </div>

        <div className="relative z-10 w-auto h-[60vh] sm:h-[70vh] lg:h-[80vh]">
          <Image
            ref={manRef}
            src="/—Pngtree—watercolor fashion female model_6523838.png"
            alt="Fashion model"
            className="w-auto h-full object-contain"
            width={700}
            height={900}
            priority
            style={{ transform: "scale(1.2)" }}
          />
        </div>
      </div>
    </div>
  );
}

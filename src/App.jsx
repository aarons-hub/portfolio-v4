import "./App.css";
import { useState, useRef, useLayoutEffect } from "react";
import { About } from "./components/About";
import Resume from "./components/Resume";
import { References } from "./components/References";
import { Skills } from "./components/Skills";
import { Ticker } from "./components/Ticker";
import Portfolio from "./components/Portfolio";
import { Contact } from "./components/Contact";
import { UpArrow } from "./components/UpArrow";
import { PinnedGraphic } from "./components/PinnedGraphic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef();
  const pinnedRef = useRef();
  const pinnedInnerRef = useRef();

  // useGSAP(
  //   () => {
  //     const pinnedTimeout = setTimeout(() => {
  //       const sections = [
  //         {
  //           id: "#about",
  //           x: 800,
  //           y: 0,
  //           start: "top top",
  //           end: "center center",
  //         },
  //         {
  //           id: "#resume",
  //           x: 1800,
  //           y: 0,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#references",
  //           x: 1200,
  //           y: 200,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#skills",
  //           x: 1600,
  //           y: -100,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#portfolio",
  //           x: 2000,
  //           y: 300,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#contact",
  //           x: 2400,
  //           y: 0,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //       ];

  //       sections.forEach((section) => {
  //         const tl = gsap.timeline();
  //         tl.to(pinnedRef.current, {
  //           x: section.x,
  //           y: section.y,
  //         });

  //         ScrollTrigger.create({
  //           animation: tl,
  //           trigger: section.id,
  //           start: section.start,
  //           end: section.end,
  //           scrub: true,
  //           markers: true,
  //           id: `PIN-${section.id}`,
  //           pin: pinnedInnerRef.current,
  //           pinSpacing: false,
  //         });
  //       });
  //     }, 1000);

  //     return () => clearTimeout(pinnedTimeout);
  //   },
  //   { scope: containerRef }
  // );

  // useGSAP(
  //   () => {
  //     const pinnedTimeout = setTimeout(() => {
  //       const sections = [
  //         { id: "#about", x: 800, y: 0 },
  //         { id: "#resume", x: 1800, y: 0 },
  //         { id: "#references", x: 1200, y: 200 },
  //         { id: "#skills", x: 1600, y: -100 },
  //         { id: "#portfolio", x: 2000, y: 300 },
  //         { id: "#contact", x: 2400, y: 0 },
  //       ];

  //       // Create timeline
  //       const tl = gsap.timeline();

  //       // Build sequence
  //       sections.forEach((section) => {
  //         tl.to(pinnedRef.current, {
  //           x: section.x,
  //           y: section.y,
  //           ease: "none",
  //         });
  //       });

  //       ScrollTrigger.create({
  //         animation: tl,
  //         trigger: containerRef.current,
  //         start: "top center",
  //         end: "+=6000",
  //         scrub: true,
  //         pin: pinnedInnerRef.current,
  //         anticipatePin: 1,
  //         markers: true,
  //         id: "PIN-MULTI",
  //       });

  //       console.log("Timeline children:", tl.getChildren());
  //       console.log("ScrollTriggers:", ScrollTrigger.getAll());
  //       console.log("Pinned element:", pinnedInnerRef.current);
  //       console.log("Animated element:", pinnedRef.current);
  //     }, 2000);

  //     return () => clearTimeout(pinnedTimeout);
  //   },
  //   { scope: containerRef }
  // );

  useGSAP(
    () => {
      const pinnedTimeout = setTimeout(() => {
        ///////////////////
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: "#about",
            start: "top top",
            end: "bottom center",
            scrub: true,
            markers: true,
            id: "#about",
            // pin: pinnedInnerRef.current,
            // pinSpacing: false,
          },
        });
        tl1.to(pinnedInnerRef.current, { x: 100, y: 1000 });
        ///////////////////
        const tl2x = gsap.timeline({
          scrollTrigger: {
            trigger: "#ticker",
            start: "top center",
            end: "bottom center",
            scrub: true,
            markers: false,
            id: "#ticker",
            pin: pinnedInnerRef.current,
            pinSpacing: false,
          },
        });
        tl2.to(pinnedInnerRef.current, { x: -100, y: 0 });
      }, 1000);

      return () => clearTimeout(pinnedTimeout);
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="main-inner">
      <div className="section-container">
        {/* <div className="pinned-wrapper">
          <div className="pinned-inner" ref={pinnedInnerRef}>
            <PinnedGraphic ref={pinnedRef} />
          </div>
        </div> */}
        <section id="about">
          <About />
        </section>
        <section id="ticker">
          <Ticker />
        </section>
        <section id="resume">
          <Resume />
        </section>
        <section id="references">
          <References />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <UpArrow />
      </div>
    </div>
  );
}

export default App;

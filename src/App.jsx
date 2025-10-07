import "./App.css";
import { useState, useRef } from "react";
import { About } from "./components/About";
import Resume from "./components/Resume";
import { References } from "./components/References";
import { Skills } from "./components/Skills";
import { Ticker } from "./components/Ticker";
import Portfolio from "./components/Portfolio";
import { Contact } from "./components/Contact";
import { UpArrow } from "./components/UpArrow";
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
  //           id: "#ABOUT",
  //           x: 0,
  //           y: 0,
  //           start: "top center",
  //           end: "bottom center",
  //         },
  //         {
  //           id: "#RESUME",
  //           x: 1800,
  //           y: 0,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#REFERENCES",
  //           x: 1200,
  //           y: 200,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#SKILLS",
  //           x: 1600,
  //           y: -100,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#PORTFOLIO",
  //           x: 2000,
  //           y: 300,
  //           start: "top center",
  //           end: "bottom top",
  //         },
  //         {
  //           id: "#CONTACT",
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
  //           duration: 1,
  //           ease: "none",
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
  //         { id: "#ABOUT", x: 800, y: 0 },
  //         { id: "#RESUME", x: 1800, y: 0 },
  //         { id: "#REFERENCES", x: 1200, y: 200 },
  //         { id: "#SKILLS", x: 1600, y: -100 },
  //         { id: "#PORTFOLIO", x: 2000, y: 300 },
  //         { id: "#CONTACT", x: 2400, y: 0 },
  //       ];
  //       const tl = gsap.timeline();
  //       sections.forEach((section) => {
  //         tl.to(pinnedRef.current, {
  //           x: section.x,
  //           y: section.y,
  //           duration: 1,
  //           ease: "none",
  //         });
  //       });
  //       ScrollTrigger.create({
  //         animation: tl,
  //         trigger: sections[0].id,
  //         start: "top top",
  //         endTrigger: sections[sections.length - 1].id,
  //         end: "bottom center",
  //         scrub: true,
  //         markers: true,
  //         id: "PIN-MULTI",
  //         pin: pinnedInnerRef.current,
  //         pinSpacing: false,
  //       });
  //     }, 2000);
  //     return () => clearTimeout(pinnedTimeout);
  //   },
  //   { scope: containerRef }
  // );

  return (
    <div ref={containerRef} className="main-inner">
      <div className="section-container">
        {/* <div className="pinned-wrapper" ref={pinnedInnerRef}>
          <div className="pinned-inner">
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

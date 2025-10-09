import React, { useRef } from "react";
import { DownloadBtn } from "./DownloadBtn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./Nav";
import { AboutGraphic } from "./AboutGraphic";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const introRef = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animate letters on load
      tl.from(".letter-a", {
        yPercent: 100,
        autoAlpha: 0,
        ease: "power4.out",
        duration: 1.2,
      }).from(".letter-s", {
        yPercent: 100,
        autoAlpha: 0,
        ease: "power4.out",
        duration: 1.2,
      });

      // Staggered intro text animation
      tl.from(
        ".animate",
        {
          y: 20,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.6"
      );

      // Delay the ScrollTrigger setup slightly after the timeline finishes
      const timeout = setTimeout(() => {
        gsap.to(".letter-a", {
          xPercent: -100,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-container",
            start: "10 top",
            end: "+=700",
            scrub: true,
            markers: false,
            id: "letter-a",
          },
        });
        gsap.to(".letter-s", {
          xPercent: 100,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".section-container",
            start: "10 top",
            end: "+=700",
            scrub: true,
            markers: false,
            id: "letter-s",
          },
        });
      }, tl.duration() * 1000 + 500); // run 0.5s after the timeline completes

      return () => clearTimeout(timeout);
    },
    { scope: introRef }
  );

  return (
    <div
      className="d-flex position-relative align-items-center about container custom"
      ref={introRef}
    >
      <Nav />
      <AboutGraphic />
      <div className="intro-container">
        <div className="intro">
          <div className="intro-inner">
            <h1>
              <div className="animate">Digital specialist with 15+ years</div>
              <div className="animate">experience in government and</div>
              <div className="animate">education, blending design,</div>
              <div className="animate">front-end dev and publishing.</div>
            </h1>
          </div>
          <div className="download-btn-container">
            <DownloadBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

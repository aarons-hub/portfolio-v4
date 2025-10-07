import React, { useRef } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const UpArrow = () => {
  const arrowRef = useRef();

  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        const sections = [
          "#resume",
          "#references",
          "#skills",
          "#portfolio",
          "#contact",
        ];

        sections.forEach((id) => {
          ScrollTrigger.create({
            trigger: id,
            start: "top center",
            end: "bottom bottom",
            onEnter: () =>
              gsap.to(arrowRef.current, {
                autoAlpha: 1,
                y: 0,
                overwrite: "auto",
              }),
            onLeave: () =>
              gsap.to(arrowRef.current, {
                autoAlpha: 0,
                y: 50,
                overwrite: "auto",
              }),
            onEnterBack: () =>
              gsap.to(arrowRef.current, {
                autoAlpha: 1,
                y: 0,
                overwrite: "auto",
              }),
            onLeaveBack: () =>
              gsap.to(arrowRef.current, {
                autoAlpha: 0,
                y: 50,
                overwrite: "auto",
              }),
          });
        });
      }, 1000); // delay of 1 second

      return () => clearTimeout(timeout); // cleanup
    },
    { scope: arrowRef }
  );

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <button
      ref={arrowRef}
      onClick={scrollToTop}
      className="btn btn-outline-primary rounded-pill custom-up-arrow"
      style={{ opacity: 0, transform: "translateY(50px)" }}
    >
      UP
    </button>
  );
};

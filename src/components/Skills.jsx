import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillsGraphic } from "./SkillsGraphic";

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const SKILLS_URI = `${import.meta.env.BASE_URL}skills.json`;
  const [skillsdata, setSkillsdata] = useState([]);
  const skillsRef = useRef();

  useEffect(() => {
    fetch(SKILLS_URI)
      .then((res) => res.json())
      .then((skillsdata) => {
        const processed = skillsdata.map((item) => ({
          ...item,
          image: `${import.meta.env.BASE_URL}${item.image.replace(/^\/+/, "")}`,
        }));
        setSkillsdata(processed);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  /////////////////////////get svg height////////////////////////////////
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const setSkillsVars = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const topPadding = Math.round((rect.height * 2) / 3);
        const halfWidth = Math.round(rect.width / 2);
        const imgHeight = Math.round(rect.height);

        const selection = document.querySelector(".skills");
        if (selection) {
          selection.style.setProperty(
            "--skills-top-padding",
            `${topPadding}px`
          );
          selection.style.setProperty("--skills-half-width", `${halfWidth}px`);
          selection.style.setProperty("--skills-height", `${imgHeight}px`);
        }
      }
    };

    setSkillsVars();
    window.addEventListener("resize", setSkillsVars);
    return () => window.removeEventListener("resize", setSkillsVars);
  }, []);

  /////////////////////// Hover animation /////////////////////////////
  useGSAP(
    () => {
      const items = gsap.utils.toArray(
        ".skills-items-inner",
        skillsRef.current
      );

      items.forEach((item) => {
        const skillImageDiv = item.querySelector(".skill-image img");
        const skillTitleHover = item.querySelector(".skill-title-hover");
        const skillTitle = item.querySelector(".skill-title");

        const tlIn = gsap.timeline({ paused: true });
        tlIn
          .fromTo(
            skillImageDiv,
            {
              scale: 0.5,
              autoAlpha: 0,
              rotationY: 360,
              transformOrigin: "center center",
            },
            {
              scale: 1,
              autoAlpha: 1,
              rotationY: 180,
              duration: 0.5,
              ease: "bounce.out",
            }
          )
          .fromTo(
            skillTitleHover,
            { autoAlpha: 0, y: "25px" },
            { autoAlpha: 1, y: "-25px", duration: 0.4, ease: "power1.inOut" },
            "<"
          )
          .fromTo(
            skillTitle,
            { autoAlpha: 1, y: "0rem" },
            { autoAlpha: 0, y: "-25px", duration: 0.4, ease: "power1.inOut" },
            "<0.1"
          );

        const tlOut = gsap.timeline({ paused: true });
        tlOut
          .to(skillImageDiv, {
            scale: 0.5,
            autoAlpha: 0,
            rotationY: 360,
            duration: 0.4,
            ease: "power1.inOut",
          })
          .to(
            skillTitleHover,
            { autoAlpha: 0, y: "0rem", duration: 0.3, ease: "power1.inOut" },
            "<"
          )
          .to(
            skillTitle,
            { autoAlpha: 1, y: "0rem", duration: 0.3, ease: "power1.inOut" },
            "<0.05"
          );

        const handleEnter = () => {
          if (tlOut.isActive()) tlOut.kill();
          tlIn.restart();
        };
        const handleLeave = () => {
          if (tlIn.isActive()) tlIn.kill();
          tlOut.restart();
        };

        item.addEventListener("mouseenter", handleEnter);
        item.addEventListener("mouseleave", handleLeave);

        return () => {
          item.removeEventListener("mouseenter", handleEnter);
          item.removeEventListener("mouseleave", handleLeave);
        };
      });
    },
    { scope: skillsRef, dependencies: [skillsdata] }
  );

  /////////////////////// Description accordion animation ///////////////////////
  useGSAP(
    () => {
      const containers = gsap.utils.toArray(
        ".skills-items-inner",
        skillsRef.current
      );

      containers.forEach((container) => {
        const arrow = container.querySelector(".skills-arrow");
        const inner = container.querySelector(".skills-items-inner-inner");
        const description = container.querySelector(".skills-description");

        if (!arrow || !inner || !description) return;

        gsap.set(description, { height: 0, autoAlpha: 1 });
        gsap.set(arrow, { rotate: 0, transformOrigin: "center center" });

        let isOpen = false;
        const open = () => {
          description.classList.remove("custom-visually-hidden");
          gsap.to(description, {
            height: "auto",
            duration: 0.5,
            ease: "bounce.out",
          });
          gsap.to(arrow, { rotate: 45, duration: 0.5, ease: "power4.inOut" });
          isOpen = true;
        };
        const close = () => {
          gsap.to(description, {
            height: 0,
            duration: 0.5,
            ease: "power4.in",
            onComplete: () =>
              description.classList.add("custom-visually-hidden"),
          });
          gsap.to(arrow, { rotate: 0, duration: 0.5, ease: "power4.inOut" });
          isOpen = false;
        };
        const toggle = () => (isOpen ? close() : open());

        inner.addEventListener("click", toggle);
      });

      return () => {
        containers.forEach((container) => {
          const newContainer = container.cloneNode(true);
          container.replaceWith(newContainer);
        });
      };
    },
    { scope: skillsRef, dependencies: [skillsdata] }
  );

  /////////////////////////scroll trigger////////////////////////////////
  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#skills",
            start: "top center",
            end: "+=500",
            scrub: true,
            markers: false,
            id: "SKILLS",
            toggleClass: "skills-active",
          },
        });

        tl.fromTo("#skills .letter-s1", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#skills .letter-k", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#skills .letter-i", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#skills .letter-l1", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#skills .letter-l2", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#skills .letter-s2", { autoAlpha: 0 }, { autoAlpha: 1 });
      }, 1000);

      return () => clearTimeout(timeout);
    },
    { scope: skillsRef }
  );
  /////////////////////////end scroll trigger////////////////////////////

  return (
    <div ref={skillsRef} className="skills container custom">
      <div className="rounded-pill section-number">04</div>

      <div className="brutal-wrapper">
        <SkillsGraphic ref={svgRef} />
      </div>

      <div className="custom-heading">
        <h1 className="custom display-1">Skills</h1>
      </div>

      <div className="skills-items">
        {skillsdata.map((item) => (
          <div
            className="row py-2 skills-items-inner"
            id={`skill-${item.id}`}
            key={item.id}
          >
            <div className="col skill-image">
              <img
                className="rounded mx-auto d-block img-fluid"
                src={item.image}
              />
            </div>
            <div className="row p-3 m-0 skills-items-inner-inner">
              <div className="col-1 skills-number">
                <h5>0{item.id}</h5>
              </div>
              <div className="col-9 skill-item">
                <div className="row justify-content-between m-0 mb-2 align-items-center">
                  <div className="col skill-title-wrapper">
                    <h5 className="col skill-title">{item.title}</h5>
                    <h5 className="col skill-title-hover">{item.title}</h5>
                  </div>
                  <div className="col-auto">{item.percentage}</div>
                </div>
                <div
                  className="progress rounded-pill border"
                  role="progressbar"
                  aria-valuenow={item.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar rounded-pill"
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
              <div className="col-2 d-flex arrow-wrapper">
                <div className="skills-arrow">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 7.5H16V8.5H8.5V16H7.5V8.5H0V7.5H7.5V0H8.5V7.5Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="row skills-description">
              <div className="row skills-description-inner">
                <div className="col spacer"></div>
                <div className="col-10 skills-description-text">
                  <p>{item.description}</p>
                </div>
                <div className="col spacer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

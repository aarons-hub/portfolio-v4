import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ResumeGraphic } from "./ResumeGraphic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  // const API_URI = "/resume.json";
  const API_URI = `${import.meta.env.BASE_URL}resume.json`;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URI)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  /////////////////////////get svg height////////////////////////////////

  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const setResumeVars = () => {
      if (svgRef.current) {
        // Get the actual rendered size of the SVG
        const rect = svgRef.current.getBoundingClientRect();
        const topPadding = Math.round(rect.height / 3);
        const halfWidth = Math.round(rect.width / 2);
        const imgHeight = Math.round(rect.height);

        // console.log("Resume image height:", imgHeight);
        // console.log("Resume padding (height/3):", topPadding);
        // console.log("Resume half width (width/2):", halfWidth);

        // Apply CSS variables to the parent container
        const selection = document.querySelector(".resume");
        if (selection) {
          selection.style.setProperty(
            "--resume-top-padding",
            `${topPadding}px`
          );
          selection.style.setProperty("--resume-half-width", `${halfWidth}px`);
          selection.style.setProperty("--resume-height", `${imgHeight}px`);
        }
      }
    };

    // Run immediately after render
    setResumeVars();

    // Update on window resize
    window.addEventListener("resize", setResumeVars);
    return () => window.removeEventListener("resize", setResumeVars);
  }, []);

  /////////////////////////end svg height////////////////////////////////

  /////////////////////////scroll trigger////////////////////////////////
  const resumeRef = useRef();
  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: resumeRef.current,
            start: "-90 center",
            end: "+=600",
            scrub: true,
            markers: false,
            id: "RESUME",
          },
        });

        tl.fromTo("#resume .letter-r", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#resume .letter-e1", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#resume .letter-sa", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#resume .letter-u", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#resume .letter-m", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#resume .letter-e2", { autoAlpha: 0 }, { autoAlpha: 1 });
      }, 1000);

      return () => clearTimeout(timeout);
    },
    { scope: resumeRef }
  );

  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        const sections = ["#resume-1", "#resume-2", "#resume-3", "#resume-4"];

        sections.forEach((id) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: id,
              scrub: true,
              markers: false,
              toggleClass: "resume-active",
              start: "top center",
              end: "bottom center",
            },
          });

          // Fade in
          tl.fromTo(`${id} .highlight`, { autoAlpha: 0 }, { autoAlpha: 1 });

          // Fade back out
          tl.to(`${id} .highlight`, { autoAlpha: 0 });
        });
      }, 1000);

      return () => clearTimeout(timeout);
    },
    { scope: resumeRef, dependencies: [data] }
  );
  /////////////////////////end scroll trigger////////////////////////////

  return (
    <div className="resume container custom" ref={resumeRef}>
      <div className="rounded-pill section-number">02</div>

      <div className="brutal-wrapper">
        <ResumeGraphic ref={svgRef} />
      </div>

      <div className="custom-heading">
        <h1 className="custom display-1">Resume</h1>
      </div>

      <div className="row m-0 position-relative">
        <div className="col-7 p-0 resume-col">
          {data.map((item) => (
            <div
              className="col px-5 pb-4 position-relative custom history"
              id={`resume-${item.id}`}
              key={item.id}
            >
              <div className="highlight position-absolute"></div>
              <div className="row py-3 align-items-center">
                <div className="col-auto rounded-pill border border-1 text-center d-flex align-items-center custom-text">
                  <span className="d-flex pt-9-custom">{item.date}</span>
                </div>

                <div className="col-auto custom-subtitle">
                  {item.company.map((item, index) => (
                    <h5 className="custom" key={index}>
                      {item}
                    </h5>
                  ))}
                </div>
              </div>

              <h5 className="row p-2 custom-title">{item.title}</h5>
              <ul className="row custom-text">
                {item.content.map((item, index) => (
                  <li className="pb-2" key={index}>
                    {item}
                  </li>
                ))}
              </ul>

              {item.url && (
                <button
                  className="btn px-4 website-btn"
                  onClick={() =>
                    window.open(item.url, "_blank", "noopener,noreferrer")
                  }
                >
                  Website
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4"></div>
    </div>
  );
}

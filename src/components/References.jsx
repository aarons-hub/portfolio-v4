import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ReferencesGraphic } from "./ReferencesGraphic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const References = () => {
  const REFS_URI = `${import.meta.env.BASE_URL}references.json`;
  const [refsdata, setRefsdata] = useState([]);

  useEffect(() => {
    fetch(REFS_URI)
      .then((res) => res.json())
      .then((refsdata) => {
        // Prefix image URLs with BASE_URL for deployment-proof paths
        const processed = refsdata.map((item) => ({
          ...item,
          thumb: `${import.meta.env.BASE_URL}${item.thumb.replace(/^\/+/, "")}`,
        }));
        setRefsdata(processed);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  /////////////////////////get svg height////////////////////////////////
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const setReferencesVars = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const topPadding = Math.round(rect.height / 4);
        const halfWidth = Math.round(rect.width / 2);
        const imgHeight = Math.round(rect.height);

        const selection = document.querySelector(".references");
        if (selection) {
          selection.style.setProperty(
            "--references-top-padding",
            `${topPadding}px`
          );
          selection.style.setProperty(
            "--references-half-width",
            `${halfWidth}px`
          );
          selection.style.setProperty("--references-height", `${imgHeight}px`);
        }
      }
    };

    setReferencesVars();
    window.addEventListener("resize", setReferencesVars);
    return () => window.removeEventListener("resize", setReferencesVars);
  }, []);

  /////////////////////////scroll trigger////////////////////////////////
  const referencesRef = useRef();

  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#references",
            start: "top center",
            end: "+=500",
            scrub: true,
            markers: false,
            id: "REFERENCES",
            toggleClass: "references-active",
          },
        });

        // Optional: you can simplify or remove letter animations if spans don't exist
        tl.fromTo("#references .letter-r", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-e1", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-f", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-e2", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-r2", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-e3", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-n", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-c", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-e4", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#references .letter-sb", { autoAlpha: 0 }, { autoAlpha: 1 });
      }, 1000);

      return () => clearTimeout(timeout);
    },
    { scope: referencesRef }
  );
  /////////////////////////end scroll trigger////////////////////////////

  return (
    <div className="references container custom" ref={referencesRef}>
      <div className="rounded-pill section-number">03</div>

      <div className="brutal-wrapper">
        <ReferencesGraphic ref={svgRef} />
      </div>

      <div className="custom-heading">
        <h1 className="custom display-1">References</h1>
      </div>

      <div className="row m-0 position-relative">
        <div className="col-8 ms-auto px-5 custom-row references-col">
          {refsdata.map((item) => (
            <div className="col" id={`reference-${item.id}`} key={item.id}>
              <div className="card text">
                <div className="card-image-wrapper">
                  <div className="card-image w-25 ms-3 me-auto rounded-pill border">
                    <img
                      src={item.thumb}
                      alt={item.title || item.name}
                      className="card-img-top"
                    />
                  </div>
                </div>

                <div className="card-body">
                  <h5 className="card-name">{item.name}</h5>
                  <p className="card-dept">{item.title}</p>

                  <p className="card-text">
                    <strong>M: </strong>
                    <a href={`tel:${item.mobile}`}>{item.mobile}</a>
                  </p>

                  <p className="card-text">
                    <strong>E: </strong>
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

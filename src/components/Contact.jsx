import React from "react";
import { useRef, useState, useLayoutEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mobileIcon from "/images/mobile-icon.svg";
import mapIcon from "/images/map-icon.svg";
import emailIcon from "/images/email-icon.svg";

import { ContactGraphic } from "./ContactGraphic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const form = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_g21pr8h", "template_4m4a8ys", form.current, {
        publicKey: "WEnSV56Aows6oYiBB",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setDone(true);
          toast.success("Message sent successfully!");
          form.current.reset();

          setTimeout(() => setDone(false), 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message. Try again later.");
        }
      );
  };

  /////////////////////////get svg height////////////////////////////////

  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const setContactVars = () => {
      if (svgRef.current) {
        // Get the actual rendered size of the SVG
        const rect = svgRef.current.getBoundingClientRect();
        const topPadding = Math.round(rect.height / 3);
        const halfWidth = Math.round(rect.width / 2);
        const imgHeight = Math.round(rect.height);

        // console.log("Contact image height:", imgHeight);
        // console.log("Contact padding (height/3):", topPadding);
        // console.log("Contact half width (width/2):", halfWidth);

        // Apply CSS variables to the parent container
        const selection = document.querySelector(".contact");
        if (selection) {
          selection.style.setProperty(
            "--contact-top-padding",
            `${topPadding}px`
          );
          selection.style.setProperty("--contact-half-width", `${halfWidth}px`);
          selection.style.setProperty("--contact-height", `${imgHeight}px`);
        }
      }
    };

    // Run immediately after render
    setContactVars();

    // Update on window resize
    window.addEventListener("resize", setContactVars);
    return () => window.removeEventListener("resize", setContactVars);
  }, []);

  /////////////////////////end svg height////////////////////////////////

  /////////////////////////scroll trigger////////////////////////////////
  const contactRef = useRef();

  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#contact",
            start: "top center",
            end: "+=300",
            scrub: true,
            markers: false,
            id: "CONTACT",
            toggleClass: "contact-active",
          },
        });

        tl.fromTo("#contact .letter-c1", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#contact .letter-o", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#contact .letter-n", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#contact .letter-t1", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#contact .letter-a4", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#contact .letter-c2", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#contact .letter-t2", { autoAlpha: 0 }, { autoAlpha: 1 });
      }, 1000);

      return () => clearTimeout(timeout);
    },
    { scope: contactRef }
  );

  /////////////////////////end scroll trigger////////////////////////////

  return (
    <div className="contact container custom" ref={contactRef}>
      <div className="rounded-pill section-number">06</div>

      <div className="brutal-wrapper">
        <ContactGraphic ref={svgRef} />
      </div>

      <div className="custom-heading">
        <h1 className="custom display-1">Contact</h1>
      </div>

      <div className="position-relative contact-wrapper">
        <div className="col contact-col">
          <div className="row">
            <div className="col p-4">
              <div className="row py-3 align-items-center">
                <div className="col-auto icon">
                  <img src={mobileIcon} />
                </div>
                <div className="col ps-4 content">
                  <div>
                    <a href="tel:0424 854 390">0424 854 390</a>
                  </div>
                </div>
              </div>
              <div className="row py-3 align-items-center">
                <div className="col-auto icon">
                  <img src={emailIcon} />
                </div>
                <div className="col ps-4 content">
                  <div>
                    <a href="mailto:aaron.leigh.sanders@gmail.com">
                      aaron.leigh.sanders@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="row py-3 align-items-center">
                <div className="col-auto icon">
                  <img src={mapIcon} />
                </div>
                <div className="col ps-4 content">
                  <div>
                    <a href="https://maps.app.goo.gl/Uc2NhVB5rJJVppRw6">
                      Brisbane, Australia
                    </a>
                  </div>
                </div>
              </div>
              <div className="form-wrapper py-3">
                <form ref={form} onSubmit={sendEmail}>
                  <div className="row">
                    <div className="col d-flex flex-column">
                      <label htmlFor="inputName" className="form-label">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        className="form-control"
                        id="inputName"
                      />

                      <label htmlFor="inputEmail" className="form-label">
                        Your email
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        className="form-control"
                        id="inputEmail"
                      />

                      <label htmlFor="inputSubject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        id="inputSubject"
                      />
                    </div>
                    <div className="col d-flex flex-column">
                      <label htmlFor="inputMessage" className="form-label">
                        Your message
                      </label>
                      <textarea
                        type="text"
                        name="message"
                        className="form-control message align-self-stretch"
                        id="inputMessage"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col"></div>
                    <div className="col">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill mt-4 contact-btn px-5 py-3"
                        disabled={done}
                      >
                        {done ? "Sent" : "Send your message"}
                      </button>
                    </div>
                  </div>
                  <ToastContainer position="bottom-right" autoClose={3000} />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

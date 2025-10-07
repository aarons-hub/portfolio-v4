import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Modal from "./Modal";
import { PortfolioGraphic } from "./PortfolioGraphic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const API_URI = `${import.meta.env.BASE_URL}portfolio.json`;
  const categories = ["Web", "Photography", "Graphics", "Print", "All"];

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Web");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(API_URI)
      .then((res) => res.json())
      .then((data) => {
        // Fix all image paths for deployment
        const processed = data.map((item) => ({
          ...item,
          image: `${import.meta.env.BASE_URL}${item.image.replace(/^\/+/, "")}`,
          thumbnail: `${import.meta.env.BASE_URL}${item.thumbnail.replace(
            /^\/+/,
            ""
          )}`,
          thumbnailSmall: item.thumbnailSmall
            ? `${import.meta.env.BASE_URL}${item.thumbnailSmall.replace(
                /^\/+/,
                ""
              )}`
            : undefined,
          thumbnailMedium: item.thumbnailMedium
            ? `${import.meta.env.BASE_URL}${item.thumbnailMedium.replace(
                /^\/+/,
                ""
              )}`
            : undefined,
        }));
        setData(processed);
        setFiltered(processed);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFiltered(data);
    } else {
      setFiltered(data.filter((item) => item.category === selectedCategory));
    }
    setCurrentPage(1);
  }, [selectedCategory, data]);

  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [clickedTitle, setClickedTitle] = useState(null);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.image);
    setClickedTitle(item.title);
  };

  const handleRotationRight = () => {
    const totalLength = filtered.length;
    let newIndex = currentIndex + 1;
    if (newIndex >= totalLength) newIndex = 0;
    setCurrentIndex(newIndex);
    setClickedImg(filtered[newIndex].image);
    setClickedTitle(filtered[newIndex].title);
  };

  const handleRotationLeft = () => {
    const totalLength = filtered.length;
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = totalLength - 1;
    setCurrentIndex(newIndex);
    setClickedImg(filtered[newIndex].image);
    setClickedTitle(filtered[newIndex].title);
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered
    .slice()
    .sort((a, b) => a.sortorder - b.sortorder)
    .slice(startIndex, startIndex + itemsPerPage);

  /////////////////////////get svg height////////////////////////////////
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const setPortfolioVars = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const topPadding = Math.round(rect.height / 3);
        const halfWidth = Math.round(rect.width / 2);
        const imgHeight = Math.round(rect.height);

        const selection = document.querySelector(".portfolio");
        if (selection) {
          selection.style.setProperty(
            "--portfolio-top-padding",
            `${topPadding}px`
          );
          selection.style.setProperty(
            "--portfolio-half-width",
            `${halfWidth}px`
          );
          selection.style.setProperty("--portfolio-height", `${imgHeight}px`);
        }
      }
    };

    setPortfolioVars();
    window.addEventListener("resize", setPortfolioVars);
    return () => window.removeEventListener("resize", setPortfolioVars);
  }, []);

  /////////////////////////scroll trigger////////////////////////////////
  const portfolioRef = useRef();

  useGSAP(
    () => {
      const timeout = setTimeout(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#portfolio",
            start: "top center",
            end: "+=400",
            scrub: true,
            markers: false,
            id: "PORTFOLIO",
            toggleClass: "portfolio-active",
          },
        });

        tl.fromTo("#portfolio .letter-o1", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-f", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-i", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-o3", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-l", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-t", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-p", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-o2", { autoAlpha: 0 }, { autoAlpha: 1 })
          .fromTo("#portfolio .letter-r", { autoAlpha: 0 }, { autoAlpha: 1 });
      }, 1000);

      return () => clearTimeout(timeout);
    },
    { scope: portfolioRef }
  );
  /////////////////////////end scroll trigger////////////////////////////

  return (
    <div className="portfolio container custom" ref={portfolioRef}>
      <div className="rounded-pill section-number">05</div>

      <div className="brutal-wrapper">
        <PortfolioGraphic ref={svgRef} />
      </div>

      <div className="custom-heading">
        <h1 className="custom display-1">Portfolio</h1>
      </div>

      <div className="content p-5 portfolio-content">
        <div className="row m-0">
          <div className="col d-flex align-items-end p-0">
            <div className="content btn-group-wrapper">
              <div className="col btn-group-inner">
                <div className="btn-group gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`btn btn-primary rounded-pill py-2 px-4 custon-filter-btn ${
                        selectedCategory === cat ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio items */}
        <div className="row portfolio-items">
          {currentItems.map((item, index) => (
            <div key={item.id || item.sortorder || index} className="col">
              <div
                className={`card overflow-hidden position-relative portfolio-card sortno-${item.sortorder} id-${item.id}`}
              >
                <LazyLoadImage
                  effect="blur"
                  src={item.thumbnail}
                  alt={item.title}
                  onClick={() => handleClick(item, index)}
                  className="w-100 h-auto"
                  style={{
                    cursor: "pointer",
                    transform: `translateY(${item.objectposition})`,
                  }}
                  srcSet={
                    item.thumbnailSmall && item.thumbnailMedium
                      ? `${item.thumbnailSmall} 480w, ${item.thumbnailMedium} 800w, ${item.thumbnail} 1200w`
                      : undefined
                  }
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-end pagination-wrapper">
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Modal for full-size image */}
        {clickedImg && (
          <Modal
            clickedImg={clickedImg}
            clickedTitle={clickedTitle}
            setClickedImg={setClickedImg}
            handleRotationRight={handleRotationRight}
            handleRotationLeft={handleRotationLeft}
          />
        )}
      </div>
    </div>
  );
}

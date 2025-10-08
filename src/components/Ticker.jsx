import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

// Fetch JSON dynamically using BASE_URL
const API_URI = `${import.meta.env.BASE_URL}portfolio.json`;

export const Ticker = () => {
  const tickerRef = useRef();
  const tickerInnerRef = useRef();

  const [portfolioData, setPortfolioData] = useState([]);
  const selectedIds = [
    75, 2, 3, 26, 47, 31, 47, 48, 27, 38, 44, 50, 54, 56, 6, 13, 30, 27, 84, 85,
  ];

  useEffect(() => {
    fetch(API_URI)
      .then((res) => res.json())
      .then((data) => {
        // Filter by selected IDs
        const filtered = data.filter((item) => selectedIds.includes(item.id));

        // Prefix image URLs with BASE_URL for deployment-proof paths
        const processed = filtered.map((item) => ({
          ...item,
          image: `${import.meta.env.BASE_URL}${item.image.replace(/^\/+/, "")}`,
          thumbnail: `${import.meta.env.BASE_URL}${item.thumbnail.replace(
            /^\/+/,
            ""
          )}`,
        }));

        // Duplicate for seamless ticker
        setPortfolioData([...processed, ...processed]);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // GSAP animation
  useEffect(() => {
    if (!tickerInnerRef.current || portfolioData.length === 0) return;

    const tickerWidth = tickerInnerRef.current.scrollWidth / 2; // half because duplicated
    const duration = 25; // seconds, adjust speed

    const tween = gsap.fromTo(
      tickerInnerRef.current,
      { x: 0 },
      { x: -tickerWidth, duration, ease: "linear", repeat: -1 }
    );

    return () => tween.kill();
  }, [portfolioData]);

  return (
    <div className="container custom">
      <div
        ref={tickerRef}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          padding: "10px 0",
        }}
      >
        <div
          ref={tickerInnerRef}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          {portfolioData.map((item, index) => (
            <img
              className="ticker-images"
              key={index} // safe because of duplication
              src={item.thumbnail || item.image}
              alt={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

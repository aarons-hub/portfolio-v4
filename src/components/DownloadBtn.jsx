import React, { useState } from "react";

export const DownloadBtn = () => {
  const [animateBadge, setAnimateBadge] = useState(false);

  return (
    <div className="download-btn-wrapper">
      <a
        href="docs/aaron-resume.pdf"
        className="btn btn-outline-primary rounded-pill py-3 px-4 mt-2 position-relative download"
        onMouseEnter={() => setAnimateBadge(true)}
        onMouseLeave={() => setAnimateBadge(false)}
      >
        <span className="download-info">Download</span>
        <span className="download-text">Download Resume</span>
      </a>
      <div className={`badge ${animateBadge ? "animate" : ""}`}>
        1.5Kb pdf file
      </div>
    </div>
  );
};

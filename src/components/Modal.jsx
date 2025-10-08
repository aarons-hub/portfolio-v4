import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  clickedImg,
  clickedTitle,
  clickedUrl,
  handleRotationRight,
  handleRotationLeft,
  setClickedImg,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger fade-in when modal mounts
  useEffect(() => {
    if (clickedImg) {
      setTimeout(() => setIsVisible(true), 10); // delay to allow CSS transition
    }
  }, [clickedImg]);

  // Handle ESC / arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handleRotationLeft();
      } else if (e.key === "ArrowRight") {
        handleRotationRight();
      }
    };

    if (clickedImg) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clickedImg, handleRotationLeft, handleRotationRight]);

  if (!clickedImg) return null;

  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setClickedImg(null), 300); // match CSS transition duration
  };

  const modalContent = (
    <div
      className={`modal overlay dismiss custom ${isVisible ? "show" : ""}`}
      onClick={handleClick}
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-primary">{clickedTitle}</h5>
            <span className="modal-support">
              Use arrow keys &larr; &rarr; for next or previous. ESC to cancel.
            </span>
            <button className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <img loading="lazy" src={clickedImg} alt={clickedTitle} />
          </div>
          <div className="modal-footer">
            {clickedUrl && (
              <a
                href={clickedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary rounded-pill px-4 visit"
              >
                Visit site
              </a>
            )}
            <button
              className="btn btn-secondary rounded-pill px-4"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={handleRotationLeft}
            >
              Previous
            </button>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={handleRotationRight}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;

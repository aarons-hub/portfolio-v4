import React from "react";

export const PinnedGraphic = React.forwardRef((props, ref) => {
  return (
    <svg
      ref={ref}
      width="317"
      height="366"
      viewBox="0 0 317 366"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M317 91.7212L158 0L0 91.2213L158 182.721L317 91.7212Z"
        fill="#FDD6AA"
      />
      <path
        d="M158 365.721V182.721L317 91.7212V273.721L158 365.721Z"
        fill="#511124"
      />
      <path
        d="M159 365.721V182.721L0 91.7212V273.721L159 365.721Z"
        fill="#FF6333"
      />
    </svg>
  );
});

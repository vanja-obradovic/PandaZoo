import React from "react";

const Tick = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      aria-labelledby="okIconTitle"
      color="#000"
      className={className}
      viewBox="0 0 24 24"
    >
      <path d="m4 13 5 5L20 7" />
    </svg>
  );
};

export default Tick;

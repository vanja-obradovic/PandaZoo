import React from "react";

const Cancel = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 64 64"
    >
      <path d="m8.06 8.06 47.35 47.88M55.94 8.06 8.59 55.94" />
    </svg>
  );
};

export default Cancel;

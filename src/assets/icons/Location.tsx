import React from "react";

const Location = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <path d="M16 18a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3.003 3.003 0 0 0-3-3Z" />
      <path d="m16 30-8.436-9.949a35.076 35.076 0 0 1-.348-.451A10.889 10.889 0 0 1 5 13a11 11 0 0 1 22 0 10.884 10.884 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.812 18.395c.002 0 .234.308.287.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.901 8.901 0 0 0 25 13a9 9 0 1 0-18 0 8.905 8.905 0 0 0 1.813 5.395Z" />
      <path
        d="M0 0h32v32H0z"
        data-name="&lt;Transparent Rectangle&gt;"
        className="fill-transparent"
        transform="rotate(-90 16 16)"
      />
    </svg>
  );
};

export default Location;

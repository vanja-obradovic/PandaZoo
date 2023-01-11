import React from "react";

const Cart = ({
  color,
  classname,
  strokeColor,
  pathFill,
}: {
  color: string;
  classname: string;
  strokeColor?: string;
  pathFill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={classname}
    >
      <path
        stroke={color || "#ffffff"}
        className={strokeColor}
        stroke-linecap="round"
        d="M2.832 4.387h.511c.86 0 1.618.56 1.87 1.381l3.065 9.958a1.957 1.957 0 0 0 1.87 1.381h6.963c.826 0 1.563-.518 1.842-1.295l2.04-5.68c.686-1.913-.731-3.928-2.763-3.928h-7.57"
      />
      <circle
        cx="10.171"
        cy="20.532"
        r="1.468"
        fill={color || "#ffffff"}
        className={pathFill}
      />
      <circle
        cx="17.02"
        cy="20.532"
        r="1.468"
        fill={color || "#ffffff"}
        className={pathFill}
      />
    </svg>
  );
};

export default Cart;

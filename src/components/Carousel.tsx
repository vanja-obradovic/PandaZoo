import React from "react";

const Carousel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`carousel carousel-center p-4 bg-orange-200 rounded-box ${
        className ? className : "w-2/3 min-h-[400px] space-x-4"
      }`}
    >
      {children}
    </div>
  );
};

export default Carousel;

/* {items.map((item, index) => {
        return (
          <div className="carousel-item" key={index}>
            {item}
          </div>
        );
      })} */

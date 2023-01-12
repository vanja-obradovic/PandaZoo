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
      className={`my-4 sm:my-0 carousel carousel-center p-4 bg-orange-200 rounded-box ${
        className
          ? className
          : "sm:w-2/3 w-[90%] min-h-[400px] sm:space-x-4 space-y-4 sm:space-y-0 sm:flex-row flex-col sm:overflow-x-scroll overflow-y-scroll sm:snap-x snap-mandatory snap-y"
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

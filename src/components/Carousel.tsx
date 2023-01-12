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
      className={`my-4 lg:my-0 carousel carousel-center p-4 bg-orange-200 rounded-box ${
        className
          ? className
          : "lg:w-2/3 w-[90%] min-h-[400px] lg:space-x-4 space-y-4 lg:space-y-0 lg:flex-row flex-col lg:overflow-x-scroll overflow-y-scroll lg:snap-x snap-mandatory snap-y"
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

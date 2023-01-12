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
      className={`my-4 md:my-0 carousel carousel-center p-4 bg-orange-200 rounded-box ${
        className
          ? className
          : "md:w-2/3 w-[90%] min-h-[400px] md:space-x-4 space-y-4 md:space-y-0 md:flex-row flex-col md:overflow-x-scroll overflow-y-scroll md:snap-x snap-mandatory snap-y"
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

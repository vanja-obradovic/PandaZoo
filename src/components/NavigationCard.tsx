import React from "react";
import { Link } from "react-router-dom";

const NavigationCard = ({
  title,
  image,
  to,
  description,
}: {
  title: string;
  image: string;
  to: string;
  description: string;
}) => {
  return (
    <Link
      to={to}
      className="card shadow-xl bg-orange-200 flex flex-col items-center justify-evenly h-[90%] sm:w-1/5 w-[90%] hover:-translate-y-4 hover:scale-105 cursor-pointer transition-transform duration-200 ease-in-out text-stone-800 last-of-type:mb-4 sm:last-of-type:mb-0"
    >
      <figure className="px-6 pt-6 min-h-[250px]">
        <img src={image} alt="" className="rounded-xl object-scale-down" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">{title}</h2>
        <p>{description}</p>
        <div className="card-actions"></div>
      </div>
    </Link>
  );
};

export default NavigationCard;

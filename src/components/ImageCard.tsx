import React from "react";
import { Link } from "react-router-dom";

const ImageCard = ({
  title,
  image,
  link,
  disabled,
}: {
  title: string;
  image: string;
  link?: string;
  disabled?: boolean;
}) => {
  return (
    <Link
      className={`card lg:w-80 w-full bg-[#ffeccc] elevation-md elevation-md-hover ${
        disabled ? "cursor-default" : "hover:-translate-y-4"
      } transition-transform duration-150 ease-in-out`}
      to={disabled ? "#" : link ?? "/"}
    >
      <div className="card-body p-5">
        <h2 className="card-title text-2xl text-center text-stone-800 justify-center">
          {title}
        </h2>
      </div>
      <figure className="h-64">
        <img src={image} alt="" className="object-cover w-full h-full" />
      </figure>
    </Link>
  );
};

export default ImageCard;

import React from "react";
import Location from "../assets/icons/Location";
import Mail from "../assets/icons/Mail";
import Phone from "../assets/icons/Phone";
import map from "../assets/map.jpg";
import UserMenu from "../components/UserMenu";

const Contact = () => {
  return (
    <>
      <div className="w-full m-auto h-[clamp(400px,750px,80vh)] flex justify-center items-center gap-x-16">
        <div className="h-4/5 aspect-auto">
          <img
            src={map}
            alt="Location"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="divider divider-horizontal h-4/5 self-center before:bg-stone-800 before:bg-opacity-60 after:bg-stone-800 after:bg-opacity-60"></div>
        <div className="w-1/4 flex flex-col justify-evenly h-4/5 text-2xl font-semibold text-stone-800">
          <p className="inline-flex items-center gap-x-4">
            <Location className="w-12 fill-stone-800" /> Mali Kalemegdan 8,
            11000 Beograd
          </p>
          <p className="inline-flex items-center gap-x-4">
            <Mail className="w-12 fill-stone-800" />
            <a href="mailto:office@pandica.rs" className="underline">
              office@pandica.rs
            </a>
          </p>
          <p className="inline-flex items-center gap-x-4">
            <Phone className="w-12 fill-stone-800" />
            011/123-45-67
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;

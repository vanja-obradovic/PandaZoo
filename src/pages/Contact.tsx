import React from "react";
import Location from "../assets/icons/Location";
import Mail from "../assets/icons/Mail";
import Phone from "../assets/icons/Phone";
import map from "../assets/map.jpg";
import UserMenu from "../components/UserMenu";

const Contact = () => {
  return (
    <>
      <div className="w-full lg:m-auto my-4 lg:h-[clamp(400px,750px,80vh)] flex lg:flex-row flex-col justify-center items-center lg:gap-x-16 gap-y-8 lg:gap-y-0">
        <div className="lg:h-4/5 w-4/5 lg:w-auto aspect-auto">
          <img
            src={map}
            alt="Location"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="divider hidden lg:flex divider-horizontal h-4/5 self-center before:bg-stone-800 before:bg-opacity-60 after:bg-stone-800 after:bg-opacity-60"></div>
        <div className="block border-b-2 border-stone-800 w-5/6 lg:hidden"></div>
        <div className="lg:w-1/4 w-5/6 flex flex-col justify-evenly lg:items-start items lg:h-4/5 lg:text-2xl text-xl font-semibold text-stone-800 mx-2 lg:mx-0 gap-y-4 lg:gap-y-0">
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

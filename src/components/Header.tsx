import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo_image from "../assets/logo_image.png";
import logo_text from "../assets/logo_text.png";
import Tickets from "../assets/icons/Tickets";
import Events from "../assets/icons/Events";
import Animals from "../assets/icons/Animals";
import Contact from "../assets/icons/Contact";
import { useState } from "react";
import LogInModal from "./LogInModal";
import RegisterModal from "./RegisterModal";
import UserMenu from "./UserMenu";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../util/firebase";
import Cart from "../assets/icons/Cart";

const Header = () => {
  const home = useLocation().pathname === "/";
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseLogIn = () => setOpenLogIn(false);
  const handleOpenLogIn = () => setOpenLogIn(true);
  const toggle = () => {
    if (openLogIn) {
      handleCloseLogIn();
      handleOpenRegister();
    } else {
      handleCloseRegister();
      handleOpenLogIn();
    }
  };
  const [user, loading, error] = useAuthState(getAuth(app));
  const admin = user?.email === "zaposleni@pandica.rs";

  const [signout] = useSignOut(getAuth(app));

  return (
    <div
      className={`grid grid-cols-3 h-28 items-center  ${
        home
          ? "bg-stone-600 bg-opacity-0 hover:bg-opacity-[75%]"
          : "bg-stone-600 "
      } w-full z-10 relative transition-colors ease-linear duration-200`}
    >
      <NavLink to={"/"} className="flex h-24 ml-4 w-fit">
        <img src={logo_image} alt="Panda" />
        <img src={logo_text} alt="Pandica" className="h-3/5 self-center" />
      </NavLink>
      <div className="flex justify-evenly group text-white">
        {!admin && (
          <>
            <NavLink
              to={"/tickets"}
              className="group/icon w-1/5 group-hover:after:content-['Karte'] group-hover:after:text-2xl flex flex-col items-center gap-y-1 cursor-pointer hover:text-amber-400"
            >
              {({ isActive }) => (
                <div>
                  <Tickets
                    color={isActive ? "#fbbf24" : ""}
                    classname="w-14 aspect-square"
                    pathFill="group-hover/icon:fill-amber-400"
                  ></Tickets>
                </div>
              )}
            </NavLink>
            <NavLink
              to={"/events"}
              className="group/icon w-1/5 group-hover:after:content-['Dogadjaji'] group-hover:after:text-2xl flex flex-col items-center gap-y-1 cursor-pointer hover:text-amber-400"
            >
              {({ isActive }) => (
                <div>
                  <Events
                    color={isActive ? "#fbbf24" : ""}
                    classname="w-14 aspect-square"
                    pathFill="group-hover/icon:fill-amber-400"
                  ></Events>
                </div>
              )}
            </NavLink>
          </>
        )}
        {admin && (
          <NavLink
            to={"/requests"}
            className="group/icon w-1/5 group-hover:after:content-['Zahtevi'] group-hover:after:text-2xl flex flex-col items-center gap-y-1 cursor-pointer hover:text-amber-400"
          >
            {({ isActive }) => (
              <div>
                <Cart
                  color={isActive ? "#fbbf24" : ""}
                  classname="w-14 aspect-square"
                  strokeColor="group-hover/icon:stroke-amber-400"
                  pathFill="group-hover/icon:fill-amber-400"
                ></Cart>
              </div>
            )}
          </NavLink>
        )}
        <NavLink
          to={"/animals"}
          className="group/icon w-1/5 group-hover:after:content-['Zivotinje'] group-hover:after:text-2xl flex flex-col items-center gap-y-1 cursor-pointer hover:text-amber-400"
        >
          {({ isActive }) => (
            <div>
              <Animals
                color={isActive ? "#fbbf24" : ""}
                classname="w-14 aspect-square"
                pathFill="group-hover/icon:fill-amber-400"
              ></Animals>
            </div>
          )}
        </NavLink>
        {!admin && (
          <NavLink
            to={"/contact"}
            className="group/icon w-1/5 group-hover:after:content-['Kontakt'] group-hover:after:text-2xl flex flex-col items-center gap-y-1 cursor-pointer hover:text-amber-400"
          >
            {({ isActive }) => (
              <div>
                <Contact
                  color={isActive ? "#fbbf24" : ""}
                  classname="w-14 aspect-square"
                  pathFill="group-hover/icon:fill-amber-400"
                ></Contact>
              </div>
            )}
          </NavLink>
        )}
      </div>
      <div className="justify-self-end mr-16 w-fit">
        {user ? (
          <UserMenu
            items={
              admin
                ? [
                    { title: "Moj profil", link: "/profile" },
                    { title: "Odjavi se", link: "/", action: signout },
                  ]
                : [
                    { title: "Moj profil", link: "/profile" },
                    { title: "Obavestenja", link: "/notifications" },
                    { title: "Odjavi se", link: "/", action: signout },
                  ]
            }
          ></UserMenu>
        ) : (
          <button
            className="btn btn-accent"
            onClick={handleOpenLogIn}
            id={"login_modal"}
          >
            Prijavi se
          </button>
        )}
      </div>
      <LogInModal open={openLogIn} onClose={handleCloseLogIn} toggle={toggle} />
      <RegisterModal
        open={openRegister}
        onClose={handleCloseRegister}
        toggle={toggle}
      />
    </div>
  );
};

export default Header;

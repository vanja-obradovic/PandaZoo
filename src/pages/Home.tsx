import React from "react";
import home_video from "../assets/home_video.mp4";
import panda from "../assets/panda.png";
import ticketImage from "../assets/ticket_image(Custom).png";
import eventImage from "../assets/event_image(Custom).jpg";
import animalImage from "../assets/animal_image(Custom).jpg";
import contactImage from "../assets/contact_image(Custom).jpg";
import cartImage from "../assets/cart_image.png";
import NavigationCard from "../components/NavigationCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../util/firebase";

const Home = () => {
  const [user, loading, error] = useAuthState(getAuth(app));
  const admin = user?.email === "zaposleni@pandica.rs";

  return (
    <div className="h-[700px] relative md:bottom-28 bottom-20">
      <video
        src={home_video}
        loop
        muted
        autoPlay
        className="h-full w-full object-cover"
        placeholder={panda}
      ></video>
      <div className="relative md:h-[450px] md:bottom-56 bottom-48 gap-y-8 md:gap-y-0 flex md:flex-row flex-col items-center justify-around">
        {!admin ? (
          <>
            <NavigationCard
              title="Karte"
              image={ticketImage}
              to="/tickets"
              description="Karte i promotivni paketi"
            ></NavigationCard>
            <NavigationCard
              title="Dogadjaji"
              image={eventImage}
              to="/events"
              description="Lista dogadjaja"
            ></NavigationCard>
            <NavigationCard
              title="Zivotinje"
              image={animalImage}
              to="/animals"
              description="Istrazite nase zivotinje"
            ></NavigationCard>
            <NavigationCard
              title="Kontakt"
              image={contactImage}
              to="/contact"
              description="Gde se nalazimo"
            ></NavigationCard>
          </>
        ) : (
          <>
            <NavigationCard
              title="Zahtevi"
              image={cartImage}
              to="/requests"
              description="Pregled trenutnih zahteva"
            ></NavigationCard>
            <NavigationCard
              title="Zivotinje"
              image={animalImage}
              to="/animals"
              description="Pregled i dodavanje životinja"
            ></NavigationCard>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

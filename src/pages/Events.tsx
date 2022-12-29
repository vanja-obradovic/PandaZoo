import React from "react";
import Carousel from "../components/Carousel";
import ImageTextCard from "../components/ImageTextCard";
import farm from "../assets/farm.jpg";
import birds from "../assets/ptice.jpg";
import coffee from "../assets/kafa.jpg";
import fly from "../assets/ptice_u_letu.png";
import panda from "../assets/pandaRodj.jpg";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import app from "../util/firebase";

const Events = () => {
  const [data, loading, error] = useCollection(
    collection(getFirestore(app), "/events")
  );

  return (
    <>
      <div className="w-full m-auto flex justify-center items-center">
        <Carousel>
          {data?.docs.map((event) => {
            const item = event.data();
            return (
              <div className="carousel-item" key={item.title}>
                <ImageTextCard
                  title={item.title}
                  description={item.description}
                  likes={item.likes}
                  image={item.image}
                  id={event.id}
                ></ImageTextCard>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Events;

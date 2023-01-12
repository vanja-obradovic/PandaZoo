import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import Carousel from "../components/Carousel";
import NotificationCard from "../components/NotificationCard";
import app from "../util/firebase";
import { format } from "date-fns";

const Requests = () => {
  const [data, loading, error, snapshot, reload] = useCollectionDataOnce(
    query(
      collection(getFirestore(app), `/purchaseRequests`),
      orderBy("timestamp", "desc")
    )
  );

  return (
    <div className="sm:w-4/5 h-full m-auto flex flex-col gap-y-4 justify-center items-center">
      <Carousel className="carousel-vertical w-full space-y-4 overflow-x-hidden max-h-[750px] my-4 ">
        {snapshot?.docs.map((doc) => {
          const request = doc.data();

          if (request.approved !== undefined) return;

          return (
            <NotificationCard
              buyer={request.username}
              quantity={request.quantity}
              price={request.price}
              request
              title={request.title}
              date={format(
                request.timestamp.seconds * 1000 +
                  request.timestamp.nanoseconds / 1000000,
                "dd.MM.yyyy | HH:mm"
              )}
              id={doc.id}
              key={doc.id}
              action={reload}
            ></NotificationCard>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Requests;

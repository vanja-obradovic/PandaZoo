import { format } from "date-fns";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import Carousel from "../components/Carousel";
import NotificationCard from "../components/NotificationCard";
import app from "../util/firebase";

const Notifications = () => {
  const [user, authLoading, authError] = useAuthState(getAuth(app));

  const [data, loading, error, snapshot, reload] = useCollectionDataOnce(
    query(
      collection(getFirestore(app), `users/${user?.email}/notifications`),
      orderBy("timestamp", "desc")
    )
  );

  return (
    <div className="w-4/5 h-full m-auto flex flex-col gap-y-4 justify-center items-center">
      <Carousel className="carousel-vertical w-full space-y-4 overflow-x-hidden max-h-[750px] my-4 ">
        {snapshot?.docs.map((doc) => {
          const request = doc.data();

          return (
            <NotificationCard
              quantity={request.quantity}
              price={request.price}
              title={request.title}
              date={format(
                request.timestamp.seconds * 1000 +
                  request.timestamp.nanoseconds / 1000000,
                "dd.MM.yyyy | HH:mm"
              )}
              approved={request.approved}
              key={doc.id}
              id={doc.id}
            ></NotificationCard>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Notifications;

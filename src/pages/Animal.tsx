import { format } from "date-fns";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import CommentCard from "../components/CommentCard";
import CommentModal from "../components/CommentModal";
import app from "../util/firebase";

const Animal = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, loadingAuth, errorAuth] = useAuthState(getAuth(app));

  const [data, loading, error, snapshot] = useDocumentDataOnce(
    doc(getFirestore(app), `animals/${id}`)
  );

  const [comments, loadingComments, errorComments, snapshotComments, reload] =
    useCollectionDataOnce(
      query(
        collection(getFirestore(app), `/animals/${id}/comments`),
        orderBy("timestamp", "desc")
      )
    );

  const handleComment = () => {
    if (user) {
      handleOpen();
    } else document.getElementById("login_modal")?.click();
  };
  return (
    <div className="flex flex-col items-center lg:w-3/5 mx-2 lg:mx-0 self-center gap-y-4">
      <h1 className="text-5xl mt-8 mb-4 text-stone-800 font-medium text-center">
        {data?.name}
      </h1>
      <div className="lg:w-3/5 w-5/6 aspect-video">
        <img
          src={data?.image}
          alt={id}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="self-start text-3xl">Opis</h2>
      <p className="self-stretch mx-4 text-justify text-lg">
        {data?.description}
      </p>
      <h2 className="self-start text-3xl">Komentari</h2>
      <Carousel className="carousel-vertical w-full space-y-4 overflow-x-hidden max-h-[800px] mb-4">
        <>
          <div className="self-center">
            <button className="btn btn-wide btn-accent" onClick={handleComment}>
              Ostavi komentar
            </button>
            <CommentModal
              open={open}
              id={id ?? ""}
              onClose={handleClose}
              action={reload}
            ></CommentModal>
          </div>
          {comments?.map((comment) => {
            return (
              <CommentCard
                content={comment.comment}
                user={comment.name + " " + comment.surname}
                date={format(
                  comment.timestamp.seconds * 1000 +
                    comment.timestamp.nanoseconds / 1000000,
                  "dd.MM.yyyy | HH:mm"
                )}
                key={comment.timestamp.seconds}
              ></CommentCard>
            );
          })}
        </>
      </Carousel>
    </div>
  );
};

export default Animal;

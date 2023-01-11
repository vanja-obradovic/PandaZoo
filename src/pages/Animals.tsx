import React, { useState } from "react";
import ImageCard from "../components/ImageCard";
import { useNavigate, useParams } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import AddAnimalModal from "../components/AddAnimalModal";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection, getFirestore } from "firebase/firestore";
import app from "../util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const Animals = () => {
  const { page } = useParams();
  const num = parseInt(page ?? "1");
  const navigate = useNavigate();

  const [data, loading, error, reload] = useCollectionOnce(
    collection(getFirestore(app), "/animals")
  );

  const [user, loadingAuth, errorAuth] = useAuthState(getAuth(app));
  const admin = user?.email === "zaposleni@pandica.rs";

  const animals = data?.docs;

  const pageNumbers = usePagination(animals);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="w-full m-auto flex flex-col gap-y-4 justify-center items-center">
        {admin && (
          <button className="btn btn-wide btn-accent mb-4" onClick={handleOpen}>
            Dodaj životinju
          </button>
        )}
        <div className="flex justify-center items-center gap-x-4 w-[90%]">
          {animals?.slice((num - 1) * 5, (num - 1) * 5 + 5).map((item) => {
            const animal = item.data();
            return (
              <ImageCard
                title={animal.name}
                image={animal.image}
                link={`/animal/${item.id}`}
                key={item.id}
                disabled={admin}
              ></ImageCard>
            );
          })}
        </div>
        <div className="btn-group">
          {pageNumbers.map((item, index) => {
            return (
              <button
                className={`btn border-stone-600 ${
                  num === item
                    ? "btn-accent border-teal-500"
                    : "bg-stone-600 text-stone-200"
                }`}
                onClick={() =>
                  navigate(`/animals${item === 1 ? "" : `/${item}`}`)
                }
                key={index}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <AddAnimalModal
        open={open}
        onClose={handleClose}
        action={reload}
      ></AddAnimalModal>
    </>
  );
};

export default Animals;

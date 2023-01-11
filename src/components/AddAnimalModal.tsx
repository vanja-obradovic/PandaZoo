import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUploadFile } from "react-firebase-hooks/storage";
import app from "../util/firebase";
import Modal from "./Modal";
import { getStorage } from "firebase/storage";
import { useState } from "react";
import Cancel from "../assets/icons/Cancel";

type animal_data = {
  name: string;
  description: string;
  image: string;
};

const AddAnimalModal = ({
  open,
  id,
  onClose,
  action,
}: {
  open: boolean;
  id?: string;
  onClose: () => void;
  action: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<animal_data>();

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [animalImage, setAnimalImage] = useState<File>();
  const [animalImageURL, setAnimalImageURL] = useState<string>();

  const handleAddNewAnimal = (data: animal_data) => {
    if (animalImage) {
      const reference = ref(getStorage(app), `animals/${animalImage.name}`);
      animalImage.type;
      uploadFile(reference, animalImage, {
        contentType: animalImage.type,
      }).then((res) => {
        if (res)
          getDownloadURL(res.ref).then((url) =>
            setDoc(
              doc(
                getFirestore(app),
                `/animals/${data.name.toLowerCase().replaceAll(" ", "_")}`
              ),
              {
                name: data.name,
                description: data.description,
                image: url,
              }
            ).then((res) => {
              toast.success("Uspesno dodata zivotinja!");
              action();
              onClose();
            })
          );
      });
      console.log(snapshot);
    }
  };

  const handleError = (err: any) => {
    if (err.name) toast.error(err.name.message);
    if (err.description) toast.error(err.description.message);
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <form
        className="flex flex-col flex-grow justify-evenly items-center w-[90%]"
        onSubmit={handleSubmit(handleAddNewAnimal, handleError)}
      >
        <h1 className="text-3xl font-semibold text-stone-800">
          Nova životinja
        </h1>
        <div className="flex flex-grow flex-col gap-y-4 items-center mt-4 w-full">
          <div className="flex flex-col justify-evenly w-2/3 gap-y-4">
            <input
              type={"text"}
              placeholder="Naziv životinje"
              {...register("name", {
                required: "Morate uneti naziv životinje!",
              })}
              className={`input input-accent border-0 bg-orange-200 placeholder:text-stone-800 ${
                errors.name ? "input-error" : "input-accent"
              }`}
            ></input>
            <textarea
              className={`textarea w-full border-0 bg-orange-200 placeholder:text-stone-800 resize-none leading-tight ${
                errors.description ? "textarea-error" : "textarea-accent"
              }`}
              placeholder="Opis životinje"
              rows={7}
              {...register("description", { required: "Morate uneti opis!" })}
            ></textarea>
          </div>
          {/* <div className="flex items-center justify-center"> */}
          {!animalImage ? (
            <button
              className="btn btn-accent btn-wide"
              onClick={() => document.getElementById("file-input")?.click()}
              type={"button"}
            >
              Izaberi sliku
            </button>
          ) : (
            <div className="relative flex justify-center w-5/6">
              <img src={animalImageURL} className=" aspect-video" />
              <div
                className="absolute left-0 translate-x-2 translate-y-2"
                title="Ponisti izbor"
                onClick={() => {
                  if (animalImageURL) URL.revokeObjectURL(animalImageURL);
                  setAnimalImageURL(undefined);
                  setAnimalImage(undefined);
                  (
                    document.getElementById("file-input") as HTMLInputElement
                  ).value = "";
                }}
              >
                <Cancel className="stroke-orange-300 w-6 h-6 stroke-[7] hover:scale-150 cursor-pointer transition-transform"></Cancel>
              </div>
            </div>
          )}
          <input
            type="file"
            hidden
            id={"file-input"}
            onChange={(e) => {
              setAnimalImage(e.target.files?.[0]);
              setAnimalImageURL(
                e.target.files?.[0]
                  ? URL.createObjectURL(e.target.files?.[0])
                  : undefined
              );
            }}
          />
          {/* </div> */}
          <button
            className="btn btn-wide btn-accent"
            type="submit"
            disabled={uploading}
          >
            Potvrdi
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAnimalModal;

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUploadFile } from "react-firebase-hooks/storage";
import app from "../util/firebase";
import Modal from "./Modal";
import { getStorage } from "firebase/storage";
import { useState } from "react";

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
        <div className="flex flex-grow gap-x-12">
          <div className="flex flex-col justify-evenly w-2/3">
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
          <div className="flex items-center justify-center w-1/3">
            <button
              className="btn btn-accent btn-block"
              onClick={() => document.getElementById("file-input")?.click()}
              type={"button"}
            >
              Izaberi sliku
            </button>
            <input
              type="file"
              hidden
              id={"file-input"}
              onChange={(e) => setAnimalImage(e.target.files?.[0])}
            />
          </div>
        </div>
        <button
          className="btn btn-wide btn-accent"
          type="submit"
          disabled={uploading}
        >
          Potvrdi
        </button>
      </form>
    </Modal>
  );
};

export default AddAnimalModal;

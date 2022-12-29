import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import app from "../util/firebase";
import Modal from "./Modal";

type comment_data = {
  comment: string;
};

const CommentModal = ({
  open,
  id,
  onClose,
  action,
}: {
  open: boolean;
  id: string;
  onClose: () => void;
  action: () => Promise<void>;
}) => {
  const [user, loading, error] = useAuthState(getAuth(app));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<comment_data>();

  const handleComment = (data: comment_data) => {
    const display = user?.displayName?.split(" ");

    addDoc(collection(getFirestore(app), `/animals/${id}/comments`), {
      name: display?.[0],
      surname: display?.[1],
      username: user?.email,
      comment: data.comment,
      timestamp: serverTimestamp(),
    }).then((res) => {
      toast.success("Uspesno ostavljen komentar!");
      action();
      onClose();
    });
  };

  const handleError = (err: any) => {
    if (err.comment) toast.error(err.comment.message);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <form
        className="flex flex-col flex-grow justify-evenly items-center w-5/6"
        onSubmit={handleSubmit(handleComment, handleError)}
      >
        <h1 className="text-3xl font-semibold text-stone-800">Novi komentar</h1>
        <textarea
          className={`textarea w-full border-0 bg-orange-200 placeholder:text-stone-800 resize-none ${
            errors.comment ? "textarea-error" : "textarea-accent"
          }`}
          placeholder="Komentar..."
          rows={4}
          {...register("comment", { required: "Morate uneti komentar!" })}
        ></textarea>
        <button className="btn btn-wide btn-accent" type="submit">
          Potvrdi
        </button>
      </form>
    </Modal>
  );
};

export default CommentModal;

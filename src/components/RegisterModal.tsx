import React from "react";
import Modal from "./Modal";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import app from "../util/firebase";

type register_data = {
  username: string;
  password: string;
  name: string;
  surname: string;
  phone: number;
  address: string;
};

const RegisterModal = ({
  open,
  onClose,
  toggle,
}: {
  open: boolean;
  onClose: () => void;
  toggle: () => void;
}) => {
  const [registerUser, user, loading, error] =
    useCreateUserWithEmailAndPassword(getAuth(app));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<register_data>({ shouldUnregister: true });

  const [updateProfile] = useUpdateProfile(getAuth(app));

  const handleRegister = (data: register_data) => {
    registerUser(data.username, data.password).then((res) => {
      if (res?.user) {
        updateProfile({ displayName: data.name + " " + data.surname });
        setDoc(doc(getFirestore(app), "/users", data.username), {
          name: data.name,
          surname: data.surname,
          address: data.address,
          phone: data.phone,
          username: data.username,
          pendingNotification: false,
        });
        reset();
        onClose();
      } else if (error) {
        if (error.code === "auth/invalid-email")
          toast.error("Uneti email nije validan!");
        else if (error.code === "auth/weak-password")
          toast.error(
            "Lozinka nije dovoljno jaka (minimalno 8 karaktera, 1 malo slovo, 1 veliko slovo i 1 broj)!"
          );
        else if (error.code === "auth/email-already-in-use")
          toast.error("Korisnik sa unetom email adresom vec postoji!");
        else "Serverska greska pokusajte ponovo!";
      }
    });
  };
  const handleError = (err: any) => {
    if (err.username) toast.error(err.username.message);
    if (err.password) toast.error(err.password.message);
    if (err.name) toast.error(err.name.message);
    if (err.surname) toast.error(err.surname.message);
    if (err.phone) toast.error(err.phone.message);
    if (err.address) toast.error(err.address.message);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <form
        className="flex flex-col flex-shrink-0 flex-grow items-center justify-evenly w-full gap-y-4 "
        onSubmit={handleSubmit(handleRegister, handleError)}
      >
        <h1 className="text-3xl text-stone-800 font-semibold">Prijavite se</h1>
        <div className="flex flex-col items-center justify-evenly gap-y-4 w-3/5">
          <input
            className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 w-full ${
              errors.name
                ? "outline-red-500 outline-2 outline-offset-2 outline"
                : "outline-none"
            }`}
            type="text"
            {...register("name", {
              required: "Morate uneti ime!",
            })}
            placeholder="Ime"
          />
          <input
            className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 w-full ${
              errors.surname
                ? "outline-red-500 outline-2 outline-offset-2 outline"
                : "outline-none"
            }`}
            type="text"
            {...register("surname", {
              required: "Morate uneti prezime!",
            })}
            placeholder="Prezime"
          />
          <input
            className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 w-full ${
              errors.phone
                ? "outline-red-500 outline-2 outline-offset-2 outline"
                : "outline-none"
            }`}
            type="text"
            {...register("phone", {
              required: "Morate uneti broj telefona!",
            })}
            placeholder="Telefon"
          />
          <input
            className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 w-full ${
              errors.address
                ? "outline-red-500 outline-2 outline-offset-2 outline"
                : "outline-none"
            }`}
            type="text"
            {...register("address", {
              required: "Morate uneti adresu!",
            })}
            placeholder="Adresa"
          />
          <input
            className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 w-full ${
              errors.username
                ? "outline-red-500 outline-2 outline-offset-2 outline"
                : "outline-none"
            }`}
            type="email"
            {...register("username", {
              required: "Morate uneti korisncko ime!",
            })}
            placeholder="Korisnicko ime (Email)"
          />
          <input
            className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 w-full ${
              errors.password
                ? "outline-red-500 outline-2 outline-offset-2 outline"
                : "outline-none"
            }`}
            type="password"
            {...register("password", {
              required: "Morate uneti lozinku!",
            })}
            placeholder="Lozinka"
          />
        </div>
        <button className="btn btn-wide btn-accent" disabled={loading}>
          Registruj se
        </button>
        <span className="text-lg">
          Imate nalog? Prijavite se
          <button
            className="btn-ghost underline ml-1"
            onClick={() => {
              reset();
              toggle();
            }}
            type="button"
          >
            ovde.
          </button>
        </span>
      </form>
    </Modal>
  );
};

export default RegisterModal;

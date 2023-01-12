import { getAuth } from "firebase/auth";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import app from "../util/firebase";
import Modal from "./Modal";

type login_data = {
  username: string;
  password: string;
};

const LogInModal = ({
  open,
  onClose,
  toggle,
}: {
  open: boolean;
  onClose: () => void;
  toggle: () => void;
}) => {
  const [login, user, loading, error] = useSignInWithEmailAndPassword(
    getAuth(app)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<login_data>();

  const handleLogin = (data: login_data) => {
    login(data.username, data.password).then((res) => {
      if (res?.user) {
        onClose();
        reset();
      } else if (error) {
        if (error.code === "auth/user-not-found")
          toast.error("Korisnik sa unetim kredencijalima ne postoji!");
        else if (error.code === "auth/wrong-password")
          toast.error("Lozinka nije ispravna!");
        else "Serverska greska pokusajte ponovo!";
      }
    });
  };
  const handleError = (err: any) => {
    if (err.username) toast.error(err.username.message);
    if (err.password) toast.error(err.password.message);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <form
        className="flex flex-col flex-shrink-0 flex-grow items-center justify-evenly w-full gap-y-4 md:gap-y-0"
        onSubmit={handleSubmit(handleLogin, handleError)}
      >
        <h1 className="text-3xl text-stone-800 font-semibold">Prijavite se</h1>
        <div className="flex flex-col items-center justify-evenly gap-y-4 w-3/5">
          <input
            className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 w-full ${
              errors.username
                ? "outline-red-500 outline-2 outline-offset-2 outline"
                : "outline-none"
            }`}
            type="email"
            placeholder="Korisnicko ime"
            {...register("username", {
              required: "Morate uneti korisncko ime!",
            })}
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
        <button
          className="btn btn-wide btn-accent"
          disabled={loading}
          type={"submit"}
        >
          Prijavi se
        </button>
        <span className="text-lg">
          Nemate nalog? Registujte se
          <button
            className="btn-ghost underline ml-1"
            onClick={toggle}
            type={"button"}
          >
            ovde.
          </button>
        </span>
      </form>
    </Modal>
  );
};

export default LogInModal;

import {
  EmailAuthCredential,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useId, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import app from "../util/firebase";
import { useForm } from "react-hook-form";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, useNavigation } from "react-router-dom";

type user_data = {
  name: string;
  surname: string;
  phone: number;
  address: string;
  username: string;
};

type password_data = {
  old: string;
  new: string;
  confirm: string;
};

const Profile = () => {
  const [change, setChange] = useState(false);
  const toggleChange = () => {
    if (user) {
      if (change) {
        setChange(!change);
        if (dirtyFields.name || dirtyFields.surname) {
          updateProfile(user!, {
            displayName: getValues("name") + " " + getValues("surname"),
          }).then((res) => toast.success("Uspesna promena imena i prezimena!"));
          updateDoc(doc(getFirestore(app), `users/${user.email}`), {
            name: getValues("name"),
            surname: getValues("surname"),
          });
        }
        if (dirtyFields.address || dirtyFields.phone) {
          updateDoc(doc(getFirestore(app), `users/${user.email}`), {
            address: getValues("address"),
            phone: getValues("phone"),
          }).then((res) => toast.success("Uspesna promena podataka!"));
        }
      } else setChange(!change);
    }
  };
  const id = useId();

  const [user] = useAuthState(getAuth(app));
  const [value, loading, error, snapshot] = useDocumentDataOnce(
    doc(getFirestore(app), `users/${user?.email}`)
  );

  const {
    register: registerData,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useForm<user_data>({});

  const { register: registerPass, handleSubmit: handlePassChange } =
    useForm<password_data>({});

  const navigate = useNavigate();

  const handleNewPass = (data: password_data) => {
    if (user && data.new === data.confirm) {
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user?.email ?? "", data.old)
      )
        .then((res) => {
          updatePassword(res.user, data.new).then((res) => {
            toast.success("Promena lozinke uspesna!");
            navigate("/");
            signout();
          });
        })
        .catch((res) => toast.error("Stara lozinka nije ispravna!"));
    } else toast.error("Lozinke se ne poklapaju");
  };

  const handleError = (err: any) => {
    if (err.old) toast.error(err.old.message);
    if (err.new) toast.error(err.new.message);
    if (err.confirm) toast.error(err.confirm.message);
  };

  useEffect(() => {
    reset({
      name: value?.name,
      surname: value?.surname,
      phone: value?.phone,
      address: value?.address,
      username: user?.email ?? undefined,
    });
  }, [value]);

  const [signout] = useSignOut(getAuth(app));

  return (
    <div className="flex sm:m-auto my-4 sm:h-[clamp(400px,750px,80vh)] items-center justify-center gap-x-8 w-full sm:flex-row flex-col gap-y-4 sm:gap-y-0">
      <div className="flex flex-col gap-y-4 min-w-[25%]">
        <div className="flex flex-col">
          <label htmlFor={`${id}-name`}>Ime</label>
          <input
            disabled={!change}
            type="text"
            {...registerData("name", { required: "Ime je obavezno!" })}
            id={`${id}-name`}
            placeholder={loading ? "......." : "Ime"}
            className=" input input-accent border-0 bg-orange-200 placeholder:text-stone-800 disabled:bg-stone-300 disabled:text-stone-500 disabled:placeholder:text-stone-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${id}-surname`}>Prezime</label>
          <input
            disabled={!change}
            type="text"
            {...registerData("surname", { required: "Prezime je obavezno!" })}
            id={`${id}-surname`}
            placeholder={loading ? "......." : "Prezime"}
            className=" input input-accent border-0 bg-orange-200 placeholder:text-stone-800 disabled:bg-stone-300 disabled:text-stone-500 disabled:placeholder:text-stone-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${id}-address`}>Adresa</label>
          <input
            disabled={!change}
            type="text"
            {...registerData("address", { required: "Adresa je obavezna!" })}
            id={`${id}-address`}
            placeholder={loading ? "......." : "Adresa"}
            className=" input input-accent border-0 bg-orange-200 placeholder:text-stone-800 disabled:bg-stone-300 disabled:text-stone-500 disabled:placeholder:text-stone-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${id}-phone`}>Telefon</label>
          <input
            disabled={!change}
            type="text"
            {...registerData("phone", { required: "Telefon je obavezan!" })}
            id={`${id}-phone`}
            placeholder={loading ? "......." : "Telefon"}
            className="input input-accent border-0 bg-orange-200 placeholder:text-stone-800 disabled:bg-stone-300 disabled:text-stone-500 disabled:placeholder:text-stone-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${id}-username`}>Korisnicko ime</label>
          <input
            disabled={true}
            type="text"
            id={`${id}-username`}
            placeholder={loading ? "......." : "Korisnicko ime"}
            {...registerData("username")}
            className=" input input-accent border-0 bg-orange-200 placeholder:text-stone-800 disabled:bg-stone-300 disabled:text-stone-500 disabled:placeholder:text-stone-500"
          />
        </div>
        <button
          className={`btn btn-wide self-center ${
            change ? "btn-error" : "btn-accent"
          }`}
          onClick={toggleChange}
        >
          Izmeni podatke
        </button>
      </div>
      <div className="divider divider-horizontal hidden sm:flex h-3/5 self-center before:bg-stone-800 before:bg-opacity-60 after:bg-stone-800 after:bg-opacity-60"></div>
      <div className="block border-b-2 border-stone-800 w-5/6 sm:hidden"></div>
      <form
        className="flex flex-col gap-y-4 min-w-[25%]"
        onSubmit={handlePassChange(handleNewPass, handleError)}
      >
        <div className="flex flex-col items">
          <label htmlFor={`${id}-username`}>Stara lozinka</label>
          <input
            type="password"
            {...registerPass("old", {
              required: "Morate uneti staru lozinku!",
            })}
            id={`${id}-pass`}
            className=" input input-accent border-0 bg-orange-200 placeholder:text-stone-800 "
            placeholder="Stara lozinka"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${id}-username`}>Nova lozinka</label>
          <input
            type="password"
            {...registerPass("new", { required: "Morate uneti novu lozinku!" })}
            id={`${id}-newpass`}
            className=" input input-accent border-0 bg-orange-200 placeholder:text-stone-800 "
            placeholder="Nova lozinka"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`${id}-username`}>Potvrda lozinke</label>
          <input
            type="password"
            {...registerPass("confirm", {
              required: "Morate uneti potvrdu lozinke!",
            })}
            id={`${id}-confirmpass`}
            className=" input input-accent border-0 bg-orange-200 placeholder:text-stone-800 "
            placeholder="Potvrda lozinke"
          />
        </div>
        <button className="btn btn-error btn-wide self-center" type="submit">
          Promeni lozinku
        </button>
      </form>
    </div>
  );
};

export default Profile;

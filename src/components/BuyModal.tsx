import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Tick from "../assets/icons/Tick";
import app from "../util/firebase";
import Modal from "./Modal";

type modal_data = {
  quantity?: number;
  promo?: string;
};

const BuyModal = ({
  input = false,
  title,
  text,
  open,
  price = -1,
  group,
  onClose,
}: {
  input: boolean;
  title: string;
  text: string;
  open: boolean;
  price?: number;
  group: boolean;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(0);

  const promoCodes = {
    pandaHelp: 0.9,
    pandica2023: 0.8,
    pandaZakon: 0.7,
  };

  const calculateGroupPrice = (quantity: number) => {
    if (quantity < 20) return 500;
    else if (quantity < 40) return 400;
    else return 350;
  };

  const getDiscount = (promo: string | undefined) => {
    return (
      Object.values(promoCodes)[Object.keys(promoCodes).indexOf(promo ?? "")] ??
      1
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<modal_data>();

  const [user, loading, error] = useAuthState(getAuth(app));

  const handlePurchase = (data: modal_data) => {
    addDoc(collection(getFirestore(app), "/purchaseRequests"), {
      username: user?.email,
      title: title,
      quantity: data.quantity ?? 1,
      price:
        (data.quantity ?? 1) *
        (price === -1
          ? calculateGroupPrice(data.quantity ?? 0) * getDiscount(data.promo)
          : price * getDiscount(data.promo)),
      timestamp: serverTimestamp(),
    }).then((res) => {
      setDoc(
        doc(getFirestore(app), `users/${user?.email}/notifications/${res.id}`),
        {
          title: title,
          quantity: quantity ?? 1,
          price: price,
          timestamp: serverTimestamp(),
        }
      ).then((res) => {
        toast.success("Kupovina uspesna");
        reset();
        setQuantity(0);
        onClose();
      });
    });
  };

  const handleError = (err: any) => {
    if (err.quantity) toast.error(err.quantity.message);
    if (err.promo) toast.error(err.promo.message);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        setQuantity(0);
        onClose();
      }}
    >
      <form
        className="flex flex-col flex-grow justify-evenly items-center gap-y-4 sm:gap-y-0"
        onSubmit={handleSubmit(handlePurchase, handleError)}
      >
        <h1 className="text-3xl font-semibold text-stone-800">
          Kupovina ulaznice
        </h1>
        <div className="flex justify-center gap-x-2 items-center text-lg">
          {input && (
            <input
              type={"number"}
              placeholder="Broj ulaznica"
              id="quantityInput"
              defaultValue={0}
              min={0}
              {...register("quantity", {
                required: "Morate uneti kolicinu",
                min: { value: 1, message: "Minimalna kolicina je 1!" },
                valueAsNumber: true,
              })}
              onChange={(e) => setQuantity(e.target.valueAsNumber)}
              className={`input input-accent border-none bg-orange-200 placeholder:text-stone-800 ${
                errors.quantity
                  ? "outline-red-500 outline-2 outline-offset-2 outline"
                  : "outline-none"
              }`}
            ></input>
          )}
          {quantity > 0 ? (
            group ? (
              <>
                <span>{`x ${calculateGroupPrice(quantity)} = ${
                  calculateGroupPrice(quantity) * quantity
                } rsd`}</span>
              </>
            ) : (
              <>
                <span>{text}</span>
                <span>{`= ${price * quantity} rsd`}</span>
              </>
            )
          ) : (
            !input && <span>{text}</span>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="text-center">
            Ispod možete uneti promo kod za popust, ukoliko ga imate:
          </div>
          <div className="relative">
            <input
              type={"text"}
              placeholder="Promo kod"
              {...register("promo")}
              className="input input-accent border-0 bg-orange-200 placeholder:text-stone-800 relative"
            ></input>
            {Object.keys(promoCodes).includes(watch("promo") ?? "") && (
              <div className="absolute h-8 w-8 -right-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Tick className="h-full w-full stroke-green-600" />
              </div>
            )}
          </div>
        </div>
        <button className="btn btn-wide btn-accent" type="submit">
          Potvrdi
        </button>
      </form>
    </Modal>
  );
};

export default BuyModal;

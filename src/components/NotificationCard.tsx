import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import Cancel from "../assets/icons/Cancel";
import Tick from "../assets/icons/Tick";
import app from "../util/firebase";

const NotificationCard = ({
  title,
  date,
  request = false,
  quantity,
  buyer,
  price,
  id,
  approved,
  action,
}: {
  title: string;
  date: string;
  request?: boolean;
  quantity?: number;
  buyer?: string;
  price?: number;
  id?: string;
  approved?: boolean;
  action?: () => void;
}) => {
  const handleApprove = () => {
    const batch = writeBatch(getFirestore(app));
    batch.update(doc(getFirestore(app), `purchaseRequests/${id}`), {
      approved: true,
    });
    batch.update(doc(getFirestore(app), `users/${buyer}/notifications/${id}`), {
      approved: true,
    });
    batch.update(doc(getFirestore(app), `/users/${buyer}`), {
      pendingNotification: true,
    });

    batch.commit().then((res) => {
      action?.();
      toast.success("Uspeh!");
    });
  };

  const handleReject = () => {
    const batch = writeBatch(getFirestore(app));
    batch.update(doc(getFirestore(app), `purchaseRequests/${id}`), {
      approved: false,
    });
    batch.update(doc(getFirestore(app), `users/${buyer}/notifications/${id}`), {
      approved: false,
    });
    batch.update(doc(getFirestore(app), `/users/${buyer}`), {
      pendingNotification: true,
    });

    batch.commit().then((res) => {
      action?.();
      toast.success("Uspeh!");
    });
  };

  return (
    <div className="card w-full mx-4 bg-[#ffeccc] elevation-sm text-stone-800 self-center">
      <div className="card-body justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="font-medium lg:text-3xl text-2xl">{title}</h2>
          <span className="text-sm flex flex-row items-center justify-between">
            <p>{date}</p>
            {!request &&
              (approved ? (
                <div className="flex flex-row items-center gap-x-1">
                  <Tick className="stroke-green-600 w-8 h-8"></Tick>
                  <p className="text-green-600 font-semibold">Potvrdjeno</p>
                </div>
              ) : approved === false ? (
                <div className="flex flex-row items-center gap-x-1">
                  <Cancel className="stroke-red-600 w-8 h-8 stroke-[6]"></Cancel>
                  <p className="text-red-600 font-semibold">Odbijeno</p>
                </div>
              ) : (
                <></>
              ))}
          </span>
        </div>
        <div className="text-lg">
          {request ? (
            <div className="flex lg:flex-row flex-col justify-between gap-y-4 lg:gap-y-0">
              <div>
                <p>{`Kupac: ${buyer}`}</p>
                <p>{`Kolicina: ${quantity} kom`}</p>
                <p>{`Cena: ${price} rsd`}</p>
              </div>
              <div className="lg:mr-16 flex lg:flex-row flex-col lg:gap-x-8 lg:gap-y-0 gap-y-4 items-center lg:items-start">
                <button
                  className="btn btn-success btn-wide"
                  onClick={handleApprove}
                >
                  Prihvati
                </button>
                <button
                  className="btn btn-error btn-wide"
                  onClick={handleReject}
                >
                  Odbij
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>{`Kolicina: ${quantity} kom`}</p>
              <p>{`Cena: ${price} rsd`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import app from "../util/firebase";

const UserMenu = ({
  items,
}: {
  items: { title: string; link: string; action?: () => any }[];
}) => {
  const [open, setOpen] = useState(false);
  const [user, loading, error] = useAuthState(getAuth(app));

  const [data, dataLoading, dataError, snapshot] = useDocumentData(
    doc(getFirestore(app), `/users/${user?.email}`)
  );

  const resetNotifications = () => {
    updateDoc(doc(getFirestore(app), `/users/${user?.email}`), {
      pendingNotification: false,
    });
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <div className="relative">
      <button
        className="rounded-[50%] bg-orange-100 text-3xl p-3 cursor-pointer btn-ghost hover:bg-orange-200 active:scale-90 transition-transform ease-in-out duration-100 relative aspect-square"
        onClick={() => setOpen(!open)}
      >
        {user?.displayName?.split(" ").map((item) => item.charAt(0)) ?? "AA"}
      </button>
      {data?.pendingNotification && (
        <div className="absolute rounded-[50%] w-3 h-3 top-[5%] right-[5%] bg-red-400"></div>
      )}
      <div ref={ref}>
        <div
          className={`bg-[#feeccc] w-4 h-4 rotate-45 absolute left-1/2 -translate-x-1/2 ${
            open ? "" : "hidden opacity-0 pointer-events-none"
          }`}
        ></div>
        <ul
          className={`menu rounded-box bg-[#feeccc] w-40 absolute right-0 mt-2 shadow-2xl${
            open ? "" : "hidden opacity-0 pointer-events-none"
          }`}
        >
          {items.map((item) => {
            return (
              <li
                className="active:bg-teal-500 focus:bg-teal-500"
                key={item.link}
              >
                <Link
                  className="focus:bg-teal-500 relative"
                  to={item.link}
                  onClick={() => {
                    if (item.link === "/notifications") resetNotifications();
                    item.action?.();
                    setOpen(false);
                  }}
                >
                  {item.title}
                  {data?.pendingNotification &&
                    item.link === "/notifications" && (
                      <div className="absolute rounded-[50%] w-3 h-3 top-1/2 right-[10%] -translate-y-1/2 bg-red-400"></div>
                    )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;

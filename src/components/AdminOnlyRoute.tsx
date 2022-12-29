import { getAuth } from "firebase/auth";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Id, toast } from "react-toastify";
import app from "../util/firebase";

const AdminOnlyRoute = ({ children }: { children: React.ReactElement }) => {
  const [user, loading, error] = useAuthState(getAuth(app));
  const admin = user?.email === "zaposleni@pandica.rs";

  const ref = useRef<Id | null>(null);

  if (loading) return <></>;
  if (!admin) {
    return (
      <div hidden>
        {
          (ref.current =
            ref.current ||
            toast.error("Samo admin ima pristup ovoj stranici!", {
              position: "top-center",
            }))
        }
      </div>
    );
  } else return children;
};

export default AdminOnlyRoute;

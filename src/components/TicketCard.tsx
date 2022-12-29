import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../util/firebase";
import BuyModal from "./BuyModal";
import TextCard from "./TextCard";

const TicketCard = ({
  title,
  children,
  price,
  modalText,
  group = false,
  modalInput = false,
}: {
  title: string;
  children: React.ReactNode;
  price: number;
  group?: boolean;
  modalText: string;
  modalInput?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user] = useAuthState(getAuth(app));

  return (
    <>
      <TextCard title={title} action={handleOpen} guest={user === null}>
        {children}
      </TextCard>
      <BuyModal
        title={title}
        open={open}
        onClose={handleClose}
        input={modalInput}
        text={modalText}
        price={price}
        group={group}
      ></BuyModal>
    </>
  );
};

export default TicketCard;

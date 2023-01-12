import React from "react";

const TextCard = ({
  title,
  children,
  action,
  guest,
}: {
  title: string;
  children: React.ReactNode;
  action?: () => void;
  guest: boolean;
}) => {
  return (
    <div className="card lg:w-96 w-full bg-[#ffeccc] shadow-2xl text-stone-800 text-center">
      <div className="card-body justify-between text-xl">
        <h2 className="card-title justify-center text-3xl">{title}</h2>
        <>{children}</>
        <div className="card-actions justify-center">
          {!guest && (
            <button className="btn btn-accent btn-wide btn-md" onClick={action}>
              Kupi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextCard;

import React from "react";

const CommentCard = ({
  content,
  user,
  date,
}: {
  content: string;
  user: string;
  date: string;
}) => {
  return (
    <div className="card w-full mx-4 bg-[#ffeccc] elevation-sm text-stone-800 self-center">
      <div className="card-body justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="font-medium text-3xl">{user}</h2>
          <span className="text-sm">{date}</span>
        </div>
        <div className="text-lg">{content}</div>
      </div>
    </div>
  );
};

export default CommentCard;

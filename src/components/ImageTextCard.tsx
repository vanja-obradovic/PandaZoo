import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import Like from "../assets/icons/Like";
import app from "../util/firebase";

const ImageTextCard = ({
  title,
  description,
  image,
  likes,
  id,
}: {
  title: string;
  description: string;
  image: string;
  likes: number;
  id: string;
}) => {
  const [user] = useAuthState(getAuth(app));

  const [userData, loadingData, errorData, snaphotData, reload] =
    useDocumentDataOnce(doc(getFirestore(app), `/users/${user?.email}`));

  const handleLike = () => {
    const batch = writeBatch(getFirestore(app));

    if (userData?.likes?.includes(id)) {
      batch.update(doc(getFirestore(app), `events/${id}`), {
        likes: increment(-1),
      });
      batch.update(doc(getFirestore(app), `users/${user?.email}`), {
        likes: arrayRemove(id),
      });
      batch.commit();
      reload();
    } else {
      batch.update(doc(getFirestore(app), `events/${id}`), {
        likes: increment(1),
      });
      batch.update(doc(getFirestore(app), `users/${user?.email}`), {
        likes: arrayUnion(id),
      });
      batch.commit();
      reload();
    }
  };

  return (
    <div className="card w-96 bg-orange-100 shadow-2xl">
      <figure className="h-64">
        <img src={image} alt="" className="object-cover h-full w-full" />
      </figure>
      <div className="card-body pt-4">
        <h2 className="card-title text-2xl text-center mb-4">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end items-center">
          <button
            className="btn btn-square btn-ghost disabled:bg-transparent"
            disabled={!user}
            onClick={handleLike}
          >
            <Like
              className={`h-10 w-10 ${
                userData?.likes?.includes(id) ? "fill-yellow-400" : ""
              }`}
            ></Like>
          </button>
          <span className="text-2xl">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageTextCard;

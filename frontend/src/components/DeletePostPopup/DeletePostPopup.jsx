import ky from "ky";
import "./DeletePostPopup.css";
import { backendUrl } from "../../api/api";
import { useContext, useState } from "react";
import { TokenDataContext } from "../context/Context";

const DeletePostPopup = ({
  postData,
  setDeletePostPopup,
  setPostSettings,
  setUpdUserFeed,
}) => {
  const [deletePostMessage, setDeletePostMessage] = useState("");
  const { token } = useContext(TokenDataContext);
  console.log(postData);
  const deletePostHandler = async (event) => {
    event.preventDefault();

    // setSettingOptionsPopUp((prev) => !prev);

    const res = await ky
      .delete(`${backendUrl}/posts/${postData._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    setDeletePostMessage("Post deleted!");
    setUpdUserFeed((prev) => !prev);
    setTimeout(() => {
      setDeletePostPopup((prev) => !prev);
      setPostSettings((prev) => !prev);
    }, 2000);
  };

  return (
    <div className="delete_popup">
      {!deletePostMessage ? (
        <article>
          <p>Do you really want to delete your post?</p>
          <div>
            <button onClick={deletePostHandler} className="post_settings_btn">
              Delete
            </button>
            <button
              onClick={() => {
                setDeletePostPopup((prev) => !prev);
                setPostSettings((prev) => !prev);
              }}
              className="cancel_delete_btn"
            >
              Cancel
            </button>
          </div>
        </article>
      ) : (
        <p>{deletePostMessage}</p>
      )}
    </div>
  );
};

export default DeletePostPopup;

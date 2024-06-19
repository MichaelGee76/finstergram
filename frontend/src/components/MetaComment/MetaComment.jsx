import ky from "ky";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";
import { TokenDataContext, UserDataContext } from "../context/Context";
import { useContext, useState } from "react";

const MetaComment = ({
  comment,
  reply,
  newcommentAge,
  setReplyMessage,
  postData,
}) => {
  const [crementLike, setCrementLike] = useState(comment.likesCount);
  // liked by user? einfügen
  const [likeToggle, setLikeToggle] = useState();
  const { user } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);

  const likeToggleHandler = async () => {
    if (!likeToggle) {
      const res = await ky
        .post(`${backendUrl}/likes/newLike`, {
          json: { postId: postData._id, commentId: comment._id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      setCrementLike((crementLike) => crementLike + 1);
      setLikeToggle((likeToggle) => !likeToggle);
    } else {
      const res = await ky
        .delete(`${backendUrl}/likes/like`, {
          json: { postId: postData._id, commentId: comment._id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      setCrementLike((crementLike) => crementLike - 1);
      setLikeToggle((likeToggle) => !likeToggle);
    }
  };
  return (
    <div key={reply._id} className="cmnt_wrapper">
      <div>
        <div className="post_upper">
          <Link to={`/profile/${reply.userId._id}`} className="post_user_infos">
            <img src={reply.userId.profilePicture} alt="" />
            <div>
              <h3 className="username_post">{reply.userId.userName}</h3>
              <p className="userdescription_post">{reply.userId.profession}</p>
            </div>
          </Link>
          {user._id === reply.userId._id && (
            <button>
              <img src="./img/MoreCircle.svg" alt="" />
            </button>
          )}
        </div>
        <p>{reply.content}</p>
        <div className="cmnt_bottom">
          <div>
            <img
              onClick={likeToggleHandler}
              src={likeToggle ? "./img/HeartFilled.svg" : "./img/Heart.svg"}
              alt=""
            />
            <p>{crementLike}</p>
          </div>
          <label
            onClick={() =>
              setReplyMessage({
                userName: comment.userId.userName,
                commentId: comment._id,
              })
            }
            htmlFor="postcomment"
          >
            Reply
          </label>
          <p>{newcommentAge.showCommentAge}</p>
        </div>
      </div>
    </div>
  );
};

export default MetaComment;

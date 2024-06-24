import { Link } from "react-router-dom";
import "./Comment.css";
import { useContext, useState } from "react";
import { TokenDataContext, UserDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";
import PostComment from "../PostComment/PostComment";
import MetaComment from "../MetaComment/MetaComment";

const calculateCommentAge = (createdAt) => {
  const commentDate = new Date(createdAt); // Tue May 28 2024 14:10:39 GMT+0200 (Mitteleuropäische Sommerzeit)
  const commentTimeAsTimestamp = Date.parse(commentDate); // 1716898239000
  const commentAge = Date.now() - commentTimeAsTimestamp; // 620037
  const commentAgeInMin = Math.floor(commentAge / 1000 / 60); // 10
  const commentAgeInHours = Math.floor(commentAgeInMin / 60); // 0
  const showCommentAge =
    commentAgeInHours >= 24 * 7
      ? `${Math.floor(commentAgeInHours / 24 / 7)}d`
      : commentAgeInHours >= 24
      ? `${Math.floor(commentAgeInHours / 24)}d`
      : commentAgeInHours >= 1
      ? `${commentAgeInHours}h ago`
      : commentAgeInMin > 1
      ? `${commentAgeInMin}m ago`
      : "just now";

  return { showCommentAge, commentAgeInHours };
};

const Comment = ({ comment, postData, setReplyMessage }) => {
  // liked by user? einfügen
  const [likeToggle, setLikeToggle] = useState(comment.likedByUser);
  // like anzahl einfügen
  const [crementLike, setCrementLike] = useState(comment.likesCount);
  const [showMetaComments, setShowMetaComments] = useState(1);
  const { user } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);

  const newcommentAge = calculateCommentAge(comment?.createdAt);

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
    <div className="cmnt_wrapper">
      <div className="post_upper">
        <Link to={`/profile/${comment.userId._id}`} className="post_user_infos">
          <img src={comment.userId.profilePicture} alt="" />
          <div>
            <h3 className="username_post">{comment.userId.userName}</h3>
            <p className="userdescription_post">{comment.userId.profession}</p>
          </div>
        </Link>
        {user._id === comment.userId._id && (
          <button>
            <img src="/img/MoreCircle.svg" alt="" />
          </button>
        )}
      </div>
      <p>{comment.content}</p>
      <div className="cmnt_bottom">
        <div>
          <img
            onClick={likeToggleHandler}
            src={likeToggle ? "/img/HeartFilled.svg" : "/img/Heart.svg"}
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
      {comment.replies[0] ? (
        <div className="comment_meta_wrapper">
          {comment.replies.slice(0, showMetaComments)?.map((reply) => (
            <MetaComment
              key={reply._id}
              comment={comment}
              reply={reply}
              newcommentAge={newcommentAge}
              setReplyMessage={setReplyMessage}
              postData={postData}
            />
          ))}
          {comment.replies.length > showMetaComments && (
            <button
              className="show_answers"
              onClick={() =>
                setShowMetaComments((showMetaComments) => showMetaComments + 5)
              }
            >
              more answers
            </button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;

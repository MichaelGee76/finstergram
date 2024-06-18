import { useContext, useState } from "react";
import "./PostComment.css";
import { TokenDataContext, UserDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";

const PostComment = ({
  setCommentUpd,
  postId,
  setUpdUserFeed,
  replyMessage,
}) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);
  console.log(replyMessage);

  const postCommentHandler = async (event) => {
    event.preventDefault();
    if (!comment) return;
    if (!replyMessage) {
      const res = await ky
        .post(`${backendUrl}/comments/newComment`, {
          json: { content: comment, userId: user._id, postId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setCommentUpd((commentUpd) => !commentUpd);
      setUpdUserFeed((userFeed) => !userFeed);
      setComment("");
    } else {
      const res = await ky
        .post(`${backendUrl}/comments/newComment`, {
          json: {
            content: comment,
            userId: user._id,
            postId,
            commentId: replyMessage.commentId,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setCommentUpd((commentUpd) => !commentUpd);
      setUpdUserFeed((userFeed) => !userFeed);
      setComment("");
    }
  };
  return (
    <div className="post_cmnt_wrapper">
      <img src={user.profilePicture} alt="" />
      <input
        type="text"
        name=""
        id="postcomment"
        placeholder={
          replyMessage ? `@${replyMessage.userName}` : "Your comment..."
        }
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button onClick={postCommentHandler}>Post</button>
    </div>
  );
};

export default PostComment;

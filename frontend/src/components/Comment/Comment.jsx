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
        {/*   <div>
          <img
            onClick={likeToggleHandler}
            src={likeToggle ? "/img/HeartFilled.svg" : "/img/Heart.svg"}
            alt=""
          />
          <p>{crementLike}</p>
        </div> */}

        <div>
          {likeToggle ? (
            <svg
              onClick={likeToggleHandler}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.4914 2.91742C19.2276 2.91742 19.9626 3.02126 20.6614 3.25576C24.9676 4.65576 26.5193 9.38076 25.2231 13.5108C24.4881 15.6213 23.2864 17.5474 21.7126 19.1213C19.4598 21.3029 16.9876 23.2396 14.3264 24.9079L14.0348 25.0841L13.7314 24.8963C11.0609 23.2396 8.57475 21.3029 6.30092 19.1096C4.73759 17.5358 3.53475 15.6213 2.78809 13.5108C1.46975 9.38076 3.02142 4.65576 7.37425 3.23126C7.71259 3.11459 8.06142 3.03292 8.41142 2.98742H8.55142C8.87925 2.93959 9.20475 2.91742 9.53142 2.91742H9.65975C10.3948 2.93959 11.1064 3.06792 11.7959 3.30242H11.8648C11.9114 3.32459 11.9464 3.34909 11.9698 3.37126C12.2276 3.45409 12.4714 3.54742 12.7048 3.67576L13.1481 3.87409C13.2552 3.93122 13.3755 4.01852 13.4794 4.09397C13.5452 4.14178 13.6045 4.18482 13.6498 4.21242C13.6688 4.22366 13.6881 4.23495 13.7077 4.24634C13.8077 4.30473 13.9119 4.36556 13.9998 4.43292C15.2959 3.44242 16.8698 2.90576 18.4914 2.91742ZM21.5948 11.3174C22.0731 11.3046 22.4814 10.9208 22.5164 10.4296V10.2908C22.5514 8.65626 21.5609 7.17576 20.0548 6.60409C19.5764 6.43959 19.0514 6.69742 18.8764 7.18742C18.7131 7.67742 18.9698 8.21409 19.4598 8.38792C20.2076 8.66792 20.7081 9.40409 20.7081 10.2196V10.2558C20.6859 10.5229 20.7664 10.7808 20.9298 10.9791C21.0931 11.1774 21.3381 11.2929 21.5948 11.3174Z"
                fill="url(#paint0_linear_3509_1646)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3509_1646"
                  x1="25.6666"
                  y1="25.0841"
                  x2="-1.86754"
                  y2="16.6806"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF4D67" />
                  <stop offset="1" stopColor="#FF8A9B" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              onClick={likeToggleHandler}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.4089 14.5207C2.15707 10.6123 3.62124 5.75318 7.7244 4.43251C9.88274 3.73601 12.5462 4.31701 14.0594 6.40418C15.4862 4.24001 18.2267 3.74068 20.3827 4.43251C24.4847 5.75318 25.9571 10.6123 24.7064 14.5207C22.7581 20.7157 15.9599 23.9427 14.0594 23.9427C12.1601 23.9427 5.42257 20.788 3.4089 14.5207Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.42 8.82471C19.8282 8.96937 20.709 10.0859 20.6565 11.6504"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <p>{Number(crementLike)}</p>
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

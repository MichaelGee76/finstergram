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
              {/*   <img src="/img/MoreCircle.svg" alt="" /> */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.0002 3.2085C19.9596 3.2085 24.7919 8.03966 24.7919 14.0002C24.7919 19.9595 19.9596 24.7918 14.0002 24.7918C8.03972 24.7918 3.20856 19.9595 3.20856 14.0002C3.20856 8.04083 8.04089 3.2085 14.0002 3.2085Z"
                  stroke="var(  --main-text)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.596 14.0152H18.6065"
                  stroke="var(  --main-text)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.9188 14.0152H13.9293"
                  stroke="var(  --main-text)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.2416 14.0152H9.2521"
                  stroke="var(  --main-text)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <p>{reply.content}</p>
        <div className="cmnt_bottom">
          {/* <div>
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
                    <stop stopColor="var(--mid-pink)" />
                    <stop offset="1" stopColor="var(--light-pink)" />
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
      </div>
    </div>
  );
};

export default MetaComment;

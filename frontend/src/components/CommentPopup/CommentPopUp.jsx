import { Link } from "react-router-dom";
import "./CommentPopUp.css";
import { useContext, useEffect, useState } from "react";
import { TokenDataContext, UserDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";
import Comment from "../Comment/Comment";
import PostComment from "../PostComment/PostComment";

const CommentPopUp = ({
  postData,
  openPopUpHandler,
  saveToggleHandler,
  likeToggleHandler,
  likeToggle,
  saveToggle,
  crementLike,
  setUpdUserFeed,
}) => {
  const [comments, setComments] = useState([]);
  const [commentUpd, setCommentUpd] = useState(false);
  const [loadMoreComments, setLoadMoreComments] = useState(6);
  const [replyMessage, setReplyMessage] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);

  useEffect(() => {
    const getCommentsFromPost = async () => {
      const res = await ky
        .get(`${backendUrl}/comments/allCommentsFromPost/${postData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setComments(res.result);
    };

    getCommentsFromPost();
  }, [commentUpd]);

  return (
    <section className="cmnt_popup">
      <div className="cmt_upper">
        {/*   <div>
          <img
            onClick={() => openPopUpHandler((commentPopUp) => !commentPopUp)}
            src="/img/BackArrowLeft.svg"
            alt=""
          />
          <h3> Comments</h3>
        </div> */}

        <div>
          <svg
            onClick={() => openPopUpHandler((commentPopUp) => !commentPopUp)}
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3333 8.32007C19.3333 8.76305 19.0042 9.12914 18.5771 9.18708L18.4583 9.19507L0.958342 9.19507C0.475093 9.19507 0.0833422 8.80332 0.0833422 8.32007C0.0833422 7.87709 0.412522 7.511 0.83961 7.45306L0.958342 7.44507L18.4583 7.44507C18.9416 7.44507 19.3333 7.83682 19.3333 8.32007Z"
              fill="var(--main-text)"
            />
            <path
              d="M8.63383 14.7284C8.97628 15.0694 8.97747 15.6234 8.6365 15.9658C8.32652 16.2771 7.84048 16.3064 7.49738 16.053L7.39906 15.9685L0.34073 8.94048C0.0284876 8.62958 8.2657e-05 8.14178 0.255529 7.79869L0.340679 7.70043L7.39901 0.671262C7.74143 0.330261 8.29545 0.331408 8.63645 0.673824C8.94645 0.985111 8.97368 1.47128 8.71881 1.8133L8.63389 1.91126L2.19851 8.32078L8.63383 14.7284Z"
              fill="var(--main-text)"
            />
          </svg>

          <h3> Comments</h3>
        </div>

        <Link style={{ position: "relative" }} to="/chatDashboard">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.4712 9.53707L11.7939 16.2857L4.19934 11.5356C3.11121 10.8548 3.33756 9.20201 4.56834 8.84208L22.5998 3.56156C23.7268 3.23123 24.7713 4.28497 24.4365 5.41566L19.1019 23.4345C18.7365 24.6671 17.0931 24.8873 16.4187 23.7945L11.7903 16.2869"
              stroke="var(--main-text)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <article className="cmt_userinfos">
        <div className="post_upper">
          <Link
            to={`/profile/${postData.userId._id}`}
            className="post_user_infos"
          >
            <img src={postData.userId.profilePicture} alt="" />
            <div>
              <h3 className="username_post">{postData.userId.userName}</h3>
              <p className="userdescription_post">
                {postData.userId.profession}
              </p>
            </div>
          </Link>
          {user._id === postData.userId._id && (
            <button>
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
                  stroke="var(--main-text)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.596 14.0152H18.6065"
                  stroke="var(--main-text)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.9188 14.0152H13.9293"
                  stroke="var(--main-text)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.2416 14.0152H9.2521"
                  stroke="var(--main-text)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <p className="post_desctext">{postData.description}</p>
        <div className="hashtags_wrapper">
          {postData.hashtags?.map((hashtag, index) => (
            <Link key={index} to={`/search/${hashtag}`}>
              #{hashtag}
            </Link>
          ))}
        </div>
        <div className="post_date_wrapper">
          <p>{postData.location}</p>
          <p className="posted_date">{postData.postDate.showPostAge}</p>
        </div>
        <div className="post_reactions">
          <div>
            <img
              onClick={saveToggleHandler}
              src={saveToggle ? "/img/SaveClicked.svg" : "/img/Save.svg"}
              alt=""
            />
          </div>

          <div>
            <img
              onClick={likeToggleHandler}
              src={likeToggle ? "/img/HeartFilled.svg" : "/img/Heart.svg"}
              alt=""
            />

            <p>{Number(crementLike)}</p>
          </div>
          <div>
            {/*    <img src="/img/Comments.svg" alt="" /> */}
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
                d="M22.2499 22.2481C18.6844 25.814 13.4047 26.5844 9.08413 24.5863C8.4463 24.3295 7.92338 24.1219 7.42625 24.1219C6.04155 24.1301 4.31801 25.4728 3.42223 24.5781C2.52646 23.6822 3.87012 21.9573 3.87012 20.5642C3.87012 20.067 3.6708 19.5534 3.41403 18.9144C1.41495 14.5945 2.18644 9.31305 5.75195 5.74833C10.3035 1.19509 17.6983 1.19509 22.2499 5.74715C26.8097 10.3074 26.8015 17.696 22.2499 22.2481Z"
                stroke="var( --main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.596 14.4818H18.6065"
                stroke="var( --main-text)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.9188 14.4818H13.9293"
                stroke="var( --main-text)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.2416 14.4818H9.2521"
                stroke="var( --main-text)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>{postData.comments}</p>
          </div>
        </div>
      </article>
      <section className="cmnt_section">
        {comments.length > 0 ? (
          comments
            .slice(0, loadMoreComments)
            ?.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                postData={postData}
                setReplyMessage={setReplyMessage}
              />
            ))
        ) : (
          <p>No comments yet. Be the first one to leave a comment!</p>
        )}
        {comments.length >= loadMoreComments && (
          <button
            onClick={() =>
              setLoadMoreComments((loadMoreComments) => loadMoreComments + 5)
            }
            className="more_cmnts_btn"
          >
            more comments
          </button>
        )}
      </section>
      <PostComment
        setCommentUpd={setCommentUpd}
        postId={postData._id}
        setUpdUserFeed={setUpdUserFeed}
        replyMessage={replyMessage}
      />
    </section>
  );
};

export default CommentPopUp;

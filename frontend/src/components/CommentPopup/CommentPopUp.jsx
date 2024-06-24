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
        <div>
          <img
            onClick={() => openPopUpHandler((commentPopUp) => !commentPopUp)}
            src="/img/BackArrowLeft.svg"
            alt=""
          />
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
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.0002 3.2085C19.9596 3.2085 24.7919 8.03966 24.7919 14.0002C24.7919 19.9595 19.9596 24.7918 14.0002 24.7918C8.03972 24.7918 3.20856 19.9595 3.20856 14.0002C3.20856 8.04083 8.04089 3.2085 14.0002 3.2085Z"
                  stroke="var(--main-text)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.596 14.0152H18.6065"
                  stroke="#212121"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.9188 14.0152H13.9293"
                  stroke="#212121"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.2416 14.0152H9.2521"
                  stroke="#212121"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
            <img src="/img/Comments.svg" alt="" />

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

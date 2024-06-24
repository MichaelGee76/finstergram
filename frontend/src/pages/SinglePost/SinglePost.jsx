import { Link, useNavigate, useParams } from "react-router-dom";
import "./SinglePost.css";
import { useContext, useEffect, useState } from "react";
import ky from "ky";
import { backendUrl } from "../../api/api";
import {
  TokenDataContext,
  UserDataContext,
} from "../../components/context/Context";
import PostSettings from "../../components/PostSettings/PostSettings";
import PostComment from "../../components/PostComment/PostComment";
import Comment from "../../components/Comment/Comment";

const calculatePostAge = (createdAt) => {
  const postDate = new Date(createdAt);
  const postTimeAsTimestamp = Date.parse(postDate);
  const postAge = Date.now() - postTimeAsTimestamp;
  const postAgeInMin = Math.floor(postAge / 1000 / 60);
  const postAgeInHours = Math.floor(postAgeInMin / 60);
  const showPostAge =
    postAgeInHours >= 24 * 7
      ? `${Math.floor(postAgeInHours / 24 / 7)}d`
      : postAgeInHours >= 24
      ? `${Math.floor(postAgeInHours / 24)}d`
      : postAgeInHours >= 1
      ? `${postAgeInHours}h ago`
      : postAgeInMin > 1
      ? `${postAgeInMin}m ago`
      : "just now";

  return { showPostAge, postAgeInHours };
};

const SinglePost = () => {
  const [updUserFeed, setUpdUserFeed] = useState(false);
  const [commentUpd, setCommentUpd] = useState(false);
  const [loadMoreComments, setLoadMoreComments] = useState(6);
  const [replyMessage, setReplyMessage] = useState("");
  const [postData, setPostData] = useState();
  const [likeToggle, setLikeToggle] = useState();
  const [saveToggle, setSaveToggle] = useState();
  const [crementLike, setCrementLike] = useState();
  const { token } = useContext(TokenDataContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  const { postId } = useParams();

  useEffect(() => {
    const getOnePostHandler = async () => {
      const res = await ky
        .get(`${backendUrl}/posts/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setPostData(res.result);

      setLikeToggle(res.result.likedByUser);
      setSaveToggle(res.result.savedByUser);
      setCrementLike(res.result.likes || 0);
    };

    getOnePostHandler();
  }, []);

  const saveToggleHandler = async () => {
    if (!saveToggle) {
      await ky
        .post(`${backendUrl}/save/${postData.post._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      setSaveToggle((saveToggle) => !saveToggle);
    } else {
      await ky
        .delete(`${backendUrl}/save/${postData.post._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      setSaveToggle((saveToggle) => !saveToggle);
    }
  };

  const likeToggleHandler = async () => {
    if (!likeToggle) {
      await ky
        .post(`${backendUrl}/likes/newLike`, {
          json: { postId: postData.post._id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      const newLikes = crementLike + 1;
      setCrementLike(newLikes);
      setLikeToggle((likeToggle) => !likeToggle);
      updateLikes(postData._id, newLikes);
    } else {
      await ky
        .delete(`${backendUrl}/likes/like`, {
          json: { postId: postData.post._id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      const newLikes = crementLike - 1;
      setCrementLike(newLikes);
      setLikeToggle((likeToggle) => !likeToggle);
      updateLikes(postData._id, newLikes);
    }
  };

  const newPostAge = calculatePostAge(postData?.post.createdAt);

  console.log(postData);
  return (
    postData && (
      <main className="single_post_sec">
        <img
          className="single_post_back"
          onClick={() => navigate(-1)}
          src="/img/BackArrowLeft.svg"
          alt=""
        />
        <article className="post_wrapper">
          <div className="post_upper">
            <Link
              to={`/profile/${postData.post.userId._id}`}
              className="post_user_infos"
            >
              <img src={postData.post.userId.profilePicture} alt="" />
              <div>
                <h3 className="username_post">
                  {postData.post.userId.userName}
                </h3>
                <p className="userdescription_post">
                  {postData.post.userId.profession}
                </p>
              </div>
            </Link>
            {user._id === postData.post.userId._id && (
              <PostSettings
                postData={postData.post}
                setUpdUserFeed={setUpdUserFeed}
              />
            )}
          </div>

          <img className="post_img" src={postData.post.picture} alt="" />

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
              <p>{crementLike}</p>
            </div>
            <div>
              <img src="/img/Comments.svg" alt="" />
              <p>{postData.comments || 0}</p>
            </div>
          </div>
          <article className="cmt_userinfos">
            <p className="post_desctext">{postData.post.description}</p>
            <div className="hashtags_wrapper">
              {postData.post.hashtags?.map((hashtag, index) => (
                <Link key={index} to={`/search/${hashtag}`}>
                  #{hashtag}
                </Link>
              ))}
            </div>
            <div className="post_date_wrapper">
              <p>{postData.post.location}</p>
              <p className="posted_date">{newPostAge.showPostAge}</p>
            </div>
          </article>
          <section className="cmnt_section">
            {postData.commentDetails.length > 0 ? (
              postData.commentDetails
                .slice(0, loadMoreComments)
                ?.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    postData={postData.post}
                    setReplyMessage={setReplyMessage}
                  />
                ))
            ) : (
              <p>No comments yet. Be the first one to leave a comment!</p>
            )}
            {postData.commentDetails.length >= loadMoreComments && (
              <button
                onClick={() =>
                  setLoadMoreComments(
                    (loadMoreComments) => loadMoreComments + 5
                  )
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
        </article>
      </main>
    )
  );
};

export default SinglePost;

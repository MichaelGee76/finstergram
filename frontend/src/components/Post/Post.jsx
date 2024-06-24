import { Link } from "react-router-dom";
import "./Post.css";
import { useContext, useState } from "react";
import { TokenDataContext, UserDataContext } from "../context/Context";
import { backendUrl } from "../../api/api";
import ky from "ky";
import CommentPopUp from "../CommentPopup/CommentPopUp";
import PostSettings from "../PostSettings/PostSettings";
import DiscoverPostPopup from "../DiscoverPostPopup/DiscoverPostPopup";

const calculatePostAge = (createdAt) => {
  const postDate = new Date(createdAt);
  const postTimeAsTimestamp = Date.parse(postDate);
  const postAge = Date.now() - postTimeAsTimestamp;
  const postAgeInMin = Math.floor(postAge / 1000 / 60);
  const postAgeInHours = Math.floor(postAgeInMin / 60);
  const showPostAge =
    postAgeInHours >= 24
      ? `${Math.floor(postAgeInHours / 24)}d`
      : postAgeInHours >= 1
      ? `${postAgeInHours} hours ago`
      : postAgeInMin > 1
      ? `${postAgeInMin} min ago`
      : "just now";

  return { showPostAge, postAgeInHours };
};

const Post = ({
  postData,
  setUpdUserFeed,
  setFixBg,
  setChangeHeaderZ,
  discoverFeed,
  updateLikes,
  updateComments,
}) => {
  const [likeToggle, setLikeToggle] = useState(postData.likedByUser);
  const [crementLike, setCrementLike] = useState(postData.likes || 0); // Ensure likes is a number
  const [saveToggle, setSaveToggle] = useState(postData.savedByUser);
  const [commentPopUp, setCommentPopUp] = useState(false);
  const [openDiscoverFeed, setOpenDiscoverFeed] = useState(false);
  const { user } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);

  const saveToggleHandler = async () => {
    try {
      if (!saveToggle) {
        await ky
          .post(`${backendUrl}/save/${postData._id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
      } else {
        await ky
          .delete(`${backendUrl}/save/${postData._id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
      }
      setSaveToggle((prev) => !prev);
      setUpdUserFeed();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const likeToggleHandler = async () => {
    try {
      if (!likeToggle) {
        await ky
          .post(`${backendUrl}/likes/newLike`, {
            json: { postId: postData._id },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
        const newLikes = crementLike + 1;
        setCrementLike(newLikes);
        setLikeToggle((prev) => !prev);
        updateLikes(postData._id, newLikes);
      } else {
        await ky
          .delete(`${backendUrl}/likes/like`, {
            json: { postId: postData._id },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
        const newLikes = crementLike - 1;
        setCrementLike(newLikes);
        setLikeToggle((prev) => !prev);
        updateLikes(postData._id, newLikes);
      }
      setUpdUserFeed();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const newPostAge = calculatePostAge(postData?.createdAt);

  const openPopUpHandler = async () => {
    setCommentPopUp((prev) => !prev);
    setFixBg((prev) => !prev);
  };

  return (
    <>
      {commentPopUp && (
        <CommentPopUp
          postData={{ ...postData, postDate: newPostAge }}
          openPopUpHandler={openPopUpHandler}
          saveToggleHandler={saveToggleHandler}
          likeToggleHandler={likeToggleHandler}
          likeToggle={likeToggle}
          saveToggle={saveToggle}
          crementLike={crementLike}
          setUpdUserFeed={setUpdUserFeed}
        />
      )}
      {openDiscoverFeed && (
        <DiscoverPostPopup
          postData={{ ...postData, postDate: newPostAge }}
          openPopUpHandler={openPopUpHandler}
          saveToggleHandler={saveToggleHandler}
          likeToggleHandler={likeToggleHandler}
          likeToggle={likeToggle}
          saveToggle={saveToggle}
          crementLike={crementLike}
          setUpdUserFeed={setUpdUserFeed}
          setChangeHeaderZ={setChangeHeaderZ}
          setOpenDiscoverFeed={setOpenDiscoverFeed}
          discoverFeed={discoverFeed}
        />
      )}
      <article className="post_wrapper">
        {!discoverFeed && (
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
              <PostSettings
                postData={postData}
                setUpdUserFeed={setUpdUserFeed}
              />
            )}
          </div>
        )}

        <img
          onClick={() => {
            if (discoverFeed) {
              setChangeHeaderZ((prev) => !prev);
              setOpenDiscoverFeed((prev) => !prev);
            }
          }}
          className={!discoverFeed ? "post_img" : "discoverFeed_img"}
          src={postData.picture}
          alt=""
        />
        {!discoverFeed && (
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
            <div onClick={openPopUpHandler}>
              <img src="/img/Comments.svg" alt="" />
              <p>{postData.comments || 0}</p>
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default Post;

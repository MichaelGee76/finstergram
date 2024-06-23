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
  const postDate = new Date(createdAt); // Tue May 28 2024 14:10:39 GMT+0200 (Mitteleuropäische Sommerzeit)
  const postTimeAsTimestamp = Date.parse(postDate); // 1716898239000
  const postAge = Date.now() - postTimeAsTimestamp; // 620037
  const postAgeInMin = Math.floor(postAge / 1000 / 60); // 10
  const postAgeInHours = Math.floor(postAgeInMin / 60); // 0
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
  changeHeaderZ,
  discoverFeed,
}) => {
  const [likeToggle, setLikeToggle] = useState(postData.likedByUser);
  const [crementLike, setCrementLike] = useState(postData.likes);
  const [saveToggle, setSaveToggle] = useState(postData.savedByUser);
  const [commentPopUp, setCommentPopUp] = useState(false);
  const [openDiscoverFeed, setOpenDiscoverFeed] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);

  const saveToggleHandler = async () => {
    if (!saveToggle) {
      const res = await ky
        .post(`${backendUrl}/save/${postData._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setSaveToggle((saveToggle) => !saveToggle);
    } else {
      const res = await ky
        .delete(`${backendUrl}/save/${postData._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setSaveToggle((saveToggle) => !saveToggle);
    }
  };

  console.log(postData);

  const likeToggleHandler = async () => {
    if (!likeToggle) {
      const res = await ky
        .post(`${backendUrl}/likes/newLike`, {
          json: { postId: postData._id },
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
          json: { postId: postData._id },
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

  const newPostAge = calculatePostAge(postData?.createdAt);

  const openPopUpHandler = async () => {
    setCommentPopUp((commentPopUp) => !commentPopUp);
    setFixBg((fixBg) => !fixBg);
  };

  // console.log(discoverFeed);

  // console.log(commentPopUp);
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
              // openPopUpHandler();
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

              <p>{Number(crementLike)}</p>
            </div>
            <div onClick={openPopUpHandler}>
              <img src="/img/Comments.svg" alt="" />

              <p>{postData.comments}</p>
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default Post;

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

const Post = ({
  postData,
  setUpdUserFeed,
  setFixBg,
  setChangeHeaderZ,
  discoverFeed,
  updateLikes,
  updateComments,
  linkToSinglePost,
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
      <article id={postData._id} className="post_wrapper">
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
                  {postData.userId.profession && postData.userId.profession}
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
              {saveToggle ? (
                <svg
                  onClick={saveToggleHandler}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.9628 3.12524C6.97905 3.12524 5.6303 4.29024 5.6303 13.6615C5.6303 24.1527 5.43405 26.8752 7.42905 26.8752C9.4228 26.8752 12.6791 22.2702 14.9628 22.2702C17.2466 22.2702 20.5028 26.8752 22.4966 26.8752C24.4916 26.8752 24.2953 24.1527 24.2953 13.6615C24.2953 4.29024 22.9466 3.12524 14.9628 3.12524Z"
                    fill="url(#paint0_linear_3509_2241)"
                  />
                  <path
                    d="M10.7142 11.7251H19.283"
                    stroke="var(--main-background)"
                    strokeWidth="1.60714"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3509_2241"
                      x1="5.89286"
                      y1="15.5359"
                      x2="24.1071"
                      y2="15.5359"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="var(--light-pink)" />
                      <stop offset="1" stopColor="var(--mid-pink)" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <svg
                  onClick={saveToggleHandler}
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.96619 10.754H17.9637"
                    stroke="var(--main-text)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.9653 2.91675C6.51378 2.91675 5.25495 4.00408 5.25495 12.7506C5.25495 22.5424 5.07178 25.0834 6.93378 25.0834C8.79462 25.0834 11.8338 20.7854 13.9653 20.7854C16.0968 20.7854 19.1359 25.0834 20.9968 25.0834C22.8588 25.0834 22.6756 22.5424 22.6756 12.7506C22.6756 4.00408 21.4168 2.91675 13.9653 2.91675Z"
                    stroke="var(--main-text)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
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

              <p>{crementLike}</p>
            </div>
            {linkToSinglePost ? (
              <Link to={`/singlepost/${postData._id}`}>
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
                    stroke="var(--main-text)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.596 14.4818H18.6065"
                    stroke="var(--main-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.9188 14.4818H13.9293"
                    stroke="var(--main-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.2416 14.4818H9.2521"
                    stroke="var(--main-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>{postData.comments || 0}</p>
              </Link>
            ) : (
              <div onClick={openPopUpHandler}>
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
                    stroke="var(--main-text)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.596 14.4818H18.6065"
                    stroke="var(--main-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.9188 14.4818H13.9293"
                    stroke="var(--main-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.2416 14.4818H9.2521"
                    stroke="var(--main-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p>{postData.comments || 0}</p>
              </div>
            )}
          </div>
        )}
      </article>
    </>
  );
};

export default Post;

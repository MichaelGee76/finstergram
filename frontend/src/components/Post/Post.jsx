import { Link } from "react-router-dom";
import "./Post.css";
import { useContext, useState } from "react";
import { TokenDataContext, UserDataContext } from "../context/Context";
import { backendUrl } from "../../api/api";

const Post = ({ postData }) => {
  const [likeToggle, setLikeToggle] = useState(postData.likedByUser);
  const [saveToggle, setSaveToggle] = useState(postData.savedByUser);
  const { user, setUser } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);
  console.log(postData.userId._id);
  console.log(user);

  const saveToggleHandler = async () => {
    if (postData.savedByUser) {
      const res = await ky
        .post(`${backendUrl}/likepost`, {
          json: { postId: postData._id, userId: user._id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setSaveToggle(true);
    } else {
      const res = await ky
        .post(`${backendUrl}/unlikepost`, {
          json: { postId: postData._id, userId: user._id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
    }
  };
  return (
    <article className="post_wrapper">
      <div className="post_upper">
        <Link
          to={`/profile/${postData.userId._id}`}
          className="post_user_infos"
        >
          <img src={postData.userId.profilePicture} alt="" />
          <div>
            <h3 className="username_post">{postData.userId.userName}</h3>
            <p className="userdescription_post">{postData.userId.profession}</p>
          </div>
        </Link>
        {user._id === postData.userId._id && (
          <button>
            <img src="./img/MoreCircle.svg" alt="" />
          </button>
        )}
      </div>
      <img className="post_img" src={postData.picture} alt="" />
      <div className="post_reactions">
        <div>
          <img
            onClick={saveToggleHandler}
            src={
              postData.savedByUser ? "./img/SaveClicked.svg" : "./img/Save.svg"
            }
            alt=""
          />
        </div>
        <div>
          <img
            src={
              postData.likedByUser ? "./img/HeartFilled.svg" : "./img/Heart.svg"
            }
            alt=""
          />

          <p>{postData.likes}</p>
        </div>
        <div>
          <img src="./img/Comments.svg" alt="" />

          <p>{postData.comments}</p>
        </div>
      </div>
    </article>
  );
};

export default Post;

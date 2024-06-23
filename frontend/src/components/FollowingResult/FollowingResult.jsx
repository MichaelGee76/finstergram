import { useContext, useState } from "react";
import "./FollowingResult.css";
import { Link } from "react-router-dom";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../context/Context";

const FollowingResult = ({ iAmFollowing }) => {
  const [followUpdate, setFollowUpdate] = useState(iAmFollowing.isFollowed);
  const { token } = useContext(TokenDataContext);

  const postFollowing = async (userId) => {
    const res = await ky
      .post(`${backendUrl}/follow/newfollow/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    setFollowUpdate(true);
  };

  const deleteFollowing = async (userId) => {
    const res = await ky
      .delete(`${backendUrl}/follow/follow/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    setFollowUpdate(false);
  };

  return (
    <div className="post_upper search_res_div">
      <Link to={`/profile/${iAmFollowing.followedId._id}`} className="post_user_infos">
        <img src={iAmFollowing.followedId.profilePicture} alt="profile-Picture" />
        <div>
          <h3 className="username_post">{iAmFollowing.followedId.userName}</h3>
          <p className="userdescription_post">{iAmFollowing.followedId.profession}</p>
        </div>
      </Link>
      {followUpdate ? (
        <button
          onClick={() => deleteFollowing(iAmFollowing.followedId._id)}
          className="post_upper button unfollow_btn"
        >
          Following
        </button>
      ) : (
        <button
          onClick={() => postFollowing(iAmFollowing.followedId._id)}
          className="post_upper button follow_btn"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowingResult;

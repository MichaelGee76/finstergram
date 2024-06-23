import { useContext, useState } from "react";
import "./FollowerResult.css";
import { Link } from "react-router-dom";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../context/Context";

const FollowerResult = ({ myFollower, handleFollowUpdate }) => {
  const [followUpdate, setFollowUpdate] = useState(myFollower.isFollowed);
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
    handleFollowUpdate();
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
    handleFollowUpdate();
  };

  return (
    <div className="post_upper search_res_div">
      <Link to={`/profile/${myFollower.userId._id}`} className="post_user_infos">
        <img src={myFollower.userId.profilePicture} alt="profile-Picture" />
        {console.log(myFollower)}
        <div>
          <h3 className="username_post">{myFollower.userId.userName}</h3>
          <p className="userdescription_post">{myFollower.userId.profession}</p>
        </div>
      </Link>

      {followUpdate ? (
        <button onClick={() => deleteFollowing(myFollower.userId._id)} className="post_upper button unfollow_btn">
          Following
        </button>
      ) : (
        <button onClick={() => postFollowing(myFollower.userId._id)} className="post_upper button follow_btn ">
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowerResult;

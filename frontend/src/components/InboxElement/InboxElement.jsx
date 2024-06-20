import { Link } from "react-router-dom";
import FollowBtn from "../FollowBtn/FollowBtn";
import { useState } from "react";

const calculatePostAge = (createdAt) => {
  const postDate = new Date(createdAt); // Tue May 28 2024 14:10:39 GMT+0200 (Mitteleuropäische Sommerzeit)
  const postTimeAsTimestamp = Date.parse(postDate); // 1716898239000
  const postAge = Date.now() - postTimeAsTimestamp; // 620037
  const postAgeInMin = Math.floor(postAge / 1000 / 60); // 10
  const postAgeInHours = Math.floor(postAgeInMin / 60); // 0
  const showPostAge =
    postAgeInHours >= 1
      ? `${postAgeInHours} hours ago`
      : postAgeInMin > 1
      ? `${postAgeInMin} min ago`
      : "just now";

  return { showPostAge, postAgeInHours };
};

const InboxElement = ({ element }) => {
  // console.log("element", element);
  const [followToggle, setFollowToggle] = useState(element.isFollowed);

  const newPostAge = calculatePostAge(element?.createdAt);

  return element.postId ? (
    <div className="single_inbox_element">
      <div>
        {!element.inboxSeen && <div className="inbox_dot"></div>}
        <Link to={`profile/${element.userId._id}`}>
          <img
            className="inbox_profileimg"
            src={element.userId.profilePicture}
            alt=""
          />
        </Link>
        <div className="inbox_user_wrapper">
          <p>
            <span className="inbox_username">{element.userId.userName}</span>
            {element.type === "comment"
              ? ` liked your comment`
              : ` liked your Post`}
          </p>
          <p className="inbox_post_date">{newPostAge.showPostAge}</p>
        </div>
      </div>
      <Link to={`profile/${element.userId._id}`}>
        <img className="inbox_postimg" src={element.postId.picture} alt="" />
      </Link>
    </div>
  ) : (
    <div className="newfollow_btn">
      <div className="inbox_follow_wrapper" key={element._id}>
        {!element.inboxSeen && <div className="inbox_dot"></div>}
        <Link to={`profile/${element.userId._id}`}>
          <img
            className="inbox_profileimg"
            src={element.userId.profilePicture}
            alt=""
          />
        </Link>
        <div className="inbox_user_wrapper">
          <p>
            <span className="inbox_username">
              {element.userId.userName + " "}
            </span>
            follows you
          </p>
          <p className="inbox_post_date">{newPostAge.showPostAge}</p>
        </div>
      </div>
      {!followToggle ? (
        <FollowBtn
          result={element}
          followToggle={followToggle}
          setFollowToggle={setFollowToggle}
        >
          Follow
        </FollowBtn>
      ) : (
        <FollowBtn
          result={element}
          followToggle={followToggle}
          setFollowToggle={setFollowToggle}
        >
          Following
        </FollowBtn>
      )}
    </div>
  );
};

export default InboxElement;

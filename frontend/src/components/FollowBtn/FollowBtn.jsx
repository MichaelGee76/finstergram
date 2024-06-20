import { useContext } from "react";
import "./FollowBtn.css";
import { TokenDataContext, UserDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";

const FollowBtn = ({ followToggle, setFollowToggle, result, children }) => {
  const { token } = useContext(TokenDataContext);
  const { user } = useContext(UserDataContext);

  console.log(result);

  const followHandler = async () => {
    if (!followToggle) {
      const res = await ky
        .post(
          `${backendUrl}/follow/newfollow/${
            result.userId ? result.userId._id : result._id
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .json();
      setFollowToggle((followToggle) => !followToggle);
    } else {
      const res = await ky
        .delete(
          `${backendUrl}/follow/follow/${
            result.userId ? result.userId._id : result._id
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .json();

      setFollowToggle((followToggle) => !followToggle);
    }
  };

  return (
    <button
      onClick={followHandler}
      className={!followToggle ? `follow_btn` : "unfollow_btn"}
    >
      {children}
    </button>
  );
};

export default FollowBtn;

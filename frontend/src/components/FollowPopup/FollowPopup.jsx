import { useEffect, useState } from "react";
import "./FollowPopup.css";
import ky from "ky";
import { backendUrl } from "../../api/api";

import FollowerResult from "../FollowerResult/FollowerResult";
import FollowingResult from "../FollowingResult/FollowingResult";

const FollowPopup = ({ showFollowerPopUp, userProfile, token, id, setFollow, postFollowing, deleteFollowing }) => {
  const [followMe, setFollowMe] = useState([]);
  const [iFollow, setIFollow] = useState([]);
  const [changePopup, setChangePopup] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);
  const [activeslide, setActiveSlide] = useState("follower");

  useEffect(() => {
    const userFetch = async () => {
      const res = await ky
        .get(`${backendUrl}/follow/${id}`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        })
        .json();

      setFollowMe(res.result.myFollower);
      setIFollow(res.result.iAmFollowing);
    };
    userFetch();
  }, []);

  console.log(changePopup);
  console.log(iFollow);
  console.log(followMe);

  return followMe && iFollow ? (
    <section className="follow_popup">
      <div className="follow_popup_inner">
        <svg
          onClick={showFollowerPopUp}
          width="20"
          height="17"
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3333 8.32007C19.3333 8.76305 19.0042 9.12914 18.5771 9.18708L18.4583 9.19507L0.958342 9.19507C0.475093 9.19507 0.0833422 8.80332 0.0833422 8.32007C0.0833422 7.87709 0.412522 7.511 0.83961 7.45306L0.958342 7.44507L18.4583 7.44507C18.9416 7.44507 19.3333 7.83682 19.3333 8.32007Z"
            fill="#212121"
          />
          <path
            d="M8.63383 14.7284C8.97628 15.0694 8.97747 15.6234 8.6365 15.9658C8.32652 16.2771 7.84048 16.3064 7.49738 16.053L7.39906 15.9685L0.34073 8.94048C0.0284876 8.62958 8.2657e-05 8.14178 0.255529 7.79869L0.340679 7.70043L7.39901 0.671262C7.74143 0.330261 8.29545 0.331408 8.63645 0.673824C8.94645 0.985111 8.97368 1.47128 8.71881 1.8133L8.63389 1.91126L2.19851 8.32078L8.63383 14.7284Z"
            fill="#212121"
          />
        </svg>

        <div className="toggle_change ">
          <h3 className="tab" onClick={() => setChangePopup(true)}>
            Follower
          </h3>
          <h3 className="tab" onClick={() => setChangePopup(false)}>
            Gefolgt
          </h3>
        </div>

        {changePopup ? (
          <div className="search_results">
            {followMe.map((myFollower, index) => (
              <FollowerResult myFollower={myFollower} key={index} />
            ))}
          </div>
        ) : (
          <div className="search_results">
            {iFollow.map((iAmFollowing, index) => (
              <FollowingResult iAmFollowing={iAmFollowing} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  ) : (
    <div>loading...</div>
  );
};

export default FollowPopup;

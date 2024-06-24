import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import EditPopup from "../../components/EditPopup/EditPopup";
import { Link, useParams } from "react-router-dom";
import ProfilPosts from "../../components/ProfilPosts/ProfilPosts";
import ky from "ky";
import { TokenDataContext, UserDataContext } from "../../components/context/Context";
import { backendUrl } from "../../api/api";
import ProfilPostsList from "../../components/ProfilPostsList/ProfilPostsList";
import FollowPopup from "../../components/FollowPopup/FollowPopup";
import SettingsPopup from "../../components/SettingsPopup/SettingsPopup";

const Profile = () => {
  const { token } = useContext(TokenDataContext);
  const { user } = useContext(UserDataContext);

  const [activeSection, setActiveSection] = useState("posts");

  const [isUser, setIsUser] = useState(false);

  // * states for fetch
  const [posts, setPosts] = useState();
  const [userProfile, setUserProfile] = useState();
  const [updateFollowers, setUpdateFollowers] = useState(false);
  const [follow, setFollow] = useState();

  const { id } = useParams();

  // * Toggle PopUp for edit user
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => {
    setEditPopup(!editPopup);
  };
  // * Toggle PopUp for post list
  const [popupList, setPopupList] = useState(false);
  const [updProfilFeed, setUpdProfilFeed] = useState(false);

  // * Toggle PopUp for follower list
  const [followerPopUp, setFollowerPopUp] = useState(false);
  const [popupTab, setPopupTab] = useState(true);
  const showFollowerPopUp = (isFollower = true) => {
    setPopupTab(isFollower); // <-- Setze den aktiven Tab beim Öffnen des Popups
    setFollowerPopUp(!followerPopUp);
  };

  //settingPopup toggle für settings
  const [settingsPopup, setSettingsPopup] = useState(false);

  const settingTogglePopup = () => {
    setSettingsPopup((settingsPopup) => !settingsPopup);
  };

  // * numbers format change if it is 5 digit - for follower number
  const formatNumber = (num) => {
    if (num >= 10000) {
      return `${Math.floor(num / 1000)}.${String(num).slice(-3)}k`;
    }
    return num.toString();
  };

  // * fetch for posts which contains also user datas
  useEffect(() => {
    const getUserPosts = async () => {
      const res = await ky
        .get(`${backendUrl}/posts/userPosts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      setPosts(res.result.posts);
      setUserProfile(res.result);
      setFollow(res.result.isFollowed);
    };
    if (user._id === id) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
    getUserPosts();
  }, [updProfilFeed, updateFollowers]);

  const postFollowing = async (userId) => {
    const res = await ky
      .post(`${backendUrl}/follow/newfollow/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    setFollow(true);
    setUpdateFollowers(!updateFollowers);
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
    setFollow(false);
    setUpdateFollowers(!updateFollowers);
  };

  return userProfile ? (
    <section className="profile">
      {/*//! (Logo TOGGLE -> Back Arrow), Username */}

      <div className="profile_top">
        <div className="profile_title">
          {isUser ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="12" fill="url(#paint0_linear_3509_1537)" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0195 6.44865C10.8386 6.86976 7.34856 10.0646 6.54184 14.2091C6.35423 15.1728 6.35255 16.8065 6.53807 17.7588C7.491 22.6495 12.0369 26.0596 16.9235 25.5494C18.3501 25.4004 19.723 24.958 20.8779 24.2751C23.2401 22.8783 24.9336 20.4709 25.462 17.7588C25.6475 16.8065 25.6458 15.1728 25.4582 14.2091C24.5075 9.32525 19.9677 5.95023 15.0195 6.44865ZM17.0247 11.312C18.3438 11.5843 19.7214 12.6714 20.3045 13.9002C20.6609 14.651 20.7874 15.208 20.7857 16.0191C20.7811 18.2199 19.3219 20.0862 17.169 20.6446C16.4603 20.8285 15.146 20.781 14.4777 20.5474C12.1606 19.7375 10.8091 17.3624 11.3052 14.9722C11.6511 13.3061 13.1737 11.7448 14.8471 11.3404C15.4025 11.2062 16.4464 11.1926 17.0247 11.312ZM15.1034 13.2669C13.9257 13.6343 13.1447 14.7216 13.1447 15.994C13.1447 16.8322 13.3891 17.4237 13.9778 18.0108C14.5665 18.5979 15.1596 18.8417 16 18.8417C16.8404 18.8417 17.4336 18.5979 18.0223 18.0108C18.6074 17.4273 18.856 16.83 18.8541 16.0118C18.8525 15.3091 18.769 15.1456 18.5678 15.4517C18.395 15.7147 17.8286 15.9896 17.4542 15.9922C16.6919 15.9975 16 15.3148 16 14.5575C16 14.2031 16.3022 13.5911 16.5605 13.4223C16.716 13.3207 16.7391 13.2712 16.6559 13.2185C16.4886 13.1128 15.499 13.1437 15.1034 13.2669Z"
                fill="#FAFAFA"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3509_1537"
                  x1="32"
                  y1="32"
                  x2="-6.07713"
                  y2="20.9599"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF4D67" />
                  <stop offset="1" stopColor="#FF8A9B" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.history.back();
              }}
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
          )}

          <h1>{userProfile.userData.userName}</h1>
        </div>

        {/*//!  Post, Edit, (Settings TOGGLE -> Only Settings) */}
        <div className="profile_nav">
          {isUser && (
            <div>
              <Link to={"/upload"}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.043 9.87305V18.2129"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.2171 14.043H9.86865"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.68335 14.043C2.68335 5.52388 5.52388 2.68335 14.043 2.68335C22.5621 2.68335 25.4026 5.52388 25.4026 14.043C25.4026 22.5621 22.5621 25.4026 14.043 25.4026C5.52388 25.4026 2.68335 22.5621 2.68335 14.043Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <svg
                onClick={toggleEditPopup}
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0386 23.8501H24.5"
                  stroke="#212121"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.91 4.42726C15.8149 3.34575 17.4417 3.18716 18.5456 4.07369C18.6066 4.12178 20.5677 5.64525 20.5677 5.64525C21.7805 6.37839 22.1573 7.93696 21.4076 9.12635C21.3678 9.19005 10.2806 23.0586 10.2806 23.0586C9.91174 23.5187 9.3518 23.7904 8.75339 23.7969L4.50745 23.8502L3.55079 19.801C3.41677 19.2317 3.55079 18.6337 3.91965 18.1736L14.91 4.42726Z"
                  stroke="#212121"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.8576 7.00098L19.2186 11.886"
                  stroke="#212121"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/*    hier kommt  unten das oncklick */}
              <svg
                onClick={() => settingTogglePopup()}
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.0002 3.2085C19.9596 3.2085 24.7919 8.03966 24.7919 14.0002C24.7919 19.9595 19.9596 24.7918 14.0002 24.7918C8.03972 24.7918 3.20856 19.9595 3.20856 14.0002C3.20856 8.04083 8.04089 3.2085 14.0002 3.2085Z"
                  stroke="#212121"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.596 14.0152H18.6065"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.9188 14.0152H13.9293"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.2416 14.0152H9.2521"
                  stroke="#212121"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {/* //! Profile image, edit only on auth User */}
      <div className="profile_info">
        <div className="profile_img">
          <img src={userProfile.userData.profilePicture} alt="profile-image" />

          {isUser && (
            <svg
              onClick={toggleEditPopup}
              className="userOn"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.8316 2.51292C22.6298 2.40054 24.4029 3.02489 25.7391 4.24862C26.9628 5.58474 27.5872 7.35791 27.4873 9.16853V20.8315C27.5997 22.6421 26.9628 24.4153 25.7516 25.7514C24.4154 26.9751 22.6298 27.5995 20.8316 27.4871H9.16859C7.35795 27.5995 5.58477 26.9751 4.24864 25.7514C3.02489 24.4153 2.40053 22.6421 2.51292 20.8315V9.16853C2.40053 7.35791 3.02489 5.58474 4.24864 4.24862C5.58477 3.02489 7.35795 2.40054 9.16859 2.51292H20.8316ZM13.7264 21.0562L22.1303 12.6275C22.892 11.8533 22.892 10.6045 22.1303 9.84283L20.5069 8.21951C19.7327 7.44532 18.484 7.44532 17.7098 8.21951L16.8732 9.06864C16.7483 9.19351 16.7483 9.40579 16.8732 9.53066C16.8732 9.53066 18.8586 11.5036 18.8961 11.5536C19.0335 11.7034 19.1209 11.9032 19.1209 12.128C19.1209 12.5775 18.7587 12.9521 18.2967 12.9521C18.0844 12.9521 17.8846 12.8647 17.7473 12.7274L15.6619 10.6545C15.562 10.5546 15.3872 10.5546 15.2873 10.6545L9.33092 16.6108C8.91884 17.0229 8.68159 17.5723 8.6691 18.1592L8.59418 21.1187C8.59418 21.281 8.64413 21.4308 8.75651 21.5432C8.8689 21.6556 9.01874 21.718 9.18107 21.718H12.1156C12.7149 21.718 13.2894 21.4808 13.7264 21.0562Z"
                fill="#FF4D67"
              />
            </svg>
          )}
        </div>
        {/* //# pop-up component */}
        {editPopup && (
          <EditPopup
            togglePopup={toggleEditPopup}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            setEditPopup={setEditPopup}
            id={id}
          />
        )}

        {/* //! name, permission, bio, link */}
        <h1>{`${userProfile.userData.firstName} ${userProfile.userData.lastName}`}</h1>

        <p className="font_info">{userProfile.userData.profession}</p>
        <p className="font_bio"> {userProfile.userData.userBio}</p>
        <a className="font_link" href="#">
          {userProfile.userData.website}
        </a>
      </div>

      {/* //! posts, follower, following - number */}
      <div className="profile_numbers">
        <div className="profile_numberbox">
          <h1>{formatNumber(posts.length)}</h1>
          <p>Posts</p>
        </div>

        <div onClick={() => showFollowerPopUp(true)} className="profile_numberbox">
          {/* Follower Tab */}
          <h1>{userProfile.followedNumber}</h1>
          <p>Follower</p>
        </div>
        <div onClick={() => showFollowerPopUp(false)} className="profile_numberbox">
          {/* Following Tab */}
          <h1> {userProfile.followingNumber}</h1>
          <p>Gefolgt</p>
        </div>
      </div>

      {followerPopUp && (
        <FollowPopup
          showFollowerPopUp={showFollowerPopUp}
          setFollowerPopUp={setFollowerPopUp}
          userProfile={userProfile}
          token={token}
          id={id}
          setFollow={setFollow}
          postFollowing={postFollowing}
          deleteFollowing={deleteFollowing}
          setUpdateFollowers={setUpdateFollowers}
          popupTab={popupTab}
        />
      )}

      {/* //! Follow button only for visitors and TOGGLE color  */}

      {!isUser &&
        (!follow ? (
          <button className="button_unclicked">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => postFollowing(id)}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.41663 10.9613C10.7121 10.9613 12.5522 9.09746 12.5522 6.77229C12.5522 4.44711 10.7121 2.58325 8.41663 2.58325C6.12115 2.58325 4.2811 4.44711 4.2811 6.77229C4.2811 9.09746 6.12115 10.9613 8.41663 10.9613ZM8.41663 13.0126C5.04515 13.0126 2.16663 13.5516 2.16663 15.7053C2.16663 17.8581 5.02763 18.4166 8.41663 18.4166C11.7873 18.4166 14.6666 17.8775 14.6666 15.7239C14.6666 13.5702 11.8056 13.0126 8.41663 13.0126ZM17.0816 8.4898H18.0841C18.4968 8.4898 18.8333 8.83101 18.8333 9.24948C18.8333 9.66796 18.4968 10.0092 18.0841 10.0092H17.0816V10.9902C17.0816 11.4087 16.746 11.7499 16.3324 11.7499C15.9198 11.7499 15.5833 11.4087 15.5833 10.9902V10.0092H14.5824C14.1689 10.0092 13.8333 9.66796 13.8333 9.24948C13.8333 8.83101 14.1689 8.4898 14.5824 8.4898H15.5833V7.5096C15.5833 7.09112 15.9198 6.74992 16.3324 6.74992C16.746 6.74992 17.0816 7.09112 17.0816 7.5096V8.4898Z"
                fill="white"
              />
            </svg>
            Follow
          </button>
        ) : (
          <button className="button_clicked">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => deleteFollowing(id)}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0522 6.27229C12.0522 8.59746 10.2121 10.4613 7.91663 10.4613C5.62115 10.4613 3.7811 8.59746 3.7811 6.27229C3.7811 3.94711 5.62115 2.08325 7.91663 2.08325C10.2121 2.08325 12.0522 3.94711 12.0522 6.27229ZM1.66663 15.2053C1.66663 13.0516 4.54515 12.5126 7.91663 12.5126C11.3056 12.5126 14.1666 13.0702 14.1666 15.2239C14.1666 17.3775 11.2873 17.9166 7.91663 17.9166C4.52763 17.9166 1.66663 17.3581 1.66663 15.2053Z"
                fill="white"
              />
              <rect x="14.5" y="8" width="5" height="1.5" rx="0.75" fill="white" />
            </svg>
            Following
          </button>
        ))}
      {/* //# profilpost section component */}

      <ProfilPosts
        posts={posts}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setPopupList={setPopupList}
      />

      {popupList && (
        <ProfilPostsList posts={userProfile} setPopupList={setPopupList} setUpdProfilFeed={setUpdProfilFeed} />
      )}
      {settingsPopup && <SettingsPopup setSettingsPopup={setSettingsPopup} />}
    </section>
  ) : (
    <p>loading..</p>
  );
};

export default Profile;

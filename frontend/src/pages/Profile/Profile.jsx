import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const formatNumber = (num) => {
    if (num >= 10000) {
      return `${Math.floor(num / 1000)}.${String(num).slice(-3)}k`;
    }
    return num.toString();
  };

  const [isUser, setIsUser] = useState(false);
  const [following, setFollowing] = useState(true);

  return (
    <section className="profile">
      <div className="profile_top">
        <div className="profile_name">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="12" fill="url(#paint0_linear_3509_1537)" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
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
                <stop stop-color="#FF4D67" />
                <stop offset="1" stop-color="#FF8A9B" />
              </linearGradient>
            </defs>
          </svg>
          <h1>h_lahluli007</h1>
        </div>

        <div className="profile_nav">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.043 9.87305V18.2129"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.2171 14.043H9.86865"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.68335 14.043C2.68335 5.52388 5.52388 2.68335 14.043 2.68335C22.5621 2.68335 25.4026 5.52388 25.4026 14.043C25.4026 22.5621 22.5621 25.4026 14.043 25.4026C5.52388 25.4026 2.68335 22.5621 2.68335 14.043Z"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.0386 23.8501H24.5"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.91 4.42726C15.8149 3.34575 17.4417 3.18716 18.5456 4.07369C18.6066 4.12178 20.5677 5.64525 20.5677 5.64525C21.7805 6.37839 22.1573 7.93696 21.4076 9.12635C21.3678 9.19005 10.2806 23.0586 10.2806 23.0586C9.91174 23.5187 9.3518 23.7904 8.75339 23.7969L4.50745 23.8502L3.55079 19.801C3.41677 19.2317 3.55079 18.6337 3.91965 18.1736L14.91 4.42726Z"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.8576 7.00098L19.2186 11.886"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.043 9.87305V18.2129"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.2171 14.043H9.86865"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.68335 14.043C2.68335 5.52388 5.52388 2.68335 14.043 2.68335C22.5621 2.68335 25.4026 5.52388 25.4026 14.043C25.4026 22.5621 22.5621 25.4026 14.043 25.4026C5.52388 25.4026 2.68335 22.5621 2.68335 14.043Z"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="profile_info">
        <img src="../../../public/img/Setting.svg" alt="profile-image" />
        <h1>Hassan Lahluli</h1>

        <p className="font_info">Dragqueen she/her LGBTQ++</p>
        <p className="font_bio"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, cum.</p>
        <a className="font_link" href="#">
          www.exclusice-content.com
        </a>
      </div>
      <div className="profile_numbers">
        <div className="profile_numberbox">
          <h1>{formatNumber(333)}</h1>
          <p>Posts</p>
        </div>

        <div className="profile_numberbox profile_numberborder">
          <h1>{formatNumber(12399)}</h1>
          <p>Follower</p>
        </div>
        <div className="profile_numberbox">
          <h1>{formatNumber(323)}</h1>
          <p>Gefolgt</p>
        </div>
      </div>

      {!isUser &&
        (!following ? (
          <button className="button_unclicked">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.41663 10.9613C10.7121 10.9613 12.5522 9.09746 12.5522 6.77229C12.5522 4.44711 10.7121 2.58325 8.41663 2.58325C6.12115 2.58325 4.2811 4.44711 4.2811 6.77229C4.2811 9.09746 6.12115 10.9613 8.41663 10.9613ZM8.41663 13.0126C5.04515 13.0126 2.16663 13.5516 2.16663 15.7053C2.16663 17.8581 5.02763 18.4166 8.41663 18.4166C11.7873 18.4166 14.6666 17.8775 14.6666 15.7239C14.6666 13.5702 11.8056 13.0126 8.41663 13.0126ZM17.0816 8.4898H18.0841C18.4968 8.4898 18.8333 8.83101 18.8333 9.24948C18.8333 9.66796 18.4968 10.0092 18.0841 10.0092H17.0816V10.9902C17.0816 11.4087 16.746 11.7499 16.3324 11.7499C15.9198 11.7499 15.5833 11.4087 15.5833 10.9902V10.0092H14.5824C14.1689 10.0092 13.8333 9.66796 13.8333 9.24948C13.8333 8.83101 14.1689 8.4898 14.5824 8.4898H15.5833V7.5096C15.5833 7.09112 15.9198 6.74992 16.3324 6.74992C16.746 6.74992 17.0816 7.09112 17.0816 7.5096V8.4898Z"
                fill="white"
              />
            </svg>
            Follow
          </button>
        ) : (
          <button className="button_clicked">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0522 6.27229C12.0522 8.59746 10.2121 10.4613 7.91663 10.4613C5.62115 10.4613 3.7811 8.59746 3.7811 6.27229C3.7811 3.94711 5.62115 2.08325 7.91663 2.08325C10.2121 2.08325 12.0522 3.94711 12.0522 6.27229ZM1.66663 15.2053C1.66663 13.0516 4.54515 12.5126 7.91663 12.5126C11.3056 12.5126 14.1666 13.0702 14.1666 15.2239C14.1666 17.3775 11.2873 17.9166 7.91663 17.9166C4.52763 17.9166 1.66663 17.3581 1.66663 15.2053Z"
                fill="white"
              />
              <rect x="14.5" y="8" width="5" height="1.5" rx="0.75" fill="white" />
            </svg>
            Unfollow
          </button>
        ))}
    </section>
  );
};

export default Profile;

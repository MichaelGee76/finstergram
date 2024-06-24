import { useState, useContext } from "react";
import "./SettingsPopup.css";
import { Link, useNavigate } from "react-router-dom";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";
import ColorMode from "../ColorMode/ColorMode";

const SettingsPopup = ({ setSettingsPopup }) => {
  const { token, setToken } = useContext(TokenDataContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await ky
        .post(`${backendUrl}/users/logout`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      console.log("result", res);
      if (res) {
        /* window.location.href = "https://www.google.de"; */
        setToken("");
        navigate("/signinup");
      }
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <>
      <article className="settings_popup">
        <section className="setting_section">
          <div className="setting_container">
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
                d="M14 11.0833C15.611 11.0833 16.9167 12.3889 16.9167 13.9999C16.9167 15.6109 15.611 16.9166 14 16.9166C12.389 16.9166 11.0833 15.6109 11.0833 13.9999C11.0833 12.3889 12.389 11.0833 14 11.0833Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.5293 8.45858V8.45858C22.7319 7.06762 20.9664 6.59167 19.5866 7.3949C18.3864 8.09211 16.8864 7.21974 16.8864 5.82416C16.8864 4.21885 15.5935 2.91663 13.9997 2.91663V2.91663C12.4059 2.91663 11.113 4.21885 11.113 5.82416C11.113 7.21974 9.61306 8.09211 8.414 7.3949C7.03301 6.59167 5.26759 7.06762 4.47012 8.45858C3.67379 9.84954 4.14632 11.6277 5.52731 12.4298C6.72638 13.1282 6.72638 14.8718 5.52731 15.5701C4.14632 16.3734 3.67379 18.1515 4.47012 19.5413C5.26759 20.9323 7.03301 21.4082 8.41285 20.6062H8.414C9.61306 19.9078 11.113 20.7802 11.113 22.1758V22.1758C11.113 23.7811 12.4059 25.0833 13.9997 25.0833V25.0833C15.5935 25.0833 16.8864 23.7811 16.8864 22.1758V22.1758C16.8864 20.7802 18.3864 19.9078 19.5866 20.6062C20.9664 21.4082 22.7319 20.9323 23.5293 19.5413C24.3268 18.1515 23.8531 16.3734 22.4733 15.5701H22.4721C21.2731 14.8718 21.2731 13.1282 22.4733 12.4298C23.8531 11.6277 24.3268 9.84954 23.5293 8.45858Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Settings</p>
          </div>
          <ColorMode />
          <div className="setting_container">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0001 18.7672V9.23315"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3773 14.3755C18.3773 14.3755 15.428 18.7668 14 18.7668C12.572 18.7668 9.62733 14.3755 9.62733 14.3755"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.20845 14.0002C3.20845 22.0933 5.90695 24.7918 14.0001 24.7918C22.0933 24.7918 24.7918 22.0933 24.7918 14.0002C24.7918 5.907 22.0933 3.2085 14.0001 3.2085C5.90695 3.2085 3.20845 5.907 3.20845 14.0002Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Archive</p>
          </div>
          <div className="setting_container">
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
                d="M3.20845 14.0002C3.20845 22.0933 5.90695 24.7918 14.0001 24.7918C22.0933 24.7918 24.7918 22.0933 24.7918 14.0002C24.7918 5.907 22.0933 3.2085 14.0001 3.2085C5.90695 3.2085 3.20845 5.907 3.20845 14.0002Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.9552 16.3545L13.9991 13.9943V8.90649"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Your Activity</p>
          </div>
          <div className="setting_container">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.3457 14.9334H1.69167"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.49545 10.1733C4.16045 6.11332 6.16711 4.10665 10.2271 3.44165"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.2271 24.4883C6.16712 23.8117 4.16045 21.8167 3.49545 17.7567L3.49428 17.7613C3.35312 16.9213 3.27262 15.9763 3.24928 14.938"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.7854 14.938C24.762 15.9763 24.6804 16.9213 24.5404 17.7613L24.5427 17.7567C23.8765 21.8167 21.8699 23.8117 17.8099 24.4883"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.8104 3.44165C21.8704 4.10665 23.8771 6.11332 24.5421 10.1733"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>QR Code</p>
          </div>

          <Link className="setting_container" to="/savedposts">
            <svg
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

            <p>Saved</p>
          </Link>

          <div className="setting_container">
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
                d="M13.9679 23.7629C10.1891 23.7629 6.96091 23.1913 6.96091 20.9023C6.96091 18.6133 10.1681 16.6206 13.9679 16.6206C17.7467 16.6206 20.9749 18.5946 20.9749 20.8824C20.9749 23.1703 17.7677 23.7629 13.9679 23.7629Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.9679 13.3569C16.4483 13.3569 18.4596 11.3468 18.4596 8.86642C18.4596 6.38609 16.4483 4.37476 13.9679 4.37476C11.4876 4.37476 9.47625 6.38609 9.47625 8.86642C9.46925 11.3374 11.4643 13.3488 13.9364 13.3569H13.9679Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.4226 12.1235C22.8657 11.7374 23.9297 10.4214 23.9297 8.85454C23.9297 7.22004 22.7712 5.85504 21.2289 5.54004"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.1004 15.802C24.1467 15.802 25.8944 17.1892 25.8944 18.4282C25.8944 19.1573 25.2912 19.9518 24.3766 20.1665"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.51444 12.1235C5.0701 11.7374 4.0061 10.4214 4.0061 8.85454C4.0061 7.22004 5.16577 5.85504 6.70694 5.54004"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83544 15.802C3.7891 15.802 2.04144 17.1892 2.04144 18.4282C2.04144 19.1573 2.6446 19.9518 3.56044 20.1665"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Close Friends</p>
          </div>

          <Link className="setting_container" to="/likedposts">
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

            <p>Favorites</p>
          </Link>

          <div className="setting_container">
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
                d="M24.7919 13.9998C24.7919 22.093 22.0934 24.7915 14.0002 24.7915C5.90707 24.7915 3.20857 22.093 3.20857 13.9998C3.20857 5.90667 5.90707 3.20817 14.0002 3.20817C22.0934 3.20817 24.7919 5.90667 24.7919 13.9998Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0002 18.5442V14"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0052 9.91667H13.9947"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Information Center</p>
          </div>
        </section>
        <div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <button
          className="cancel"
          onClick={() => setSettingsPopup((settingsPopup) => !settingsPopup)}
        >
          Cancel
        </button>
      </article>
      <div className="dark_background"></div>
    </>
  );
};

export default SettingsPopup;

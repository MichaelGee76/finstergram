import { useState, useContext } from "react";
import "./SettingsPopup.css";
import { Link, useNavigate } from "react-router-dom";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";

const SettingsPopup = () => {
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

      if (res) {
        setToken(null);

        navigate("/");
      }
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <article className="settings_popup">
      <section className="setting_section">
        <div className="setting_container">
          <img src="/img/Setting.svg" alt="" />
          <p>Settings</p>
        </div>

        <div className="setting_container">
          <img src="/img/Archive.svg" alt="" />
          <p>Archive</p>
        </div>
        <div className="setting_container">
          <img src="/img/YourActivity.svg" alt="" />
          <p>Your Activity</p>
        </div>
        <div className="setting_container">
          <img src="/img/QRCode.svg" alt="" />
          <p>QR Code</p>
        </div>

        <Link className="setting_container" to="/savedposts">
          <img src="/img/Save.svg" alt="" />
          <p>Saved</p>
        </Link>

        <div className="setting_container">
          <img src="/img/CloseFriends.svg" alt="" />
          <p>Close Friends</p>
        </div>

        <Link className="setting_container" to="/likedposts">
          <img src="/img/Heart.svg" alt="" />
          <p>Favorites</p>
        </Link>

        <div className="setting_container">
          <img src="/img/InformationCenter.svg" alt="" />
          <p>Information Center</p>
        </div>
        <div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </article>
  );
};

export default SettingsPopup;

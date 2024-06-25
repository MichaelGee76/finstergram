import { Link } from "react-router-dom";
import "./PostSettings.css";
import { useState } from "react";
import DeletePostPopup from "../DeletePostPopup/DeletePostPopup";

const PostSettings = ({ postData, setUpdUserFeed }) => {
  const [deletePostPopup, setDeletePostPopup] = useState(false);
  const [settingOptionsPopup, setSettingOptionsPopUp] = useState(false);
  const [postSettings, setPostSettings] = useState(false);

  return !postSettings ? (
    <svg
      onClick={() => {
        setPostSettings((prev) => !prev);
        setSettingOptionsPopUp((prev) => !prev);
      }}
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
        stroke="var(--main-text)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.596 14.0152H18.6065"
        stroke="var(--main-text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9188 14.0152H13.9293"
        stroke="var(--main-text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2416 14.0152H9.2521"
        stroke="var(--main-text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <div className="post_settings_popup">
      {deletePostPopup && (
        <DeletePostPopup
          postData={postData}
          setDeletePostPopup={setDeletePostPopup}
          setPostSettings={setPostSettings}
          setSettingOptionsPopUp={setSettingOptionsPopUp}
          setUpdUserFeed={setUpdUserFeed}
        />
      )}
      {settingOptionsPopup && (
        <div>
          <div className="post_settings_content">
            <button
              onClick={(event) => {
                setSettingOptionsPopUp((prev) => !prev);
                setDeletePostPopup((prev) => !prev);
              }}
              className="post_settings_btn"
            >
              Delete
            </button>
            <Link
              to={`/editpost/${postData._id}`}
              className="post_settings_link"
            >
              Edit
            </Link>
          </div>
          <button
            className="close_settings_popup"
            onClick={() => {
              setPostSettings((postSettings) => !postSettings);
              setSettingOptionsPopUp((prev) => !prev);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default PostSettings;

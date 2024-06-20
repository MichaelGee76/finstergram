import { Link } from "react-router-dom";
import "./PostSettings.css";
import { useState } from "react";
import DeletePostPopup from "../DeletePostPopup/DeletePostPopup";

const PostSettings = ({ postData, setUpdUserFeed }) => {
  const [deletePostPopup, setDeletePostPopup] = useState(false);
  const [settingOptionsPopup, setSettingOptionsPopUp] = useState(false);
  const [postSettings, setPostSettings] = useState(false);

  return !postSettings ? (
    <img
      onClick={() => {
        setPostSettings((prev) => !prev);
        setSettingOptionsPopUp((prev) => !prev);
      }}
      src="/img/MoreCircle.svg"
      alt=""
    />
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
              to={`/editpost/:${postData._id}`}
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

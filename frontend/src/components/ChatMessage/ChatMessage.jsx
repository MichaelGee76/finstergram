import { useContext } from "react";
import "./ChatMessage.css";
import { UserDataContext } from "../context/Context";

const ChatMessage = ({ messageData, chatPartner }) => {
  const { user } = useContext(UserDataContext);

  return messageData.userId === user._id ? (
    <div className="message_div partner_messages">
      {/* <div className="message_img_div">
        <img className="message_profile_pic" src={user.profilePicture} alt="" />
      </div> */}

      <div className="message_content">
        <p>{messageData.text}</p>
      </div>
    </div>
  ) : (
    <div className="message_div">
      <div className="message_img_div">
        <img
          className="message_profile_pic"
          src={chatPartner.profilePicture}
          alt=""
        />
      </div>
      <div className="message_content">
        <p>{messageData.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

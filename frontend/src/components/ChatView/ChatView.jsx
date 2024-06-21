import { Link } from "react-router-dom";
import "./ChatView.css";
const calculatePostAge = (createdAt) => {
  const postDate = new Date(createdAt); // Tue May 28 2024 14:10:39 GMT+0200 (Mitteleuropäische Sommerzeit)
  const postTimeAsTimestamp = Date.parse(postDate); // 1716898239000
  const postAge = Date.now() - postTimeAsTimestamp; // 620037
  const postAgeInMin = Math.floor(postAge / 1000 / 60); // 10
  const postAgeInHours = Math.floor(postAgeInMin / 60); // 0
  const showPostAge =
    postAgeInHours >= 24 * 7
      ? `${Math.floor(postAgeInHours / 24 / 7)}d`
      : postAgeInHours >= 24
      ? `${Math.floor(postAgeInHours / 24)}d`
      : postAgeInHours >= 1
      ? `${postAgeInHours}h ago`
      : postAgeInMin > 1
      ? `${postAgeInMin}m ago`
      : "just now";

  return { showPostAge, postAgeInHours };
};
const ChatView = ({ chatData }) => {
  const messageDate = calculatePostAge(chatData?.lastMessageDate);

  console.log(chatData);

  const messageStyle = !chatData.wasRead ? { fontWeight: "800" } : {};

  return (
    <Link to={`/chat/${chatData.userId}`} className="chat_view">
      <div className="chat_view_content">
        <img src={chatData.profilePicture} alt="profile picture" />
        <div>
          <h3>{chatData.userName}</h3>
          <p style={messageStyle}>
            "{chatData.lastMessage}" <span>- {messageDate.showPostAge}</span>
          </p>
        </div>
      </div>
      {!chatData.wasRead && <div className="message_unread_dot"></div>}
    </Link>
  );
};

export default ChatView;

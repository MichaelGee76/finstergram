import { useNavigate, useParams } from "react-router-dom";
import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { TokenDataContext } from "../../components/context/Context";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import ky from "ky";
import { backendUrl } from "../../api/api";
import ChatInput from "../../components/ChatInput/ChatInput";

const Chat = () => {
  const [chatData, setChatData] = useState([]);

  const [chatUpd, setChatUpd] = useState(false);
  const { token } = useContext(TokenDataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const chatData = async () => {
      const res = await ky
        .get(`${backendUrl}/message/chat/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setChatData(res.result);
    };

    chatData();
  }, [chatUpd]);
  console.log(chatData);

  useEffect(() => {
    const messagesSeen = async () => {
      const res = await ky
        .patch(`${backendUrl}/message/${chatData.chatPartner.userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
    };

    messagesSeen();
  }, [chatData]);

  return (
    <main className="chat_page">
      <section className="chat_upper">
        <img onClick={() => navigate(-1)} src="/img/BackArrowLeft.svg" alt="" />
        <img
          className="chat_upper_pic"
          src={chatData.chatPartner?.profilePicture}
          alt=""
        />
        <h1>{chatData.chatPartner?.userName}</h1>
      </section>
      <section className="messages_sec">
        {chatData.chat?.map((message, index) => (
          <ChatMessage
            key={index}
            messageData={message}
            chatPartner={chatData.chatPartner}
          />
        ))}
      </section>
      <ChatInput setChatUpd={setChatUpd} />
    </main>
  );
};

export default Chat;

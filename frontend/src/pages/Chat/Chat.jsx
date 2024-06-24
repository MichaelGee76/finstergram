import { Link, useNavigate, useParams } from "react-router-dom";
import "./Chat.css";
import { useContext, useEffect, useState } from "react";
import { TokenDataContext } from "../../components/context/Context";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import ky from "ky";
import { backendUrl } from "../../api/api";
import ChatInput from "../../components/ChatInput/ChatInput";

const Chat = () => {
  const [chatData, setChatData] = useState([]);
  const [reloadChat, setReloadChat] = useState(false);
  const [chatUpd, setChatUpd] = useState(false);
  const [page, setPage] = useState(30);
  const { token } = useContext(TokenDataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatData]);

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
      setChatData(true);
      setChatData(res.result);
    };

    chatData();
  }, [chatUpd, reloadChat]);

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
      setChatUpd((prev) => !prev);
    };

    messagesSeen();
  }, [chatData]);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setPage((prevPage) => prevPage + 20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(chatData);

  return (
    <main className="chat_page">
      <section className="chat_upper">
        {/*   <img onClick={() => navigate(-1)} src="/img/BackArrowLeft.svg" alt="" /> */}
        <svg
          onClick={() => navigate(-1)}
          width="20"
          height="17"
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3333 8.32007C19.3333 8.76305 19.0042 9.12914 18.5771 9.18708L18.4583 9.19507L0.958342 9.19507C0.475093 9.19507 0.0833422 8.80332 0.0833422 8.32007C0.0833422 7.87709 0.412522 7.511 0.83961 7.45306L0.958342 7.44507L18.4583 7.44507C18.9416 7.44507 19.3333 7.83682 19.3333 8.32007Z"
            fill="var(--main-text)"
          />
          <path
            d="M8.63383 14.7284C8.97628 15.0694 8.97747 15.6234 8.6365 15.9658C8.32652 16.2771 7.84048 16.3064 7.49738 16.053L7.39906 15.9685L0.34073 8.94048C0.0284876 8.62958 8.2657e-05 8.14178 0.255529 7.79869L0.340679 7.70043L7.39901 0.671262C7.74143 0.330261 8.29545 0.331408 8.63645 0.673824C8.94645 0.985111 8.97368 1.47128 8.71881 1.8133L8.63389 1.91126L2.19851 8.32078L8.63383 14.7284Z"
            fill="var(--main-text)"
          />
        </svg>
        <Link to={`/profile/${chatData.chatPartner?.userId}`}>
          <img
            className="chat_upper_pic"
            src={chatData.chatPartner?.profilePicture}
            alt=""
          />
          <h1>{chatData.chatPartner?.userName}</h1>
        </Link>
      </section>
      <section className="messages_sec">
        {chatData.chat?.slice(-page).map((message, index) => (
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

import ChatSearch from "../../components/ChatSearch/ChatSearch";
import "./ChatDashboard.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ky from "ky";
import { Link } from "react-router-dom";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";
import ChatView from "../../components/ChatView/ChatView";
import ChatNewPopup from "../../components/ChatNewPopup/ChatNewPopup";

const ChatDashboard = () => {
  const [chats, setChats] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { token } = useContext(TokenDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getChatsHandler = async () => {
      const res = await ky
        .get(`${backendUrl}/message/chats`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setChats(res.result);
    };
    getChatsHandler();
  }, []);

  return (
    <main className="chat_dash">
      <section>
        <div className="chat_dash_nav">
          <div>
            <img
              onClick={() => navigate(-1)}
              src="/img/BackArrowLeft.svg"
              alt=""
            />
            <h1>Messages</h1>
          </div>

          <ChatNewPopup />
        </div>
        <ChatSearch setSearchInput={setSearchInput} searchInput={searchInput} />
      </section>
      <section className="chat_dash_output">
        {chats?.map((chat) =>
          searchInput ? (
            chat.userName.toLowerCase().includes(searchInput.toLowerCase()) && (
              <ChatView key={chat.userName} chatData={chat} />
            )
          ) : (
            <ChatView key={chat.userName} chatData={chat} />
          )
        )}
      </section>
    </main>
  );
};

export default ChatDashboard;

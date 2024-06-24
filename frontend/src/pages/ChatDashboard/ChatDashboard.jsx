import ChatSearch from "../../components/ChatSearch/ChatSearch";
import "./ChatDashboard.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ky from "ky";
import { Link } from "react-router-dom";
import { backendUrl } from "../../api/api";
import {
  ChatsDataContext,
  TokenDataContext,
} from "../../components/context/Context";
import ChatView from "../../components/ChatView/ChatView";
import ChatNewPopup from "../../components/ChatNewPopup/ChatNewPopup";

const ChatDashboard = () => {
  const { chats, setChats } = useContext(ChatsDataContext);
  const [searchInput, setSearchInput] = useState("");
  const { token } = useContext(TokenDataContext);
  const navigate = useNavigate();

  console.log(chats);

  return (
    <main className="chat_dash">
      <section>
        <div className="chat_dash_nav">
          <div>
            {/*  <img
              onClick={() => navigate(-1)}
              src="/img/BackArrowLeft.svg"
              alt=""
            /> */}
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

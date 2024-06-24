import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { backendUrl } from "../../api/api";
import {
  ChatsDataContext,
  TokenDataContext,
} from "../../components/context/Context";
import ky from "ky";
import Post from "../../components/Post/Post";
import Inbox from "../../components/Inbox/Inbox";

const Home = () => {
  const { token } = useContext(TokenDataContext);
  const [feed, setFeed] = useState();
  const [updUserFeed, setUpdUserFeed] = useState(false);
  const [fixBG, setFixBg] = useState(false);
  const [loadMorePosts, setLoadMorePosts] = useState(6);
  const [newMessage, setNewMessage] = useState(false);

  const { chats, setChats } = useContext(ChatsDataContext);

  useEffect(() => {
    const getUserFeed = async () => {
      const res = await ky
        .get(`${backendUrl}/posts/userFeed`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setFeed(res.result);
    };

    getUserFeed();
  }, [updUserFeed]);

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

      setNewMessage(res.result.filter((element) => !element.wasRead));
      setChats(res.result);
    };
    getChatsHandler();
  }, [feed]);

  console.log(newMessage);
  console.log(chats);

  return (
    <main className="dash_section" style={fixBG ? { overflow: "hidden" } : {}}>
      <div className="dash_heading_div">
        <div>
          <img src="/img/LogoSmall.svg" alt="" />
          <h1>Finstagram</h1>
        </div>
        <div>
          <Link style={{ position: "relative" }} to="/chatDashboard">
            <img src="/img/Messanger.svg" alt="" />
            {newMessage.length > 0 && (
              <div
                style={{ position: "absolute", top: "0", right: "-5px" }}
                className="message_unread_dot"
              ></div>
            )}
          </Link>
          <Inbox />
        </div>
      </div>

      <section className="posts_section">
        {feed?.slice(0, loadMorePosts)?.map((post) => (
          <Post
            setFixBg={setFixBg}
            key={post._id}
            postData={post}
            setUpdUserFeed={setUpdUserFeed}
          />
        ))}
        {feed?.length >= loadMorePosts && (
          <button
            onClick={() =>
              setLoadMorePosts((loadMorePosts) => loadMorePosts + 5)
            }
            className="more_posts_btn"
          >
            more posts
          </button>
        )}
      </section>
    </main>
  );
};

export default Home;

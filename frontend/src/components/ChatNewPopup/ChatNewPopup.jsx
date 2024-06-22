import { useContext, useEffect, useState } from "react";
import "./ChatNewPopup.css";
import { TokenDataContext, UserDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";

const ChatNewPopup = () => {
  const [openNewChat, setOpenNewChat] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [followedUsers, setFollowedUsers] = useState([]);
  const [showMoreUsers, setShowMoreUsers] = useState(20);
  const { token } = useContext(TokenDataContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    const getFollowedUsersHandler = async () => {
      const res = await ky
        .get(`${backendUrl}/follow`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        .json();
      setFollowedUsers(res.result.iAmFollowing);
    };
    getFollowedUsersHandler();
  }, []);

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setShowMoreUsers((prevPage) => prevPage + 5);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(followedUsers);
  return (
    <>
      {!openNewChat ? (
        <img
          onClick={() => setOpenNewChat((prev) => !prev)}
          src="/img/NewMessage.svg"
          alt=""
        />
      ) : (
        <section className="new_chat">
          <div className="new_chat_upper">
            <img
              onClick={() => setOpenNewChat((prev) => !prev)}
              src="/img/BackArrowLeft.svg"
              alt=""
            />
            <h2> previous chats</h2>
          </div>
          <form className="chat_search" action="">
            <label htmlFor="">
              <img src="./img/SearchUnclicked.svg" alt="" />
            </label>
            <input
              type="text"
              placeholder="Search contacts.."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </form>
          <div className="new_chat_output">
            {followedUsers.slice(0, showMoreUsers)?.map((followedUser) =>
              searchInput ? (
                followedUser.followedId.userName
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) && (
                  <article key={followedUser._id}>
                    <Link
                      className="new_chat_userinfos"
                      to={`/profile/${followedUser.followedId._id}`}
                    >
                      <img
                        className="new_chat_profilepic"
                        src={followedUser.followedId.profilePicture}
                        alt=""
                      />
                      <div>
                        <p>{followedUser.followedId.userName}</p>
                        <p>{followedUser.followedId.profession}</p>
                      </div>
                    </Link>
                    <Link to={`/chat/${followedUser.followedId._id}`}>
                      <img src="/img/Message.svg" alt="" />
                    </Link>
                  </article>
                )
              ) : (
                <article key={followedUser._id}>
                  <Link
                    className="new_chat_userinfos"
                    to={`/profile/${followedUser.followedId._id}`}
                  >
                    <img
                      className="new_chat_profilepic"
                      src={followedUser.followedId.profilePicture}
                      alt=""
                    />
                    <div>
                      <p>{followedUser.followedId.userName}</p>
                      <p>{followedUser.followedId.profession}</p>
                    </div>
                  </Link>
                  <Link to={`/chat/${followedUser.followedId._id}`}>
                    <img src="/img/Message.svg" alt="" />
                  </Link>
                </article>
              )
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ChatNewPopup;

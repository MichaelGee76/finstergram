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
                .get(`${backendUrl}/follow/${user._id}`, {
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

    return (
        <>
            {!openNewChat ? (
                /*  <img
          onClick={() => setOpenNewChat((prev) => !prev)}
          src="/img/NewMessage.svg"
          alt=""
        /> */

                <svg
                    onClick={() => setOpenNewChat((prev) => !prev)}
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="0.75"
                        y="7.75"
                        width="22.5"
                        height="22.5"
                        rx="3.25"
                        stroke="var(--main-text)"
                        strokeWidth="1.5"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.91 4.42726C19.8149 3.34575 21.4417 3.18716 22.5456 4.07369C22.6066 4.12178 24.5677 5.64525 24.5677 5.64525C25.7805 6.37839 26.1573 7.93696 25.4076 9.12635C25.3678 9.19005 14.2806 23.0586 14.2806 23.0586C13.9117 23.5187 13.3518 23.7904 12.7534 23.7969L8.50745 23.8502L7.55079 19.801C7.41677 19.2317 7.55079 18.6337 7.91965 18.1736L18.91 4.42726Z"
                        stroke="var(--main-text)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.8576 7.00098L23.2186 11.886"
                        stroke="var(--main-text)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_3690_2060"
                            x1="21.6923"
                            y1="7.92308"
                            x2="1.38462"
                            y2="29.6154"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#666666" stopOpacity="0" />
                            <stop offset="0.32" />
                            <stop offset="0.425" />
                        </linearGradient>
                    </defs>
                </svg>
            ) : (
                <section className="new_chat">
                    <div className="new_chat_upper">
                        {/*  <img
              onClick={() => setOpenNewChat((prev) => !prev)}
              src="/img/BackArrowLeft.svg"
              alt=""
            /> */}

                        <svg
                            onClick={() => setOpenNewChat((prev) => !prev)}
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

                        <h2> previous chats</h2>
                    </div>
                    <form className="chat_search" action="">
                        <label htmlFor="">
                            {/*     <img src="./img/SearchUnclicked.svg" alt="" /> */}
                            <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="11.8916"
                                    cy="11.7666"
                                    r="8.98856"
                                    stroke="var(--icons-grey)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M18.1433 18.4851L21.6673 22"
                                    stroke="var(--icons-grey)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </label>
                        <input
                            type="text"
                            placeholder="Search contacts.."
                            value={searchInput}
                            onChange={(event) =>
                                setSearchInput(event.target.value)
                            }
                        />
                    </form>
                    <div className="new_chat_output">
                        {followedUsers
                            .slice(0, showMoreUsers)
                            ?.map((followedUser) =>
                                searchInput ? (
                                    followedUser.followedId.userName
                                        .toLowerCase()
                                        .includes(
                                            searchInput.toLowerCase()
                                        ) && (
                                        <article key={followedUser._id}>
                                            <Link
                                                className="new_chat_userinfos"
                                                to={`/profile/${followedUser.followedId._id}`}
                                            >
                                                <img
                                                    className="new_chat_profilepic"
                                                    src={
                                                        followedUser.followedId
                                                            .profilePicture
                                                    }
                                                    alt=""
                                                />
                                                <div>
                                                    <h3 className="">
                                                        {
                                                            followedUser
                                                                .followedId
                                                                .userName
                                                        }
                                                    </h3>
                                                    <p>
                                                        {
                                                            followedUser
                                                                .followedId
                                                                .profession
                                                        }
                                                    </p>
                                                </div>
                                            </Link>
                                            <Link
                                                to={`/chat/${followedUser.followedId._id}`}
                                            >
                                                {/*      <img src="/img/SendMessageLightPink.svg" alt="" /> */}
                                                <svg
                                                    width="23"
                                                    height="23"
                                                    viewBox="0 0 23 23"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M16.2337 2.875C17.5188 2.875 18.755 3.38292 19.6645 4.29429C20.5749 5.20375 21.0838 6.43042 21.0838 7.71458V15.2854C21.0838 17.9592 18.9084 20.125 16.2337 20.125H6.76628C4.09157 20.125 1.91711 17.9592 1.91711 15.2854V7.71458C1.91711 5.04083 4.08199 2.875 6.76628 2.875H16.2337ZM17.7584 9.14263L17.835 9.06596C18.0641 8.78804 18.0641 8.38554 17.8245 8.10763C17.6913 7.96484 17.5082 7.87763 17.3175 7.85846C17.1163 7.84792 16.9246 7.91596 16.7799 8.05013L12.4588 11.5001C11.9029 11.9611 11.1066 11.9611 10.5421 11.5001L6.22961 8.05013C5.93157 7.82971 5.51949 7.85846 5.27128 8.11721C5.01253 8.37596 4.98378 8.78804 5.20324 9.07554L5.32878 9.20013L9.6892 12.6022C10.2259 13.0239 10.8766 13.2539 11.5579 13.2539C12.2374 13.2539 12.8996 13.0239 13.4353 12.6022L17.7584 9.14263Z"
                                                        fill="var(--light-pink)"
                                                    />
                                                </svg>
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
                                                src={
                                                    followedUser.followedId
                                                        .profilePicture
                                                }
                                                alt=""
                                            />
                                            <div>
                                                <h3>
                                                    {
                                                        followedUser.followedId
                                                            .userName
                                                    }
                                                </h3>
                                                <p>
                                                    {
                                                        followedUser.followedId
                                                            .profession
                                                    }
                                                </p>
                                            </div>
                                        </Link>
                                        <Link
                                            to={`/chat/${followedUser.followedId._id}`}
                                        >
                                            {/*     <img src="/img/SendMessageLightPink.svg" alt="" /> */}

                                            <svg
                                                width="23"
                                                height="23"
                                                viewBox="0 0 23 23"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.2337 2.875C17.5188 2.875 18.755 3.38292 19.6645 4.29429C20.5749 5.20375 21.0838 6.43042 21.0838 7.71458V15.2854C21.0838 17.9592 18.9084 20.125 16.2337 20.125H6.76628C4.09157 20.125 1.91711 17.9592 1.91711 15.2854V7.71458C1.91711 5.04083 4.08199 2.875 6.76628 2.875H16.2337ZM17.7584 9.14263L17.835 9.06596C18.0641 8.78804 18.0641 8.38554 17.8245 8.10763C17.6913 7.96484 17.5082 7.87763 17.3175 7.85846C17.1163 7.84792 16.9246 7.91596 16.7799 8.05013L12.4588 11.5001C11.9029 11.9611 11.1066 11.9611 10.5421 11.5001L6.22961 8.05013C5.93157 7.82971 5.51949 7.85846 5.27128 8.11721C5.01253 8.37596 4.98378 8.78804 5.20324 9.07554L5.32878 9.20013L9.6892 12.6022C10.2259 13.0239 10.8766 13.2539 11.5579 13.2539C12.2374 13.2539 12.8996 13.0239 13.4353 12.6022L17.7584 9.14263Z"
                                                    fill="var(--light-pink)"
                                                />
                                            </svg>
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

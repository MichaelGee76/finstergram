import { Link, useParams } from "react-router-dom";
import "./HashtagPosts.css";
import { useContext, useEffect, useState } from "react";
import {
    TokenDataContext,
    UserDataContext,
} from "../../components/context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";
import Post from "../../components/Post/Post";

const HashtagPosts = () => {
    const { token } = useContext(TokenDataContext);
    const { user } = useContext(UserDataContext);
    const [hashtagFeed, setHashtagFeed] = useState();
    const [updHashtagFeed, setUpdHashtagFeed] = useState(false);
    const [fixBG, setFixBg] = useState(false);
    const { hashtag } = useParams();

    useEffect(() => {
        const getHashtagFeed = async () => {
            const res = await ky
                .get(`${backendUrl}/posts/allPostsWithHashtag/${hashtag}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .json();

            setHashtagFeed(res.result);
        };

        getHashtagFeed();
    }, [updHashtagFeed]);

    return (
        <main
            className="dash_section hashtag_posts_sec"
            style={fixBG ? { overflow: "hidden" } : {}}
        >
            <div className="dash_heading_div">
                <div>
                    {/*   <img src="/img/LogoSmall.svg" alt="" /> */}
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="32"
                            height="32"
                            rx="12"
                            fill="url(#paint0_linear_3509_1537)"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.0195 6.44865C10.8386 6.86976 7.34856 10.0646 6.54184 14.2091C6.35423 15.1728 6.35255 16.8065 6.53807 17.7588C7.491 22.6495 12.0369 26.0596 16.9235 25.5494C18.3501 25.4004 19.723 24.958 20.8779 24.2751C23.2401 22.8783 24.9336 20.4709 25.462 17.7588C25.6475 16.8065 25.6458 15.1728 25.4582 14.2091C24.5075 9.32525 19.9677 5.95023 15.0195 6.44865ZM17.0247 11.312C18.3438 11.5843 19.7214 12.6714 20.3045 13.9002C20.6609 14.651 20.7874 15.208 20.7857 16.0191C20.7811 18.2199 19.3219 20.0862 17.169 20.6446C16.4603 20.8285 15.146 20.781 14.4777 20.5474C12.1606 19.7375 10.8091 17.3624 11.3052 14.9722C11.6511 13.3061 13.1737 11.7448 14.8471 11.3404C15.4025 11.2062 16.4464 11.1926 17.0247 11.312ZM15.1034 13.2669C13.9257 13.6343 13.1447 14.7216 13.1447 15.994C13.1447 16.8322 13.3891 17.4237 13.9778 18.0108C14.5665 18.5979 15.1596 18.8417 16 18.8417C16.8404 18.8417 17.4336 18.5979 18.0223 18.0108C18.6074 17.4273 18.856 16.83 18.8541 16.0118C18.8525 15.3091 18.769 15.1456 18.5678 15.4517C18.395 15.7147 17.8286 15.9896 17.4542 15.9922C16.6919 15.9975 16 15.3148 16 14.5575C16 14.2031 16.3022 13.5911 16.5605 13.4223C16.716 13.3207 16.7391 13.2712 16.6559 13.2185C16.4886 13.1128 15.499 13.1437 15.1034 13.2669Z"
                            fill="var(--input-grey)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_3509_1537"
                                x1="32"
                                y1="32"
                                x2="-6.07713"
                                y2="20.9599"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="var(--mid-pink)" />
                                <stop
                                    offset="1"
                                    stopColor="var(--light-pink)"
                                />
                            </linearGradient>
                        </defs>
                    </svg>
                    <h1>TokTok</h1>
                </div>
                <div>
                    <Link to="/chatDashboard">
                        {/*     <img src="/img/Messanger.svg" alt="" /> */}

                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.4712 9.53707L11.7939 16.2857L4.19934 11.5356C3.11121 10.8548 3.33756 9.20201 4.56834 8.84208L22.5998 3.56156C23.7268 3.23123 24.7713 4.28497 24.4365 5.41566L19.1019 23.4345C18.7365 24.6671 17.0931 24.8873 16.4187 23.7945L11.7903 16.2869"
                                stroke="var(--main-text)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                    <Link>
                        {/*      <img src="/img/Heart.svg" alt="" /> */}
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.4089 14.5207C2.15707 10.6123 3.62124 5.75318 7.7244 4.43251C9.88274 3.73601 12.5462 4.31701 14.0594 6.40418C15.4862 4.24001 18.2267 3.74068 20.3827 4.43251C24.4847 5.75318 25.9571 10.6123 24.7064 14.5207C22.7581 20.7157 15.9599 23.9427 14.0594 23.9427C12.1601 23.9427 5.42257 20.788 3.4089 14.5207Z"
                                stroke="var(--main-text)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18.42 8.82471C19.8282 8.96937 20.709 10.0859 20.6565 11.6504"
                                stroke="var(--main-text)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
            <section className="posts_section">
                {hashtagFeed?.map((post) => (
                    <Post
                        setFixBg={setFixBg}
                        key={post._id}
                        postData={post}
                        setUpdUserFeed={setUpdHashtagFeed}
                    />
                ))}
            </section>
        </main>
    );
};

export default HashtagPosts;

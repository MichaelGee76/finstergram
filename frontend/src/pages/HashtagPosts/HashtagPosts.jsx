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

  console.log(hashtagFeed);

  return (
    <main
      className="dash_section hashtag_posts_sec"
      style={fixBG ? { overflow: "hidden" } : {}}
    >
      <div className="dash_heading_div">
        <div>
          <img src="/img/LogoSmall.svg" alt="" />
          <h1>TokTok</h1>
        </div>
        <div>
          <Link to="/chatDashboard">
            <img src="/img/Messanger.svg" alt="" />
          </Link>
          <Link>
            <img src="/img/Heart.svg" alt="" />
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

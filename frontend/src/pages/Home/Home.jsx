import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";
import ky from "ky";
import Post from "../../components/Post/Post";

const Home = () => {
  const { token } = useContext(TokenDataContext);
  const [feed, setFeed] = useState();
  const [updUserFeed, setUpdUserFeed] = useState(false);
  const [fixBG, setFixBg] = useState(false);

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

  return (
    <main className="dash_section" style={fixBG ? { overflow: "hidden" } : {}}>
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
        {feed?.map((post) => (
          <Post
            setFixBg={setFixBg}
            key={post._id}
            postData={post}
            setUpdUserFeed={setUpdUserFeed}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;

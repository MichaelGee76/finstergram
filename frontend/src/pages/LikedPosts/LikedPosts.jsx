import ky from "ky";
import { TokenDataContext } from "../../components/context/Context";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import Post from "../../components/Post/Post";
import "./LikedPosts.css";
import { useNavigate } from "react-router-dom";

const LikedPosts = () => {
  const { token } = useContext(TokenDataContext);
  const [likedPosts, setLikedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [fixBg, setFixBg] = useState(false);
  const [changeHeaderZ, setChangeHeaderZ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const res = await ky
          .get(`${backendUrl}/likes/likedPosts`, {
            headers: {
              Content_Type: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
        setLikedPosts(res.result);
      } catch (err) {
        setError("Failed to  fetch liked posts");
      }
    };

    fetchLikedPosts();
  }, []);

  console.log(likedPosts);

  return (
    <section className="saved_posts_sec">


      <div className="discover_feed_sec">
        {likedPosts?.map((post, index) => (
          <Post
            key={index}
            postData={post}
            setFixBg={setFixBg}
            discoverFeed={true}
            setChangeHeaderZ={setChangeHeaderZ}
            changeHeaderZ={changeHeaderZ}
          />
        ))}
      </div>
    </section>
  );
};

export default LikedPosts;

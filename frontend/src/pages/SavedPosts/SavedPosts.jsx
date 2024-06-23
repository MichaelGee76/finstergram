import { useContext, useEffect, useState } from "react";
import "./SavedPosts.css";
import { backendUrl } from "../../api/api";
import ky from "ky";
import Post from "../../components/Post/Post";
import { TokenDataContext } from "../../components/context/Context";
import { useNavigate } from "react-router-dom";

const SavedPosts = () => {
  const { token } = useContext(TokenDataContext);
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [fixBg, setFixBg] = useState(false);
  const [changeHeaderZ, setChangeHeaderZ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await ky
          .get(`${backendUrl}/save/savedPosts `, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
        setSavedPosts(res.result); //setSavedPosts(res.result)???
      } catch (err) {
        setError("failed to fetch saved posts");
      }
    };
    fetchSavedPosts();
  }, []);

  return (
    <section className="saved_posts_sec">
      <div className="saved_posts_upper">
        <div>
          <img
            src="/img/BackArrowLeft.svg"
            alt=""
            onClick={() => navigate(-1)}
            className="nobtn"
          />
          <h1>Saved Posts</h1>
        </div>
        <p className="saved_posts_disclaimer">
          Only you can see what you've saved
        </p>
      </div>

      <div className="discover_feed_sec">
        {savedPosts?.map((post, index) => (
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
// brauchen wir .join ()hier oben????????

export default SavedPosts;

import { useContext, useEffect, useState } from "react";
import "./SavedPosts.css";
import { backendUrl } from "../../api/api";
import ky from "ky";
import Post from "../../components/Post/Post";
import { TokenDataContext } from "../../components/context/Context";

const SavedPosts = () => {
  const { token } = useContext(TokenDataContext);
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);
  const [fixBg, setFixBg] = useState(false);
  const [changeHeaderZ, setChangeHeaderZ] = useState(false);

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
    <section>
      <h1>Saved Posts</h1>
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

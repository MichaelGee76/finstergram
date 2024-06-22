import { useContext, useEffect, useState } from "react";
import "./SavedPosts.css";
import { backendUrl } from "../../api/api";
import ky from "ky";

const SavedPosts = () => {
  const { token } = useContext(TokenDataContext);
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);

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
        setSavedPosts(res); //setSavedPosts(res.result)???
      } catch (err) {
        setError("failed to fetch saved posts");
      }
    };
    fetchSavedPosts();
  }, []);

  return (
    <section>
      <h1>Saved Posts</h1>
      <div className="saved_posts">
        {savedPosts?.map((singlePost, index) => (
          <div className="post_container" key={index}>
            <h2>{singlePost.description}</h2>
            <p>{singlePost.location}</p>
            <p>{singlePost.hashtags.join(",")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
// brauchen wir .join ()hier oben????????

export default SavedPosts;

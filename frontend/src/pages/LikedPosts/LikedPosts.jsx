import ky from "ky";
import { TokenDataContext } from "../../components/context/Context";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";

const LikedPosts = () => {
  const { token } = useContext(TokenDataContext);
  const [likedPosts, setLikedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const res = await ky
          .get(`${backendUrl}/like/likedPosts`, {
            headers: {
              Content_Type: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();
        setLikedPosts(res);
      } catch (err) {
        setError("Failed to  fetch liked posts");
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <section>
      <h1>Liked Posts</h1>
      <div className="liked_posts">
        {likedPosts?.map((singleLikedPost, index) => (
          <div className="likedpost_container" key={index}>
            <h2>{singleLikedPost.description}</h2>
            <p>{singleLikedPost.location}</p>
            <p>{singleLikedPost.hashtags.join(",")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LikedPosts;

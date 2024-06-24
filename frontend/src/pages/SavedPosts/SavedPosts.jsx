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
  console.log(savedPosts);
  
  return (
    <section className="saved_posts_sec">
      <div className="saved_posts_upper">
        <div>
          <svg
            onClick={() => navigate(-1)}
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3333 8.32007C19.3333 8.76305 19.0042 9.12914 18.5771 9.18708L18.4583 9.19507L0.958342 9.19507C0.475093 9.19507 0.0833422 8.80332 0.0833422 8.32007C0.0833422 7.87709 0.412522 7.511 0.83961 7.45306L0.958342 7.44507L18.4583 7.44507C18.9416 7.44507 19.3333 7.83682 19.3333 8.32007Z"
              fill="var(--icons-grey)"
            />
            <path
              d="M8.63383 14.7284C8.97628 15.0694 8.97747 15.6234 8.6365 15.9658C8.32652 16.2771 7.84048 16.3064 7.49738 16.053L7.39906 15.9685L0.34073 8.94048C0.0284876 8.62958 8.2657e-05 8.14178 0.255529 7.79869L0.340679 7.70043L7.39901 0.671262C7.74143 0.330261 8.29545 0.331408 8.63645 0.673824C8.94645 0.985111 8.97368 1.47128 8.71881 1.8133L8.63389 1.91126L2.19851 8.32078L8.63383 14.7284Z"
              fill="var(--icons-grey)"
            />
          </svg>

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

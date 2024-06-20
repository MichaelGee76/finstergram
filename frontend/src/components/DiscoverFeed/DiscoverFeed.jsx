import { useContext, useEffect, useState } from "react";
import "./DiscoverFeed.css";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../context/Context";
import Post from "../Post/Post";

const DiscoverFeed = ({ setChangeHeaderZ, changeHeaderZ }) => {
  const [discoverFeedData, setDiscoverFeedData] = useState([]);
  const { token } = useContext(TokenDataContext);
  const [fixBg, setFixBg] = useState(false);

  useEffect(() => {
    const discoverFeedHandler = async () => {
      const res = await ky
        .get(`${backendUrl}/posts/discoverFeed`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      setDiscoverFeedData(res.result);
    };
    discoverFeedHandler();
  }, []);

  console.log(discoverFeedData && discoverFeedData);
  return (
    <section className="discover_feed_sec">
      {discoverFeedData?.map((post) => (
        <Post
          key={post._id}
          postData={post}
          setFixBg={setFixBg}
          discoverFeed={true}
          setChangeHeaderZ={setChangeHeaderZ}
          changeHeaderZ={changeHeaderZ}
        />
      ))}
    </section>
  );
};

export default DiscoverFeed;

import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./SinglePost.css";
import { useContext, useEffect, useState } from "react";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";

const SinglePost = () => {
  const [fixBG, setFixBg] = useState(false);
  const [updUserFeed, setUpdUserFeed] = useState(false);
  const [postData, setPostData] = useState();
  const { token } = useContext(TokenDataContext);

  const { postId } = useParams();

  useEffect(() => {
    const getOnePostHandler = async () => {
      const res = ky
        .get(`${backendUrl}/singlepost/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
    };
  }, []);
  return (
    <main className="single_post_sec">
      <Post
        setFixBg={setFixBg}
        key={postData._id}
        postData={postData}
        setUpdUserFeed={setUpdUserFeed}
      />
    </main>
  );
};

export default SinglePost;

import ky from "ky";
import "./EditPost.css";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { TokenDataContext } from "../../components/context/Context";

const EditPost = () => {
  const { token } = useContext(TokenDataContext);
  const [description, setDescription] = useState();
  const [hashtags, setHashtags] = useState();
  const [location, setLocation] = useState();

  const [hashtagsARR, setHashtagsARR] = useState([]);

  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const currentPost = async () => {
      try {
        const res = await ky
          .get(`${backendUrl}/posts/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();

        setDescription(res.result.post.description);
        setHashtags(res.result.post.hashtags);
        setLocation(res.result.post.location);
      } catch (err) {
        setError("Failed to fetch post");
      }
    };
    currentPost();
  }, []);

  const handleEditPost = async () => {
    try {
      const updatedPost = {
        description,
        hashtags,
        location,
      };

      console.log(updatedPost);
      await ky.patch(`${backendUrl}/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        json: updatedPost,
      });
    } catch (error) {
      setError("failed to update post");
    }
  };

  const addHashtag = () => {
    if (hashtagsARR !== "") {
      setHashtags([...hashtags, hashtagsARR]);
      setHashtagsARR("");
    }
  };

  /*   const removeHashtag = (indexToRemove) => {
    const updatedHashtagsARR = [...hashtagsARR];
    updatedHashtagsARR.splice(indexToRemove, 1);
    setHashtagsARR(updatedHashtagsARR);
    console.log(hashtagsARR);
  }; */
  /* 
  const removeHashtag = (indexToRemove) => {
    setHashtags((prevState) => {
      const newHashtags = prevState.hashtags.filter(
        (_, index) => index !== indexToRemove
      );
      return { ...prevState, hashtags: newHashtags };
    });
  }; */

  const removeHashtag = (indexToRemove) => {
    setHashtags((prevHashtags) => {
      if (Array.isArray(prevHashtags)) {
        return prevHashtags.filter((_, index) => index !== indexToRemove);
      }
      return prevHashtags;
    });
  };

  return (
    <section>
      <h1>Edit Post</h1>;
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditPost();
        }}
      >
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="hashtags">Hashtags:</label>
          <input
            type="text"
            id="hashtags"
            value={hashtagsARR}
            onChange={(e) => setHashtagsARR(e.target.value)}
          />
          <button onClick={addHashtag}>Add</button>
        </div>

        <div className="hashtags_output">
          {hashtags?.map((hashtag, index) => (
            <div key={index}>
              <p>#{hashtag}</p>
              <button onClick={() => removeHashtag(index)}>x</button>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </section>
  );
};

export default EditPost;

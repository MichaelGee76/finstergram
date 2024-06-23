import ky from "ky";
import "./EditPost.css";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { TokenDataContext } from "../../components/context/Context";

const EditPost = () => {
  const { token } = useContext(TokenDataContext);
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [location, setLocation] = useState("");
  const [locationPlaceholder, setLocationPlaceholder] = useState();
  const [places, setPlaces] = useState();
  const [postData, setPostData] = useState({});
  const [hashtagsARR, setHashtagsARR] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
        setLocationPlaceholder(res.result.post.location);
        setPostData(res.result);
      } catch (err) {
        setError("Failed to fetch post");
      }
    };
    currentPost();
  }, [id, token]);

  const handleEditPost = async (event) => {
    event.preventDefault();
    try {
      const updatedPost = {
        description,
        hashtags,
        location: locationPlaceholder,
      };

      await ky.patch(`${backendUrl}/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        json: updatedPost,
      });
      // navigate(`/posts/${id}`);
    } catch (error) {
      setError("Failed to update post");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!location) return;
      try {
        const response = await ky
          .get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=10&appid=e1678d75ce4af9fec1178e60c5f88016&units=metric&lang=de`
          )
          .json();
        setPlaces(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [location]);

  const addHashtag = (event) => {
    event.preventDefault();
    if (hashtagsARR.trim() !== "") {
      setHashtags([...hashtags, hashtagsARR.trim()]);
      setHashtagsARR("");
    }
  };

  const removeHashtag = (indexToRemove, event) => {
    event.preventDefault();
    setHashtags((prevHashtags) =>
      prevHashtags.filter((_, index) => index !== indexToRemove)
    );
  };
  const addLocation = (city) => {
    setLocationPlaceholder(city);
    setLocation("");
  };

  console.log(locationPlaceholder);
  return (
    <section className="edit_post_sec">
      <div className="saved_posts_upper">
        <div>
          <img
            src="/img/BackArrowLeft.svg"
            alt=""
            onClick={() => navigate(-1)}
            className="nobtn"
          />
          <h1>Edit your Post</h1>
        </div>
        <p className="saved_posts_disclaimer">You cannot change the image</p>
      </div>
      <img className="post_img" src={postData?.post?.picture} alt="" />
      <form onSubmit={(event) => event.preventDefault()}>
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
          <div className="hashtags_output">
            {hashtags?.map((hashtag, index) => (
              <div key={index}>
                <p>#{hashtag}</p>
                <button
                  type="button"
                  onClick={(event) => removeHashtag(index, event)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            id="hashtags"
            value={hashtagsARR}
            onChange={(e) => setHashtagsARR(e.target.value)}
          />
          <button
            className="edit_hashtag_btn"
            onClick={addHashtag}
            type="button"
          >
            Add Hashtag
          </button>
        </div>

        <div>
          <div className="location_edit_wrapper">
            <label htmlFor="location">Location:</label>
            <p>{locationPlaceholder}</p>
          </div>

          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {location && (
            <div className="location_suggestions">
              {places?.map((city) => (
                <div
                  onClick={() => addLocation(`${city.name} ${city.country}`)}
                  key={city.lat}
                >
                  <p className="location_city">{city.name}</p>
                  <p className="location_country">{city.country}</p>
                  {city.state && <p className="location_state">{city.state}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleEditPost}
          className="edit_post_btn"
          type="submit"
        >
          Update Post
        </button>
        {error && <p className="error_message">{error}</p>}
      </form>
    </section>
  );
};

export default EditPost;

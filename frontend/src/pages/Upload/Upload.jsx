import { useState, useEffect } from "react";
import "./Upload.css";
import ky from "ky";

const Upload = () => {
  const [postUpload, setPostUpload] = useState({
    userId: "user._id",
    picture: null,
    description: "",
    hashtags: [],
  });
  const [hashtag, setHashtag] = useState();
  const [location, setLocation] = useState();
  const [places, setPlaces] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;
      setPostUpload({ ...postUpload, picture: base64 });
    };
  };
  // Funktion damit das textarea feld automatisch mit dem content mitwächst
  useEffect(() => {
    const textareas = document.querySelectorAll(".auto-resize-textarea");
    textareas.forEach((textarea) => {
      textarea.addEventListener("input", autoResize);
      // Initialize the height based on initial content
      autoResize({ target: textarea });
    });

    return () => {
      textareas.forEach((textarea) => {
        textarea.removeEventListener("input", autoResize);
      });
    };
  }, []);
  // Funktion damit das textarea feld automatisch mit dem content mitwächst
  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const addHashtag = (event) => {
    event.preventDefault();

    setPostUpload({
      ...postUpload,
      hashtags: [...postUpload.hashtags, hashtag],
    });

    setHashtag("");
  };

  const removeHashtag = (indexToRemove) => {
    setPostUpload((prevState) => {
      const newHashtags = prevState.hashtags.filter(
        (_, index) => index !== indexToRemove
      );
      return { ...prevState, hashtags: newHashtags };
    });
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
  console.log(places);
  console.log(postUpload);

  const addLocation = (city) => {
    setPostUpload({ ...postUpload, location: city });
    setLocation("");
  };

  return (
    <main className="upload_section">
      <div className="upload_heading">
        <button className="nobtn">
          <img src="./img/CloseSquare.svg" alt="" />
        </button>
        <h1>New Post</h1>
      </div>
      <div
        className="img_upload_wrapper"
        style={
          !postUpload.picture
            ? { backgroundColor: "var(--loginfont-grey)" }
            : {
                backgroundImage: `url(${postUpload.picture})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
        }
      >
        {!postUpload.picture && (
          <label htmlFor="img_upload">
            <img src="./img/CameraBright.svg" alt="" />
            <p>Upload</p>
          </label>
        )}
      </div>
      {postUpload.picture && (
        <label htmlFor="img_upload" className="change_img">
          <img src="./img/ChangeImg.svg" alt="" />
          <p>Change Image</p>
        </label>
      )}

      <input
        style={{ display: "none" }}
        type="file"
        id="img_upload"
        accept=".jpg, .png, .jpeg"
        onChange={handleImageChange}
      />

      <section className="upload_text_section">
        <img className="upload_profile_img" src="./img/test.jpg" alt="" />
        <textarea
          className="auto-resize-textarea"
          type="text"
          placeholder="Write a caption"
          value={postUpload.description}
          onChange={(event) =>
            setPostUpload({ ...postUpload, description: event.target.value })
          }
        />
        <img className="upload_mini_img" src={postUpload.picture} alt="" />
      </section>
      <section className="upload_hashtags_section">
        <form className="hashtag_input_wrapper">
          <label htmlFor="">
            <img src="./img/Hashtag.svg" alt="" />
          </label>
          <input
            type="text"
            placeholder="Add Hashtag"
            value={hashtag}
            onChange={(event) => setHashtag(event.target.value)}
          />
          <button onClick={addHashtag}>Add</button>
        </form>
        <div className="hashtags_output">
          {postUpload.hashtags?.map((hashtag, index) => (
            <div key={index}>
              <p>#{hashtag}</p>
              <button onClick={() => removeHashtag(index)}>x</button>
            </div>
          ))}
        </div>
      </section>
      <section className="upload_location_section">
        <form action="">
          <label htmlFor="">
            <img src="./img/Location.svg" alt="" />
          </label>
          <input
            type="text"
            placeholder="Add Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <button onClick={addHashtag}>Add</button>
        </form>
        {location && (
          <div className="location_suggestions">
            {places?.map((city) => (
              <div onClick={() => addLocation(city.name)} key={city.lat}>
                <p className="location_city">{city.name}</p>
                <p className="location_country">{city.country}</p>
                {city.state && <p className="location_state">{city.state}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      <button>Post</button>
    </main>
  );
};

export default Upload;

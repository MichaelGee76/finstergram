import { useState, useEffect, useContext } from "react";
import "./Upload.css";
import ky from "ky";
import { useNavigate } from "react-router-dom";
import AddLocation from "../../components/AddLocation/AddLocation";
import { backendUrl } from "../../api/api";
import Resizer from "react-image-file-resizer";
import {
  TokenDataContext,
  UserDataContext,
} from "../../components/context/Context";
import UploadImgFilter from "../../components/UploadImgFilter/UploadImgFilter";

// -- Img verkleinern vor dem hochladen
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500, // maximale Breite
      500, // maximale Höhe
      "JPEG", // Ausgabeformat
      90, // Qualitätsstufe
      0, // Drehung
      (uri) => {
        resolve(uri);
      },
      "base64" // Ausgabe-Typ
    );
  });

const filterMethods = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 50,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 50,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 180,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0.7,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

const Upload = () => {
  const [postUpload, setPostUpload] = useState({
    userId: "user._id",
    picture: null,
    description: "",
    hashtags: [],
  });
  const [hashtag, setHashtag] = useState();
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [filterScale, setFilterScale] = useState(50);
  const [filterValues, setFilterValues] = useState({
    property: "",
    value: "",
    range: {
      min: 0,
      max: 0,
    },
    unit: "",
  });
  const { user } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);
  console.log(filterValues);
  const navigate = useNavigate();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    try {
      const resizedBase64 = await resizeFile(file);
      setPostUpload({ ...postUpload, picture: resizedBase64 });
    } catch (error) {
      console.error(error);
    }
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

  const postHandler = async (event) => {
    event.preventDefault();

    if (!postUpload.picture) {
      setError("Please upload a picture first");
    }

    try {
      const response = await ky
        .post(`${backendUrl}/posts/newPost`, {
          json: postUpload,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      console.log(response);
      setPostUpload({
        userId: "user._id",
        picture: null,
        description: "",
        hashtags: [],
      });
      setSuccessMessage("Upload Successfully");
      setError("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(filterMethods);

  const filterMainImg = () => {};
  return (
    <main className="upload_section">
      <div className="upload_heading">
        <button onClick={() => navigate(-1)} className="nobtn">
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
        {" "}
        {postUpload.picture ? (
          <img
            className="upload_img"
            src={postUpload.picture}
            style={{
              filter: `${filterValues.property}(${filterValues.value}${filterValues.unit})`,
              WebkitFilterVfilterValues: `${filterValues.property}(${filterValues.value}${filterValues.unit})`,
            }}
          />
        ) : (
          <label htmlFor="img_upload">
            <img src="./img/CameraBright.svg" alt="" />
            <p>Upload</p>
          </label>
        )}
      </div>
      <input className="filter_range" type="range" />
      {postUpload.picture && (
        <section className="img_filter_sec">
          <article>
            {filterMethods.map((filter) => (
              <UploadImgFilter
                setFilterValues={setFilterValues}
                key={filter.property}
                img={postUpload.picture}
                filter={filter}
                scale={filterScale}
              />
            ))}
          </article>
        </section>
      )}

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
        <img className="upload_profile_img" src={user.profilePicture} alt="" />
        <textarea
          className="auto-resize-textarea"
          type="text"
          placeholder="Write a caption"
          value={postUpload.description}
          onChange={(event) =>
            setPostUpload({ ...postUpload, description: event.target.value })
          }
        />
        <img
          style={postUpload.picture ? { opacity: "1" } : { opacity: "0" }}
          className="upload_mini_img"
          src={postUpload.picture}
          alt=""
        />
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
          {hashtag && (
            <button className="addbtn" onClick={addHashtag}>
              Add
            </button>
          )}
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
      <AddLocation setPostUpload={setPostUpload} postUpload={postUpload} />
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button onClick={postHandler} className="postbtn">
        Post
      </button>
    </main>
  );
};

export default Upload;

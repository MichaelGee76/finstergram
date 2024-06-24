import { useState, useEffect, useContext, useRef } from "react";
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
// const resizeFile = (file) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       1000, // maximale Breite
//       500, // maximale Höhe
//       "JPEG", // Ausgabeformat
//       90, // Qualitätsstufe
//       0, // Drehung
//       (uri) => {
//         resolve(uri);
//       },
//       "base64" // Ausgabe-Typ
//     );
//   });

const resizeFile = (base64Str) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;

    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;
      const maxWidth = 600; // Maximal zulässige Breite
      let newWidth = originalWidth;
      let newHeight = originalHeight;

      // Skaliere das Bild proportional, wenn die Breite größer als maxWidth ist
      if (newWidth > maxWidth) {
        const scaleFactor = maxWidth / newWidth;
        newWidth = maxWidth;
        newHeight = newHeight * scaleFactor;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Zeichne das Bild auf das Canvas, skaliert auf die neue Größe
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      let resizedBase64 = canvas.toDataURL("image/jpeg");

      // Sicherstellen, dass das Bild nicht kleiner als 50 KB ist
      let quality = 0.9;
      while (resizedBase64.length / 1024 > 50 && quality > 0.1) {
        resizedBase64 = canvas.toDataURL("image/jpeg", quality);
        quality -= 0.1;
      }

      resolve(resizedBase64);
    };
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
  const [isLoaded, setIsLoaded] = useState(false);
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
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // console.log(isLoaded);

  // img mit filtern abspeichern
  useEffect(() => {
    if (postUpload.picture) {
      const img = new Image();
      img.src = postUpload.picture;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.filter = `${filterValues.property}(${filterValues.value}${filterValues.unit})`;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        setIsLoaded(true);
      };
    }
  }, [postUpload.picture, filterValues]);

  const readFileAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    try {
      const base64 = await readFileAsDataURL(file);
      setPostUpload({ ...postUpload, picture: base64 });
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
    if (isLoaded) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL("image/png");

      try {
        const resizedBase64 = await resizeFile(dataURL, 60); // Verkleinern um 50%
        const response = await ky
          .post(`${backendUrl}/posts/newPost`, {
            json: { ...postUpload, picture: resizedBase64 },
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
    } else {
      setError("Please upload a picture first");
    }
  };
  // console.log(filterValues.range.min? filterValues.range.min);
  return (
    <main className="upload_section">
      <div className="upload_heading">
        <button onClick={() => navigate(-1)} className="nobtn">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7931 11.194L11.2025 16.7846"
              stroke="var(--main-text)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.7999 16.792L11.1999 11.192"
              stroke="var(--main-text)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.20834 14.0002C3.20834 22.0933 5.90684 24.7918 14 24.7918C22.0932 24.7918 24.7917 22.0933 24.7917 14.0002C24.7917 5.907 22.0932 3.2085 14 3.2085C5.90684 3.2085 3.20834 5.907 3.20834 14.0002Z"
              stroke="var(--main-text)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
        {postUpload.picture ? (
          <img
            ref={imgRef}
            className="upload_img"
            src={postUpload.picture}
            style={{
              filter: `${filterValues.property}(${filterValues.value}${filterValues.unit})`,
              WebkitFilterVfilterValues: `${filterValues.property}(${filterValues.value}${filterValues.unit})`,
            }}
          />
        ) : (
          <label htmlFor="img_upload">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.3467 7.2758C20.3933 7.35738 20.475 7.41565 20.58 7.41565C23.38 7.41565 25.6667 9.69978 25.6667 12.4967V19.419C25.6667 22.2159 23.38 24.5 20.58 24.5H7.42001C4.60834 24.5 2.33334 22.2159 2.33334 19.419V12.4967C2.33334 9.69978 4.60834 7.41565 7.42001 7.41565C7.51334 7.41565 7.60668 7.36903 7.64168 7.2758L7.71168 7.13596C7.7519 7.05131 7.79318 6.96436 7.83508 6.87609C8.13354 6.24743 8.46374 5.55193 8.66834 5.14317C9.20501 4.09434 10.115 3.51165 11.2467 3.5H16.7417C17.8733 3.51165 18.795 4.09434 19.3317 5.14317C19.5154 5.5103 19.7954 6.1017 20.0653 6.67168C20.1209 6.78922 20.1762 6.90586 20.23 7.01942L20.3467 7.2758ZM19.495 11.7508C19.495 12.3335 19.9617 12.7997 20.545 12.7997C21.1283 12.7997 21.6067 12.3335 21.6067 11.7508C21.6067 11.1681 21.1283 10.6903 20.545 10.6903C19.9617 10.6903 19.495 11.1681 19.495 11.7508ZM11.9817 13.5572C12.53 13.0094 13.2417 12.7181 14 12.7181C14.7583 12.7181 15.47 13.0094 16.0067 13.5455C16.5433 14.0816 16.835 14.7925 16.835 15.5499C16.8233 17.1115 15.5633 18.3818 14 18.3818C13.2417 18.3818 12.53 18.0905 11.9933 17.5544C11.4567 17.0183 11.165 16.3074 11.165 15.5499V15.5383C11.1533 14.8041 11.445 14.0932 11.9817 13.5572ZM17.2317 18.7897C16.4033 19.6171 15.26 20.1299 14 20.1299C12.775 20.1299 11.6317 19.6521 10.7567 18.7897C9.89334 17.9156 9.41501 16.7736 9.41501 15.5499C9.40334 14.338 9.88168 13.1959 10.745 12.3219C11.62 11.4478 12.775 10.97 14 10.97C15.225 10.97 16.38 11.4478 17.2433 12.3102C18.1067 13.1842 18.585 14.338 18.585 15.5499C18.5733 16.8202 18.06 17.9623 17.2317 18.7897Z"
                fill="#FAFAFA"
              />
            </svg>

            <p style={{ color: "white" }}>Upload</p>
          </label>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {filterValues.property && (
        <input
          className="filter_range"
          type="range"
          min={filterValues.range.min}
          max={filterValues.range.max}
          value={filterValues.value}
          onChange={(event) =>
            setFilterValues({ ...filterValues, value: event.target.value })
          }
        />
      )}

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
          <svg
            width="17"
            height="21"
            viewBox="0 0 17 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.45954 3.51189V0.535111C8.45954 0.0549844 7.88339 -0.179744 7.55264 0.161679L3.49824 4.20541C3.28485 4.4188 3.28485 4.74955 3.49824 4.96294L7.54197 9.00667C7.88339 9.33742 8.45954 9.10269 8.45954 8.62257V5.64579C12.4393 5.64579 15.5867 9.29474 14.7119 13.4238C14.2104 15.8458 12.2472 17.7983 9.8359 18.2998C6.0269 19.1 2.63401 16.486 2.12188 12.9544C2.04719 12.4422 1.59907 12.0475 1.07627 12.0475C0.436103 12.0475 -0.0760318 12.6129 0.00932398 13.2531C0.670831 17.937 5.13067 21.4046 10.1773 20.423C13.5062 19.7722 16.1842 17.0941 16.8351 13.7653C17.8914 8.29181 13.7303 3.51189 8.45954 3.51189Z"
              fill="var(--main-text)"
            />
          </svg>

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
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2639 8.73389H7.77789L7.01477 11.8459L6.25165 14.9579H12.7174L14.2639 8.73389ZM7.48786 14.0753L8.61387 10.1343H12.7174L11.9919 14.0753H7.48786Z"
                fill="var(--main-text)"
              />
              <path
                d="M1.12601 23.6462H5.63006L7.16277 17.4532H11.1038L9.5711 23.6462H14.0751L15.7642 17.4532H21V13.9504H16.3272L17.4532 9.69876H21V6.19306H18.0162L19.7052 0H15.7642L14.0751 6.19306H9.5711L11.2601 0H6.92485L5.5 6.19306H0V9.5711L4.8409 9.69876L3.76976 13.9504H0.250439V17.2094H2.95572L1.12601 23.6462ZM0.98936 16.4704V14.9578H4.52534L6.05159 8.73381H0.98936V7.22127H6.41526L7.9956 0.738921H9.96133L8.38026 7.22127H14.8648L16.4459 0.738921H18.4289L16.8478 7.22127H20.0922V8.73381H16.4848L14.9377 14.9578H20.0922V16.4704H14.5762L12.9951 22.9073H11.0286L12.591 16.4704H6.12663L4.54556 22.9073H2.58056L4.16162 16.4704H0.98936Z"
                fill="var(--main-text)"
              />
            </svg>
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

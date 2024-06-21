import { useContext, useState } from "react";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { TokenDataContext } from "../../components/context/Context";
import Resizer from "react-image-file-resizer";

import "./EditPopup.css";
import ky from "ky";
import { backendUrl } from "../../api/api";

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

const EditPopup = ({ togglePopup, userProfile, setUserProfile, id, setEditPopup }) => {
  const { token } = useContext(TokenDataContext);
  const userData = userProfile.userData;
  const [newPicture, setNewPicture] = useState(false);

  const [userEdit, setUserEdit] = useState({
    profilePicture: userData.profilePicture,
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName,
    birthday: userData.birthday,
    userBio: userData.userBio,
    phone: userData.phone,
    website: userData.website,
    profession: userData.profession,
    gender: userData.gender,
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    try {
      const resizedBase64 = await resizeFile(file);
      setUserEdit({ ...userEdit, profilePicture: resizedBase64 });
      setNewPicture(resizedBase64);
    } catch (error) {
      console.error(error);
    }
  };

  const [date, setDate] = useState("");

  const handleDateChange = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };

    const formattedDate = date.toLocaleDateString("de-DE", options);
    setDate(formattedDate);
    setUserEdit({ ...userEdit, birthday: formattedDate });
  };

  const editProfileSave = async () => {
    const res = await ky
      .patch(`${backendUrl}/users/${id}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        json: userEdit,
      })
      .json();

    setUserEdit(res.result);
    setUserProfile({ ...userProfile, userData: res.result });
    setEditPopup(false);
  };
  console.log(userEdit);

  return (
    <section className="profile_edit">
      <div className="edit_popup ">
        <div className="profile_title">
          <svg
            onClick={togglePopup}
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3333 8.32007C19.3333 8.76305 19.0042 9.12914 18.5771 9.18708L18.4583 9.19507L0.958342 9.19507C0.475093 9.19507 0.0833422 8.80332 0.0833422 8.32007C0.0833422 7.87709 0.412522 7.511 0.83961 7.45306L0.958342 7.44507L18.4583 7.44507C18.9416 7.44507 19.3333 7.83682 19.3333 8.32007Z"
              fill="#212121"
            />
            <path
              d="M8.63383 14.7284C8.97628 15.0694 8.97747 15.6234 8.6365 15.9658C8.32652 16.2771 7.84048 16.3064 7.49738 16.053L7.39906 15.9685L0.34073 8.94048C0.0284876 8.62958 8.2657e-05 8.14178 0.255529 7.79869L0.340679 7.70043L7.39901 0.671262C7.74143 0.330261 8.29545 0.331408 8.63645 0.673824C8.94645 0.985111 8.97368 1.47128 8.71881 1.8133L8.63389 1.91126L2.19851 8.32078L8.63383 14.7284Z"
              fill="#212121"
            />
          </svg>
          <h1>Edit Profile</h1>
        </div>

        <div className="profile_img edit_img">
          <img src={newPicture ? newPicture : userData.profilePicture} />
          <input
            type="file"
            id="edit_profilePicture"
            style={{ display: "none" }}
            accept=".jpg, .png, .jpeg"
            onChange={handleImageChange}
          />
          <label htmlFor="edit_profilePicture">
            <svg
              className="edit_img_svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.8316 2.51292C22.6298 2.40054 24.4029 3.02489 25.7391 4.24862C26.9628 5.58474 27.5872 7.35791 27.4873 9.16853V20.8315C27.5997 22.6421 26.9628 24.4153 25.7516 25.7514C24.4154 26.9751 22.6298 27.5995 20.8316 27.4871H9.16859C7.35795 27.5995 5.58477 26.9751 4.24864 25.7514C3.02489 24.4153 2.40053 22.6421 2.51292 20.8315V9.16853C2.40053 7.35791 3.02489 5.58474 4.24864 4.24862C5.58477 3.02489 7.35795 2.40054 9.16859 2.51292H20.8316ZM13.7264 21.0562L22.1303 12.6275C22.892 11.8533 22.892 10.6045 22.1303 9.84283L20.5069 8.21951C19.7327 7.44532 18.484 7.44532 17.7098 8.21951L16.8732 9.06864C16.7483 9.19351 16.7483 9.40579 16.8732 9.53066C16.8732 9.53066 18.8586 11.5036 18.8961 11.5536C19.0335 11.7034 19.1209 11.9032 19.1209 12.128C19.1209 12.5775 18.7587 12.9521 18.2967 12.9521C18.0844 12.9521 17.8846 12.8647 17.7473 12.7274L15.6619 10.6545C15.562 10.5546 15.3872 10.5546 15.2873 10.6545L9.33092 16.6108C8.91884 17.0229 8.68159 17.5723 8.6691 18.1592L8.59418 21.1187C8.59418 21.281 8.64413 21.4308 8.75651 21.5432C8.8689 21.6556 9.01874 21.718 9.18107 21.718H12.1156C12.7149 21.718 13.2894 21.4808 13.7264 21.0562Z"
                fill="#FF4D67"
              />
            </svg>
          </label>
        </div>
        <div className="edit_inputs">
          <input
            placeholder="firstname"
            type="text"
            value={userEdit.firstName}
            onChange={(e) => setUserEdit({ ...userEdit, firstName: e.target.value })}
          />
          <input
            placeholder="lastname"
            type="text"
            value={userEdit.lastName}
            onChange={(e) => setUserEdit({ ...userEdit, lastName: e.target.value })}
          />
          <input
            placeholder="username"
            type="text"
            value={userEdit.userName}
            onChange={(e) => setUserEdit({ ...userEdit, userName: e.target.value })}
          />
          <div className="calendar">
            <CustomDatePicker onDateChange={handleDateChange} />
            <input placeholder="birthday" type="text" value={userEdit.birthday} readOnly />
          </div>
          <input
            placeholder="biography"
            type="text"
            value={userEdit.userBio}
            onChange={(e) => setUserEdit({ ...userEdit, userBio: e.target.value })}
          />
          <input
            placeholder="phone"
            type="tel"
            value={userEdit.phone}
            onChange={(e) => setUserEdit({ ...userEdit, phone: e.target.value })}
          />

          <input
            placeholder="website"
            type="text"
            value={userEdit.website}
            onChange={(e) => setUserEdit({ ...userEdit, website: e.target.value })}
          />
          <input
            placeholder="profession"
            type="text"
            value={userEdit.profession}
            onChange={(e) => setUserEdit({ ...userEdit, profession: e.target.value })}
          />
          <select
            id="gender"
            name="gender"
            value={userEdit.gender}
            onChange={(e) => setUserEdit({ ...userEdit, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Divers">Divers</option>
          </select>
          <button onClick={editProfileSave} className="button_unclicked">
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditPopup;

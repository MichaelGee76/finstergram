import "./AddLocation.css";
import { useEffect, useState } from "react";
import ky from "ky";

const AddLocation = ({ setPostUpload, postUpload }) => {
  const [location, setLocation] = useState();
  const [places, setPlaces] = useState();

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
  // console.log(places);
  // console.log(postUpload);

  const addLocation = (city) => {
    setPostUpload({ ...postUpload, location: city });
    setLocation("");
  };
  return (
    <section className="upload_location_section">
      <form action="">
        <div>
          <label htmlFor="">
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
                d="M16.9286 12.4956C16.9286 10.8841 15.6228 9.57837 14.0113 9.57837C12.401 9.57837 11.0952 10.8841 11.0952 12.4956C11.0952 14.1059 12.401 15.4117 14.0113 15.4117C15.6228 15.4117 16.9286 14.1059 16.9286 12.4956Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.9994 24.5C10.6184 24.5 5.25 18.6184 5.25 12.3651C5.25 7.46954 9.16662 3.5 13.9994 3.5C18.8322 3.5 22.75 7.46954 22.75 12.3651C22.75 18.6184 17.3816 24.5 13.9994 24.5Z"
                stroke="var(--main-text)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>
          <input
            type="text"
            placeholder="Add Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        {/* <button onClick={addHashtag}>Add</button> */}
        <p>{postUpload.location}</p>
      </form>
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
    </section>
  );
};

export default AddLocation;

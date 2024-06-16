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
            <img src="./img/Location.svg" alt="" />
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
            <div onClick={() => addLocation(city.name)} key={city.lat}>
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

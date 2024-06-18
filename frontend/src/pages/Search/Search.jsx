import { useEffect, useState } from "react";
import "./Search.css";
import ky from "ky";
import { backendUrl } from "../../api/api";
const Search = () => {
  const [searchToggle, setSearchToggle] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchHandler = async () => {
      if (searchToggle) {
        const res = await ky.get(`${backendUrl}/users`).json();

        setSearchResults(res.result);
      }
    };
    searchHandler();
  }, []);

  return (
    <main className="search_site">
      <form>
        <label htmlFor="">
          <img src="./img/SearchUnclicked.svg" alt="" />
        </label>
        <input
          type="text"
          placeholder={searchToggle ? "username.." : "hashtag.."}
        />
        {/* <button></button> */}
      </form>

      <div className="search_btns_wrapper">
        <button onClick={() => setSearchToggle(true)}>
          <img
            src={
              searchToggle
                ? "./img/ProfileClicked.svg"
                : "./img/ProfileUnclicked.svg"
            }
            alt=""
          />
        </button>
        <button onClick={() => setSearchToggle(false)}>
          <img
            src={
              searchToggle
                ? "./img/HashtagUnclicked.svg"
                : "./img/HashtagClicked.svg"
            }
            alt=""
          />
        </button>
        <div className="red_line"></div>
      </div>
      <section className="search_resuls"></section>
    </main>
  );
};

export default Search;

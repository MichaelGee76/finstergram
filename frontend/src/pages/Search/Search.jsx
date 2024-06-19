import { useContext, useEffect, useState } from "react";
import "./Search.css";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Link } from "react-router-dom";
const Search = () => {
  const [searchToggle, setSearchToggle] = useState(true);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [hashtagSearchResults, setHashtagSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { token } = useContext(TokenDataContext);

  useEffect(() => {
    const searchHandler = async () => {
      if (searchToggle) {
        const res = await ky
          .get(`${backendUrl}/users`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();

        setUserSearchResults(res.result);
      } else {
        const res = await ky
          .get(`${backendUrl}/posts/hashtags`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .json();

        setHashtagSearchResults(res.result);
      }
    };
    searchHandler();
  }, [searchToggle]);

  // console.log(userSearchResults);
  // console.log(hashtagSearchResults);
  // console.log(searchToggle);

  return (
    <main className="search_site">
      <div className="search_res_upper">
        <form>
          <label htmlFor="">
            <img src="./img/SearchUnclicked.svg" alt="" />
          </label>
          <input
            type="text"
            placeholder={searchToggle ? "username.." : "hashtag.."}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
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
      </div>
      <section className="search_results">
        {searchToggle
          ? userSearchResults?.map(
              (result) =>
                searchInput &&
                result.userName.includes(searchInput) && (
                  <SearchResult key={result._id} result={result} />
                )
            )
          : hashtagSearchResults?.map(
              (hashtag, index) =>
                searchInput &&
                hashtag.includes(searchInput) && (
                  <Link
                    to={`/hashtagposts/${hashtag}`}
                    className="hashtag_link"
                    key={index}
                  >
                    #{hashtag}
                  </Link>
                )
            )}
      </section>
    </main>
  );
};

export default Search;

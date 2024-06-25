import { useContext, useEffect, useState } from "react";
import "./Search.css";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";
import SearchResult from "../../components/SearchResult/SearchResult";
import { Link } from "react-router-dom";
import DiscoverFeed from "../../components/DiscoverFeed/DiscoverFeed";

const Search = () => {
  const [searchToggle, setSearchToggle] = useState(true);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [hashtagSearchResults, setHashtagSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [changeHeaderZ, setChangeHeaderZ] = useState(false);
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

  return (
    <main className="search_site">
      <div className={changeHeaderZ ? "lower_zindex" : "search_res_upper"}>
        <form>
          <label htmlFor="">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11.8916"
                cy="11.7666"
                r="8.98856"
                stroke="var(--icons-grey)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.1433 18.4851L21.6673 22"
                stroke="var(--icons-grey)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
            {searchToggle ? (
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.919 7.29105C17.919 10.2281 15.5641 12.5831 12.625 12.5831C9.6869 12.5831 7.33101 10.2281 7.33101 7.29105C7.33101 4.35402 9.6869 2 12.625 2C15.5641 2 17.919 4.35402 17.919 7.29105ZM12.625 22C8.28737 22 4.625 21.295 4.625 18.575C4.625 15.8539 8.31038 15.1739 12.625 15.1739C16.9636 15.1739 20.625 15.8789 20.625 18.599C20.625 21.32 16.9396 22 12.625 22Z"
                  fill="var(--mid-pink)"
                />
              </svg>
            ) : (
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.6097 15.3462C8.74213 15.3462 5.43927 15.931 5.43927 18.2729C5.43927 20.6148 8.72117 21.2205 12.6097 21.2205C16.4774 21.2205 19.7793 20.6348 19.7793 18.2938C19.7793 15.9529 16.4983 15.3462 12.6097 15.3462Z"
                  stroke="var(--icons-grey)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.6098 12.0059C15.1479 12.0059 17.205 9.94779 17.205 7.40969C17.205 4.8716 15.1479 2.81445 12.6098 2.81445C10.0717 2.81445 8.01358 4.8716 8.01358 7.40969C8.00501 9.93922 10.0488 11.9973 12.5774 12.0059H12.6098Z"
                  stroke="var(--icons-grey)"
                  strokeWidth="1.42857"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <button onClick={() => setSearchToggle(false)}>
            {searchToggle ? (
              <svg
                width="21"
                height="24"
                viewBox="0 0 21 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2639 8.73389H7.77789L7.01477 11.8459L6.25165 14.9579H12.7174L14.2639 8.73389ZM7.48786 14.0753L8.61387 10.1343H12.7174L11.9919 14.0753H7.48786Z"
                  fill="var(--icons-grey)"
                />
                <path
                  d="M1.12601 23.6462H5.63006L7.16277 17.4532H11.1038L9.5711 23.6462H14.0751L15.7642 17.4532H21V13.9504H16.3272L17.4532 9.69876H21V6.19306H18.0162L19.7052 0H15.7642L14.0751 6.19306H9.5711L11.2601 0H6.92485L5.5 6.19306H0V9.5711L4.8409 9.69876L3.76976 13.9504H0.250439V17.2094H2.95572L1.12601 23.6462ZM0.98936 16.4704V14.9578H4.52534L6.05159 8.73381H0.98936V7.22127H6.41526L7.9956 0.738921H9.96133L8.38026 7.22127H14.8648L16.4459 0.738921H18.4289L16.8478 7.22127H20.0922V8.73381H16.4848L14.9377 14.9578H20.0922V16.4704H14.5762L12.9951 22.9073H11.0286L12.591 16.4704H6.12663L4.54556 22.9073H2.58056L4.16162 16.4704H0.98936Z"
                  fill="var(--icons-grey)"
                />
              </svg>
            ) : (
              <svg
                width="21"
                height="24"
                viewBox="0 0 21 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2639 8.73389H7.77789L7.01477 11.8459L6.25165 14.9579H12.7174L14.2639 8.73389ZM7.48786 14.0753L8.61387 10.1343H12.7174L11.9919 14.0753H7.48786Z"
                  fill="var(--mid-pink)"
                />
                <path
                  d="M1.12601 23.6462H5.63006L7.16277 17.4532H11.1038L9.5711 23.6462H14.0751L15.7642 17.4532H21V13.9504H16.3272L17.4532 9.69876H21V6.19306H18.0162L19.7052 0H15.7642L14.0751 6.19306H9.5711L11.2601 0H6.92485L5.5 6.19306H0V9.5711L4.8409 9.69876L3.76976 13.9504H0.250439V17.2094H2.95572L1.12601 23.6462ZM0.98936 16.4704V14.9578H4.52534L6.05159 8.73381H0.98936V7.22127H6.41526L7.9956 0.738921H9.96133L8.38026 7.22127H14.8648L16.4459 0.738921H18.4289L16.8478 7.22127H20.0922V8.73381H16.4848L14.9377 14.9578H20.0922V16.4704H14.5762L12.9951 22.9073H11.0286L12.591 16.4704H6.12663L4.54556 22.9073H2.58056L4.16162 16.4704H0.98936Z"
                  fill="var(--mid-pink)"
                />
              </svg>
            )}
          </button>
          <div className="red_line"></div>
        </div>
      </div>
      <section className={changeHeaderZ ? "higher_zindex" : "search_results"}>
        {searchInput ? (
          searchToggle ? (
            userSearchResults?.map(
              (result) =>
                searchInput &&
                result.userName
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) && (
                  <SearchResult key={result._id} result={result} />
                )
            )
          ) : (
            hashtagSearchResults?.map(
              (hashtag, index) =>
                searchInput &&
                hashtag
                  .toLowerCase()
                  .includes(searchInput.toLowerCase().replace(/^#/, "")) && (
                  <Link
                    to={`/hashtagposts/${hashtag}`}
                    className="hashtag_link"
                    key={index}
                  >
                    #{hashtag}
                  </Link>
                )
            )
          )
        ) : (
          <DiscoverFeed
            changeHeaderZ={changeHeaderZ}
            setChangeHeaderZ={setChangeHeaderZ}
          />
        )}
      </section>
    </main>
  );
};

export default Search;

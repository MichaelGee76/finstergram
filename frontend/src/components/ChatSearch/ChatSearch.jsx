import { useState } from "react";
import "./ChatSearch.css";

const ChatSearch = ({ searchInput, setSearchInput }) => {
  return (
    <form className="chat_search" action="">
      <label htmlFor="">
        {/*   <img src="./img/SearchUnclicked.svg" alt="" /> */}

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
        placeholder="Search chats.."
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </form>
  );
};

export default ChatSearch;

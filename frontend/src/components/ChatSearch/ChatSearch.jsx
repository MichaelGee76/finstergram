import { useState } from "react";
import "./ChatSearch.css";

const ChatSearch = ({ searchInput, setSearchInput }) => {
  return (
    <form className="chat_search" action="">
      <label htmlFor="">
        <img src="./img/SearchUnclicked.svg" alt="" />
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

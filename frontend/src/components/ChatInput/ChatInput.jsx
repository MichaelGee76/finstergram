import "./ChatInput.css";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../components/context/Context";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

const ChatInput = ({ setChatUpd }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [newMessage, setNewMessage] = useState();
  const { token } = useContext(TokenDataContext);
  const { id } = useParams();

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    if (newMessage) {
      const res = await ky
        .post(`${backendUrl}/message/newMessage/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          json: { text: newMessage },
        })
        .json();
      setChatUpd((prev) => !prev);
      setNewMessage("");
    } else {
      setErrorMessage("Please type a message first");
    }
  };
  return (
    <form className="send_message" action="">
      <input
        type="text"
        placeholder={errorMessage ? errorMessage : "Message.."}
        value={newMessage}
        onChange={(e) => setNewMessage(() => e.target.value)}
      />
      <button onClick={sendMessageHandler}>Send</button>
    </form>
  );
};

export default ChatInput;

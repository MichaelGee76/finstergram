import { useContext, useEffect, useState } from "react";
import "./Inbox.css";
import { TokenDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";

const Inbox = () => {
  const { token } = useContext(TokenDataContext);
  const [inbox, setInbox] = useState([]);
  useEffect(() => {
    const inboxHandler = async () => {
      const res = await ky
        .get(`${backendUrl}/users/inbox`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setInbox(res.result);
    };
    inboxHandler();
  }, []);

  console.log(inbox);
  return <div></div>;
};

export default Inbox;

import { useContext, useEffect, useState } from "react";
import "./Inbox.css";
import { TokenDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";
import InboxElement from "../InboxElement/InboxElement";

const Inbox = () => {
  const { token } = useContext(TokenDataContext);
  const [inbox, setInbox] = useState([]);
  const [showInbox, setShowInbox] = useState(false);
  const [newInboxElements, setNewInboxElements] = useState();

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
      // setNewInboxElements(() =>
      //   inbox.filter((element) => element.inboxSeen == false)
      // );
      setNewInboxElements(inbox.filter((element) => !element.inboxSeen));
      setInbox(res.result);
    };
    inboxHandler();
  }, []);

  const inboxToggleHandler = async () => {
    setShowInbox((showInbox) => !showInbox);
    const res = await ky
      .patch(`${backendUrl}/users/inbox/updateInbox`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
  };

  console.log(newInboxElements);

  return (
    <section className="inbox_sec">
      <div onClick={inboxToggleHandler} className="inbox_icon_wrapper">
        <img src="/img/Heart.svg" alt="" />
        {newInboxElements?.length > 0 && (
          <div className="new_inbox_wrapper">
            <div className="inbox_dot"></div>
          </div>
        )}
      </div>
      {showInbox && (
        <article>
          <div className="inbox_upper">
            <img
              onClick={() => setShowInbox((showInbox) => !showInbox)}
              src="/img/BackArrowLeft.svg"
              alt=""
            />
            <h2>Notifications</h2>
          </div>

          {inbox?.map((element) => (
            <InboxElement key={element._id} element={element} />
          ))}
        </article>
      )}
    </section>
  );
};

export default Inbox;

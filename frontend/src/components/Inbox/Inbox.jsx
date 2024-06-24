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
  const [newInboxElements, setNewInboxElements] = useState(false);

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

      setInbox(res.result);
      setNewInboxElements(res.result.filter((element) => !element.inboxSeen));
    };
    inboxHandler();
  }, [showInbox]);

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

  return (
    <section className="inbox_sec">
      <div onClick={inboxToggleHandler} className="inbox_icon_wrapper">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.4089 14.5207C2.15707 10.6123 3.62124 5.75318 7.7244 4.43251C9.88274 3.73601 12.5462 4.31701 14.0594 6.40418C15.4862 4.24001 18.2267 3.74068 20.3827 4.43251C24.4847 5.75318 25.9571 10.6123 24.7064 14.5207C22.7581 20.7157 15.9599 23.9427 14.0594 23.9427C12.1601 23.9427 5.42257 20.788 3.4089 14.5207Z"
            stroke="var(--main-text)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.42 8.82471C19.8282 8.96937 20.709 10.0859 20.6565 11.6504"
            stroke="var(--main-text)"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

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

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

  console.log(inbox);

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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.4089 14.5207C2.15707 10.6123 3.62124 5.75318 7.7244 4.43251C9.88274 3.73601 12.5462 4.31701 14.0594 6.40418C15.4862 4.24001 18.2267 3.74068 20.3827 4.43251C24.4847 5.75318 25.9571 10.6123 24.7064 14.5207C22.7581 20.7157 15.9599 23.9427 14.0594 23.9427C12.1601 23.9427 5.42257 20.788 3.4089 14.5207Z"
            stroke="var(--main-text)"
            strokeWidth="1.5"
            strokeLinecap="round"
            stroke-Linejoin="round"
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
            {/*   <img
              onClick={() => setShowInbox((showInbox) => !showInbox)}
              src="/img/BackArrowLeft.svg"
              alt=""
            /> */}
            <svg
              onClick={() => setShowInbox((showInbox) => !showInbox)}
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3333 8.32007C19.3333 8.76305 19.0042 9.12914 18.5771 9.18708L18.4583 9.19507L0.958342 9.19507C0.475093 9.19507 0.0833422 8.80332 0.0833422 8.32007C0.0833422 7.87709 0.412522 7.511 0.83961 7.45306L0.958342 7.44507L18.4583 7.44507C18.9416 7.44507 19.3333 7.83682 19.3333 8.32007Z"
                fill="var(--main-text)"
              />
              <path
                d="M8.63383 14.7284C8.97628 15.0694 8.97747 15.6234 8.6365 15.9658C8.32652 16.2771 7.84048 16.3064 7.49738 16.053L7.39906 15.9685L0.34073 8.94048C0.0284876 8.62958 8.2657e-05 8.14178 0.255529 7.79869L0.340679 7.70043L7.39901 0.671262C7.74143 0.330261 8.29545 0.331408 8.63645 0.673824C8.94645 0.985111 8.97368 1.47128 8.71881 1.8133L8.63389 1.91126L2.19851 8.32078L8.63383 14.7284Z"
                fill="var(--main-text)"
              />
            </svg>

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

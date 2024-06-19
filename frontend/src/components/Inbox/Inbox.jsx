import { useContext, useEffect, useState } from "react";
import "./Inbox.css";
import { TokenDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";

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
      setNewInboxElements(() =>
        inbox.filter((element) => element.inboxSeen == false)
      );
      setInbox(res.result);
    };
    inboxHandler();
  }, []);

  const inboxToggleHandler = async () => {
    setShowInbox((showInbox) => !showInbox);
    // const res = await ky
    //   .patch(`${backendUrl}/users/inbox/updateInbox`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .json();
  };

  console.log(newInboxElements);

  console.log(inbox);
  return (
    <section className="inbox_sec">
      <div className="inbox_icon_wrapper">
        <img onClick={inboxToggleHandler} src="/img/Heart.svg" alt="" />
        {newInboxElements && (
          <div className="new_inbox_wrapper">
            <div className="inbox_dot"></div>
            <p>{newInboxElements.length}</p>
          </div>
        )}
      </div>
      {showInbox && (
        <article>
          {inbox?.map((element) =>
            element.postId ? (
              <div key={element._id}>
                <Link to={`profile/${element.userId._id}`}>
                  <img
                    className="inbox_profileimg"
                    src={element.userId.profilePicture}
                    alt=""
                  />
                  <p>{element.userId.userName}</p>
                </Link>
                <p>
                  {element.commentId ? `liked your comment` : `liked your Post`}
                </p>
                <Link to={`profile/${element.userId._id}`}>
                  <img
                    className="inbox_postimg"
                    src={element.postId.picture}
                    alt=""
                  />
                </Link>
              </div>
            ) : (
              <div className="inbox_follow_wrapper" key={element._id}>
                <Link>
                  <img
                    className="inbox_profileimg"
                    src={element.userId.profilePicture}
                    alt=""
                  />
                  <p>{element.userId.userName}</p>
                </Link>
                <p>{`${element.userId.userName} follows you`}</p>
              </div>
            )
          )}
        </article>
      )}
    </section>
  );
};

export default Inbox;

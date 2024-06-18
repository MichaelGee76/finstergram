import { Link } from "react-router-dom";
import "./CommentPopUp.css";
import { useContext, useEffect, useState } from "react";
import { TokenDataContext, UserDataContext } from "../context/Context";
import ky from "ky";
import { backendUrl } from "../../api/api";
import Comment from "../Comment/Comment";
import PostComment from "../PostComment/PostComment";

const CommentPopUp = ({
  postData,
  openPopUpHandler,
  saveToggleHandler,
  likeToggleHandler,
  likeToggle,
  saveToggle,
  crementLike,
  setUpdUserFeed,
}) => {
  const [comments, setComments] = useState([]);
  const [commentUpd, setCommentUpd] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const { token } = useContext(TokenDataContext);
  console.log(postData);

  useEffect(() => {
    const getCommentsFromPost = async () => {
      const res = await ky
        .get(`${backendUrl}/comments/allCommentsFromPost/${postData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json();

      setComments(res.result);
    };

    getCommentsFromPost();
  }, [commentUpd]);
  console.log(replyMessage);
  return (
    <section className="cmnt_popup">
      <div className="cmt_upper">
        <div>
          <img
            onClick={() => openPopUpHandler((commentPopUp) => !commentPopUp)}
            src="./img/BackArrowLeft.svg"
            alt=""
          />
          <h3> Comments</h3>
        </div>
        <Link>
          <img src="./img/Messanger.svg" alt="" />
        </Link>
      </div>
      <article className="cmt_userinfos">
        <div className="post_upper">
          <Link
            to={`/profile/${postData.userId._id}`}
            className="post_user_infos"
          >
            <img src={postData.userId.profilePicture} alt="" />
            <div>
              <h3 className="username_post">{postData.userId.userName}</h3>
              <p className="userdescription_post">
                {postData.userId.profession}
              </p>
            </div>
          </Link>
          {user._id === postData.userId._id && (
            <button>
              <img src="./img/MoreCircle.svg" alt="" />
            </button>
          )}
        </div>
        <p className="post_desctext">{postData.description}</p>
        <div className="hashtags_wrapper">
          {postData.hashtags?.map((hashtag, index) => (
            <Link key={index} to={`/search/${hashtag}`}>
              #{hashtag}
            </Link>
          ))}
        </div>
        <p className="posted_date">{postData.postDate.showPostAge}</p>
        <div className="post_reactions">
          <div>
            <img
              onClick={saveToggleHandler}
              src={saveToggle ? "./img/SaveClicked.svg" : "./img/Save.svg"}
              alt=""
            />
          </div>
          <div>
            <img
              onClick={likeToggleHandler}
              src={likeToggle ? "./img/HeartFilled.svg" : "./img/Heart.svg"}
              alt=""
            />

            <p>{Number(crementLike)}</p>
          </div>
          <div>
            <img src="./img/Comments.svg" alt="" />

            <p>{postData.comments}</p>
          </div>
        </div>
      </article>
      <section className="cmnt_section">
        {comments.length > 0 ? (
          comments?.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              postData={postData}
              setReplyMessage={setReplyMessage}
            />
          ))
        ) : (
          <p>No comments yet. Be the first one to leave a comment!</p>
        )}
      </section>
      <PostComment
        setCommentUpd={setCommentUpd}
        postId={postData._id}
        setUpdUserFeed={setUpdUserFeed}
        replyMessage={replyMessage}
      />
    </section>
  );
};

export default CommentPopUp;

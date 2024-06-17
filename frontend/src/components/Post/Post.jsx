import "./Post.css";

const Post = ({ postData }) => {
  console.log(postData);
  return (
    <article className="post_wrapper">
      <div className="post_user_infos">
        <div>
          <img src={postData.userId.profilePicture} alt="" />
          <div>
            <h3>{postData.userId.userName}</h3>
            <p>{postData.userId.profession}</p>
          </div>
        </div>
        <button>
          <img src="./img/MoreCircle.svg" alt="" />
        </button>
      </div>
      <img src={postData.picture} alt="" />
    </article>
  );
};

export default Post;

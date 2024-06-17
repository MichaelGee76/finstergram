import "./Post.css";

const Post = ({ postData }) => {
  return (
    <article className="post_wrapper">
      <div>
        <div>
          <img src="" alt="" />
          <div>
            <h3></h3>
            <p></p>
          </div>
        </div>
        <button>
          <img src="./img/MoreCircle.svg" alt="" />
        </button>
      </div>
    </article>
  );
};

export default Post;

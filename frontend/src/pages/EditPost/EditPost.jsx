import "./EditPost.css";
import { useParams } from "react-router-dom";
const EditPost = () => {
  const [description, setDescription] = useState();
  const [hashtags, setHashtags] = useState();
  const [location, setLocation] = useState();

  const { id } = useParams();

  const handleEditPost = () => {
    const updatedPost = {
      description,
      hashtags,
      location,
    };
  };

  return (
    <section>
      <h1>Edit Post</h1>;
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditPost();
        }}
      >
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="hashtags">Hashtags:</label>
          <input
            type="text"
            id="hashtags"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </section>
  );
};

export default EditPost;

import "./ProfilPosts.css";

const ProfilPosts = ({ activeSection, setActiveSection, posts }) => {
  return (
    <section className="profile_posts">
      {/* tabs for allposts, videos, tagged posts */}
      <div className="profile_tabs">
        <div
          className={`tab ${activeSection === "posts" ? "active" : ""}`}
          onClick={() => setActiveSection("posts")}
        >
          Beiträge
        </div>
        <div
          className={`tab ${activeSection === "videos" ? "active" : ""}`}
          onClick={() => setActiveSection("videos")}
        >
          Videos
        </div>
        <div
          className={`tab ${activeSection === "tagged" ? "active" : ""}`}
          onClick={() => setActiveSection("tagged")}
        >
          Markierungen
        </div>
      </div>
      <div className="profile_content">
        <div
          className="sections"
          style={{
            transform: `translateX(${
              activeSection === "posts" ? "0%" : activeSection === "reels" ? "-100%" : "-200%"
            })`,
          }}
        >
          <div className="section">
            {posts && posts.length > 0 ? (
              posts.map((item) => <img src={item.picture} alt="Beiträge" key={item._id} />)
            ) : (
              <p>Hier sind alle Beiträge.</p>
            )}
          </div>
          <div className="section"></div>
          <div className="section"></div>
        </div>
      </div>
    </section>
  );
};

export default ProfilPosts;

import "./ProfilPosts.css"

const ProfilPosts = ({ activeSection, setActiveSection }) => {
    return ( <section className="profile_posts">
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
            {/* {userState ? userState.map((item)=>) <img src={item.img} alt="Beiträge" /> : <p>Hier sind alle Beiträge.</p>} */}
          </div>
          <div className="section">
            {/* {userState ? <img src={item} alt="Videos" /> : <p>Hier sind alle Videos.</p>} */}
          </div>
          <div className="section">
            {/* {userState ? <img src={item} alt="Markierungen" /> : <p>Hier sind alle Markierungen.</p>} */}
          </div>
        </div>
      </div>
    </section> );
}
 
export default ProfilPosts;
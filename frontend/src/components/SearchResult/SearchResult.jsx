import { Link } from "react-router-dom";
import "./SearchResult.css";
import FollowBtn from "../FollowBtn/FollowBtn";
import { useState } from "react";

const SearchResult = ({ result }) => {
    const [followToggle, setFollowToggle] = useState(result.isFollowed);

    return (
        <Link>
            <div className="post_upper search_res_div">
                <Link to={`/profile/${result._id}`} className="post_user_infos">
                    <img src={result.profilePicture} alt="" />
                    <div>
                        <h3 className="username_post">{result.userName}</h3>
                        <p className="userdescription_post">
                            {result.profession}
                        </p>
                    </div>
                </Link>
                {!followToggle ? (
                    <FollowBtn
                        result={result}
                        followToggle={followToggle}
                        setFollowToggle={setFollowToggle}
                    >
                        Follow
                    </FollowBtn>
                ) : (
                    <FollowBtn
                        result={result}
                        followToggle={followToggle}
                        setFollowToggle={setFollowToggle}
                    >
                        Following
                    </FollowBtn>
                )}
            </div>
        </Link>
    );
};

export default SearchResult;

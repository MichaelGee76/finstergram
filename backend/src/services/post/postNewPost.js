import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";

export async function postNewPost(
  authenticatedUserId,
  location,
  picture,
  description,
  hashtags
) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");
  if (!picture) throw new Error("Please provide image");
  const newPost = await Post.create({
    userId: authenticatedUserId,
    location,
    picture,
    description,
    hashtags,
  });

  return newPost;
}

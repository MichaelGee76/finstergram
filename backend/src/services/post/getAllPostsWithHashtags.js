import { Post } from "../../models/post.js";

export async function getAllPostsWithHashtags(hashtag) {
  const hashtagWord = hashtag.slice(1);

  const posts = await Post.find({ hashtag: { $in: hashtagWord } })
    .populate("userId", "username profilePicture profession")
    .sort({ createdAt: -1 });
  return posts;
}

import { User } from "../../models/user.js";
import { Post } from "../../models/post.js";
import { Like } from "../../models/like.js";
import { Save } from "../../models/save.js";
import { Comment } from "../../models/comment.js";
import mongoose from "mongoose";

export async function deletePost(authenticatedUserId, postId) {
  try {
    // Überprüfe, ob der Benutzer existiert
    const user = await User.findById(authenticatedUserId);
    if (!user) {
      throw new Error("User doesn't exist");
    }

    // Überprüfe, ob die postId ein gültiges MongoDB-Objekt-ID-Format hat
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid postId format");
    }

    // Überprüfe, ob der Post existiert
    const post = await Post.findById(postId);
    if (!post) {
      console.log(`Post with ID "${postId}" does not exist`);
      throw new Error("Post doesn't exist");
    }

    // Überprüfe, ob der authentifizierte Benutzer der Besitzer des Posts ist
    if (post.userId.toString() !== user._id.toString()) {
      throw new Error("No permission to delete this post");
    }

    // Lösche den Post
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      throw new Error("Could not delete the post");
    }

    // Lösche alle Likes, Saves und Kommentare, die mit dem Post verbunden sind
    await Like.deleteMany({ postId });
    await Save.deleteMany({ postId });
    await Comment.deleteMany({ postId });

    return deletedPost;
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw new Error(error.message);
  }
}

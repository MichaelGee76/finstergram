import { Post } from "../../models/post.js";
import { Like } from "../../models/like.js";
import { Comment } from "../../models/comment.js";
// import { User } from "../../models/user.js";

export async function getOnePost(postId) {
    // const user = await User.findById(authenticatedUserId)
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    const likes = await Like.find({
        postId: postId,
        commentId: null,
    });
    //alternativ:.populate({path:"userId",select:"userName profilePicture"})

    const comments = await Comment.find({
        postId: postId,
    });
    //alternativ:.populate({path:"userId",select:"userName profilePicture"})

    return {
        post,
        likes,
        comments,
    };
}
// const postObject = {
//post:post.toObject();
//likes:likes.map(singleLike)=>like.toObject())
//comments: comments.map(singlecoment)=>comment.toObject())
//}

//return{
//post:post.toObject();
//likes:likes.map(singleLike)=>like.toObject())
//comments: comments.map(singlecoment)=>comment.toObject())

//}

// return postObject

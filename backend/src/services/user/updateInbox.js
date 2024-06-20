import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";
import { Follow } from "../../models/follow.js";
import { Post } from "../../models/post.js";

export async function updateInbox(authenticatedUserId) {
    // abfrage ob comment, like oder follow nicht nötig, da mongoose nur update
    // macht wenn entsprechendes dokumente zum updaten verfügbar sind

    const posts = await Post.find({ userId: authenticatedUserId });

    const postIds = posts.map((post) => post._id);

    await Comment.updateMany(
        { postId: { $in: postIds } },
        { $set: { inboxSeen: true } }
    );

    await Like.updateMany(
        { postId: { $in: postIds } },
        { $set: { inboxSeen: true } }
    );

    await Follow.updateMany(
        { followedId: authenticatedUserId },
        { $set: { inboxSeen: true } }
    );

    return { message: "Inbox set to read" };
}

import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";
import { Follow } from "../../models/follow.js";

export async function markAllInboxSeen(authenticatedUserId) {
  // abfrage ob comment, like oder follow nicht nötig, da mongoose nur update
  // macht wenn entsprechendes dokumente zum updaten verfügbar sind
  await Comment.updateMany(
    { userId: authenticatedUserId },
    { $set: { inboxSeen: true } }
  );

  await Like.updateMany({ postId: { $in: postIds }, inboxSeen: true });

  await Follow.updateMany(
    { followedId: authenticatedUserId },
    { $set: { inboxSeen: true } }
  );

  return { message: "Inbox set to read" };
}

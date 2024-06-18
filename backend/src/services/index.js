import { registerUser } from "../services/user/registerUser.js";
import { verifyEmailUser } from "../services/user/verifyEmailUser.js";
import { showAllUsers } from "../services/user/showAllUsers.js";
import { showOneUser } from "../services/user/showOneUser.js";
import { refreshAccessToken } from "../services/user/refreshAccessToken.js";
import { updateUser } from "../services/user/updateUser.js";
import { loginUser } from "../services/user/loginUser.js";
import { deleteUser } from "../services/user/deleteUser.js";
import { getUserPosts } from "./post/getUserPosts.js";
import { getUserFeed } from "./post/getUserFeed.js";
import { postNewPost } from "./post/postNewPost.js";
import { updatePost } from "./post/updatePost.js";
import { deletePost } from "./post/deletePost.js";
import { getAllPostsWithHashtags } from "./post/getAllPostsWithHashtags.js";
import { postComment } from "./comment/postComment.js";
import { deleteComment } from "./comment/deleteComment.js";
import { patchComment } from "./comment/patchComment.js";
import { getAllCommentsFromPost } from "./comment/getAllCommentsFromPost.js";
import { postLike } from "./like/postLike.js";
import { deleteLike } from "./like/deleteLike.js";
// import { postFollow } from "./follow/postFollow.js";
// import { deleteFollow } from "./follow/deleteFollow.js";
// import { savePost } from "./save/savePost.js";
// import { deleteSavePost } from "./save/savePost.js";
// import { getSavedPosts } from "./save/savePost.js";

export const UserService = {
  registerUser,
  verifyEmailUser,
  showAllUsers,
  showOneUser,
  refreshAccessToken,
  updateUser,
  loginUser,
  deleteUser,
};

export const PostServices = {
  getUserPosts,
  getUserFeed,
  postNewPost,
  updatePost,
  deletePost,
  getAllPostsWithHashtags,
};

export const CommentService = {
  postComment,
  deleteComment,
  patchComment,
  getAllCommentsFromPost,
};

export const LikeService = {
  postLike,
  deleteLike,
};

// export const FollowService = {
//   postFollow,
//   deleteFollow,
// };

// export const SaveService = {
//   savePost,
//   deleteSavePost,
//   getSavedPosts,
// };

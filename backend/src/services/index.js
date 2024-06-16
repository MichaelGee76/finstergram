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

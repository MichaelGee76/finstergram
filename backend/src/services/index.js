//User
import { registerUser } from "../services/user/registerUser.js";
import { verifyEmailUser } from "../services/user/verifyEmailUser.js";
import { showAllUsers } from "../services/user/showAllUsers.js";
import { showOneUser } from "../services/user/showOneUser.js";
import { refreshAccessToken } from "../services/user/refreshAccessToken.js";
import { updateUser } from "../services/user/updateUser.js";
import { loginUser } from "../services/user/loginUser.js";
import { deleteUser } from "../services/user/deleteUser.js";
import { logoutUser } from "../services/user/logoutUser.js";
//Posts
import { getUserPosts } from "./post/getUserPosts.js";
import { getUserFeed } from "./post/getUserFeed.js";
import { postNewPost } from "./post/postNewPost.js";
import { updatePost } from "./post/updatePost.js";
import { getHashtag } from "./post/getHashtag.js";
import { deletePost } from "./post/deletePost.js";
import { getAllPostsWithHashtags } from "./post/getAllPostsWithHashtags.js";
//Comments
import { postComment } from "./comment/postComment.js";
import { deleteComment } from "./comment/deleteComment.js";
import { patchComment } from "./comment/patchComment.js";
import { getAllCommentsFromPost } from "./comment/getAllCommentsFromPost.js";
//Like
import { postLike } from "./like/postLike.js";
import { deleteLike } from "./like/deleteLike.js";
//Follow
import { postFollow } from "./follow/postFollow.js";
import { deleteFollow } from "./follow/deleteFollow.js";
//Save
import { savePost } from "./save/savePost.js";
import { deleteSavePost } from "./save/deleteSavePost.js";
import { getSavedPosts } from "./save/getSavedPost.js";
//Messages
import { postMessage } from "./messages/postMessage.js";
import { updateMessage } from "./messages/updateMessage.js";
import { deleteMessage } from "./messages/deleteMessage.js";
import { getOneChat } from "./messages/getOneChat.js";
import { getAllChats } from "./messages/getAllChats.js";
import { getInbox } from "./user/getInbox.js";

export const UserService = {
  registerUser,
  verifyEmailUser,
  showAllUsers,
  showOneUser,
  refreshAccessToken,
  updateUser,
  loginUser,
  deleteUser,
  logoutUser,
  getInbox,
};

export const PostServices = {
  getUserPosts,
  getUserFeed,
  postNewPost,
  updatePost,
  deletePost,
  getAllPostsWithHashtags,
  getHashtag,
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

export const FollowService = {
  postFollow,
  deleteFollow,
};

export const SaveService = {
  savePost,
  deleteSavePost,
  getSavedPosts,
};

export const MessageService = {
  postMessage,
  deleteMessage,
  updateMessage,
  getOneChat,
  getAllChats,
};

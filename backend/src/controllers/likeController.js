import asyncHandler from "express-async-handler";
import { LikeService } from "../services/index.js";
import { sendResponse } from "../helpers/userToView.js";

const postLikeCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const { postId, commentId } = req.body;
  const result = await LikeService.postLike(userId, postId, commentId);
  if (!result) {
    res.status(500).json("Could not like");
  }
  sendResponse(res, result);
});

const deleteLikeCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const { postId, commentId } = req.body;
  const result = await LikeService.deleteLike(userId, postId, commentId);
  if (!result) {
    res.status(500).json("Could not like");
  }
  sendResponse(res, result);
});

const getLikesCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const { postId, commentId } = req.body;
  const result = await LikeService.getLikes(userId, postId, commentId);
  if (!result) {
    res.status(500).json("Could not get likes");
  }

  sendResponse(res, result);
});

const getLikedPostsCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const result = await LikeService.getLikedPosts(userId);
  if (!result) {
    return res.status(500).json("Could not get liked posts");
  }
  sendResponse(res, result);
});

export const LikeController = {
  postLikeCtrl,
  deleteLikeCtrl,
  getLikesCtrl,
  getLikedPostsCtrl,
};

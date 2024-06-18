import { FollowService } from "../services/index.js";
import { sendResponse } from "../helpers/userToView.js";
import asyncHandler from "express-async-handler";

const postFollowCtrl = asyncHandler(async (req, res) => {
  const { userId, followedId } = req.body;
  const result = await FollowService.postFollow(userId, followedId);
  if (!result) {
    throw new Error("cannot follow");
  }
  sendResponse(res, result);
});

const deleteFollowCtrl = asyncHandler(async (req, res) => {
  const { userId, followedId } = req.body;
  const result = await FollowService.deleteFollow(userId, followedId);
  if (!result) {
    throw new Error("cannot delete following ");
  }
  sendResponse(res, result);
});

export const FollowController = {
  deleteFollowCtrl,
  postFollowCtrl,
};

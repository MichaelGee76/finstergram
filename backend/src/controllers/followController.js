import { FollowService } from "../services/index.js";
import { sendResponse } from "../helpers/userToView.js";
import asyncHandler from "express-async-handler";

const postFollowCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const followedId = req.params.id;
  const result = await FollowService.postFollow(userId, followedId);
  if (!result) {
    throw new Error("cannot follow");
  }
  sendResponse(res, result);
});

const deleteFollowCtrl = asyncHandler(async (req, res) => {
  const userId = req.authenticatedUserId;
  const followedId = req.params.id;
  const result = await FollowService.deleteFollow(userId, followedId);
  if (!result) {
    throw new Error("cannot delete following ");
  }
  sendResponse(res, result);
});

const getFollowInfoCtrl = asyncHandler(async (req, res) => {
  const authenticatedUserId = req.authenticatedUserId;
  const userId = req.params.userId;
  const result = await FollowService.getFollowInfo(userId, authenticatedUserId);
  if (!result) {
    throw new Error("cannot get users ");
  }
  sendResponse(res, result);
});

export const FollowController = {
  deleteFollowCtrl,
  postFollowCtrl,
  getFollowInfoCtrl,
};

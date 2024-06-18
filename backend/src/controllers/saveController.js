import { SaveService } from "../services/index.js";
import asyncHandler from "express-async-handler";
import { sendResponse } from "../helpers/userToView.js";

const savePostCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const { postId } = req.params.postId;
    const result = await SaveService.savePost(userId, postId);
    if (!result) {
        return res.status(500).json("Could not save post");
    }
    sendResponse(res, result);
});

const deleteSaveCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const { postId } = req.params.postId;
    const result = await SaveService.deleteSavePost(userId, postId);
    if (!result) {
        return res.status(500).json("Could not delete save");
    }
    sendResponse(res, result);
});

const getSavedPostsCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const result = await SaveService.getSavedPosts(userId);
    if (!result) {
        return res.status(500).json("Could not get saved posts");
    }
    sendResponse(res, result);
});

export const SaveController = {
    savePostCtrl,
    deleteSaveCtrl,
    getSavedPostsCtrl,
};

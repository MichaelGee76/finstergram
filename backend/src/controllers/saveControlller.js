import { SaveService } from "../services/saveService.js";
import asyncHandler from "express-async-handler";
import { sendResponse } from "../helpers/userToView.js";
import { Save } from "../models/save.js";

const savePostCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const { postId } = req.body;
    const result = await SaveService.savePost(userId, postId);
    if (!result) {
        return res.status(500).json("Could not save post");
    }
    res.status(201).json({ result });
});

const deleteSaveCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const { postId } = req.body;
    const result = await SaveService.deleteSavePost(userId, postId);
    if (!result) {
        return res.status(500).json("Could not delete save");
    }
    res.status(200).json({ result });
});

const getSavedPostsCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const result = await SaveService.getSavedPosts(userId);
    if (!result) {
        return res.status(500).json("Could not get saved posts");
    }
    res.status(200).json({ result });
});

export const SaveController = {
    savePostCtrl,
    deleteSaveCtrl,
    getSavedPostsCtrl,
};

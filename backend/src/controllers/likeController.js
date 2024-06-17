import asyncHandler from "express-async-handler";
import { LikeService } from "../services/index.js";

const postLikeCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const { postId, commentId } = req.body;
    const result = await LikeService.postLike(userId, postId, commentId);
    if (!result) {
        res.status(500).json("Could not like");
    }
    res.status(201).json({ result });
});

const deleteLikeCtrl = asyncHandler(async (req, res) => {
    const userId = req.authenticatedUserId;
    const { postId, commentId } = req.body;
    const result = await LikeService.deleteLike(userId, postId, commentId);
    if (!result) {
        res.status(500).json("Could not like");
    }
    res.status(201).json({ result });
});

export const LikeController = {
    postLikeCtrl,
    deleteLikeCtrl,
};

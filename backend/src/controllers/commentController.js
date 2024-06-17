import { CommentService } from "../services/index.js";
import { sendResponse } from "../helpers/userToView.js";

import asyncHandler from "express-async-handler";

const postCommentCtrl = asyncHandler(async (req, res) => {
    const authenticatedUserId = req.authenticatedUserId;
    const commentData = req.body;

    const result = await CommentService.postComment(
        authenticatedUserId,
        commentData
    );

    if (!result) {
        res.status(500).json({ message: "Could not create post" });
    }
    sendResponse(res, result);
});

const deleteCommentCtrl = asyncHandler(async (req, res) => {
    const authenticatedUserId = req.authenticatedUserId;

    const commentId = req.params.commentId;
    const deletedComment = await CommentService.deleteComment(
        commentId,
        authenticatedUserId
    );
    if (!deletedComment) {
        res.status(500).json({ message: "Could not delete post" });
    }
    sendResponse(res, result);
});

const updateCommentCtrl = asyncHandler(async () => {
    const commentId = req.params.commentId;
    const authenticatedUserId = req.authenticatedUserId;
    const updatedContent = req.body;

    const updatedComment = await CommentService.patchComment(
        commentId,
        authenticatedUserId,
        updateContent
    );

    if (!updatedContent) {
        res.status(500).json({ message: "Could not update comment" });
    }

    sendResponse(res, result);
});

export const CommentController = {
    postCommentCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
};

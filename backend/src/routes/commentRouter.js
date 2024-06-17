import express from "express";
import { CommentController } from "../controllers/commentController.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const commentRouter = express
    .Router()
    .get(
        "/allCommentsFromPost/:postId",
        doJWTAuth,
        CommentController.getAllCommentsFromPostCtrl
    )
    .post("/newComment", doJWTAuth, CommentController.postCommentCtrl)
    .patch("/:commentId", doJWTAuth, CommentController.updateCommentCtrl)
    .delete("/:commentId", doJWTAuth, CommentController.deleteCommentCtrl);

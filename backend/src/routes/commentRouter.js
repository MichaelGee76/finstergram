import express from "express";
import { CommentController } from "../controllers/commentController.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const commentRouter = express
    .Router()
    // .get(
    //     "/allCommentsFromPost",
    //     doJWTAuth,
    //     CommentController.getAllCommentsFromPostCtrl
    // )

    .post("/newComment", doJWTAuth, CommentController.postCommentCtrl);
// .patch(
//     "/updateComment/:commentId",
//     doJWTAuth,
//     CommentController.updateCommentCtrl
// )
// .delete(
//     "/deleteComment/:commentId",
//     doJWTAuth,
//     CommentController.deleteCommentCtrl
// );

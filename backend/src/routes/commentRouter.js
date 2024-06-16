import express from "express";
import { commentController } from "../controllers/commentController.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const commentRouter = express
  .Router()
  .get(
    "/allCommentsFromPost",
    doJWTAuth,
    commentController.getAllCommentsFromPostCtrl
  )

  .post("/newComment", doJWTAuth, commentController.postNewCommentCtrl)
  .patch(
    "/updateComment/:commentId",
    doJWTAuth,
    commentController.updateCommentCtrl
  )
  .delete(
    "/deleteComment/:commentId",
    doJWTAuth,
    commentController.deleteCommentCtrl
  );

import express from "express";
import { PostController } from "../controllers/postController.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const postRouter = express
  .Router()
  .get("/userPosts/:id", doJWTAuth, PostController.getUserPostsCtrl)
  .get("/userFeed", doJWTAuth, PostController.getUserFeedCtrl)
  .post("/newPost", doJWTAuth, PostController.postNewPostCtrl)
  .patch("/updatePost/:postId", doJWTAuth, PostController.updatePostCtrl)
  .delete("/deletePost/:postId", doJWTAuth, PostController.deletePostCtrl)
  .get(
    "/allPostsWithHashtag",
    // doJWTAuth,
    PostController.getAllPostsWithHashtagsCtrl
  );

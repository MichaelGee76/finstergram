import express from "express";
import { PostController } from "../controllers/postController.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const postRouter = express
  .Router()
  .get("/userPosts", doJWTAuth, PostController.getUserPostsCtrl)
  .get("/userFeed", doJWTAuth, PostController.getUserFeedCtrl)
  .post("/newPost", doJWTAuth, PostController.postNewPostCtrl)
  .patch("/updatePost", doJWTAuth, PostController.updatePostCtrl)
  .delete("/deletePost", doJWTAuth, PostController.deletePostCtrl)
  .get(
    "/allPostsWithHashtag",
    // doJWTAuth,
    PostController.getAllPostsWithHashtagsCtrl
  );

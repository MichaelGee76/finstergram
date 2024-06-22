import express from "express";
import { PostController } from "../controllers/postController.js";
import { doJWTAuth } from "../middlewares/doJwtAuth.js";

export const postRouter = express
  .Router()
  .get("/userPosts/:userId", doJWTAuth, PostController.getUserPostsCtrl)
  .get("/userFeed", doJWTAuth, PostController.getUserFeedCtrl)
  .get("/discoverFeed", doJWTAuth, PostController.getDiscoverFeedCtrl)
  .post("/newPost", doJWTAuth, PostController.postNewPostCtrl)
  .patch("/:postId", doJWTAuth, PostController.updatePostCtrl)
  .delete("/:postId", doJWTAuth, PostController.deletePostCtrl)
  .get("/hashtags", doJWTAuth, PostController.getAllHashtagsCtrl)
  .get(
    "/allPostsWithHashtag/:hashtag",
    // doJWTAuth,
    PostController.getAllPostsWithHashtagsCtrl
  )
  .get("/:postId", doJWTAuth, PostController.getOnePostCtrl);

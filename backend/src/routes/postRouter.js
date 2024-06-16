import express from "express";

export const postRouter = express.Router().get("/", PostController);

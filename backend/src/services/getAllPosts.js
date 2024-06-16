import { Post } from "../models/post.js";

export async function getAllPosts() {
    return Post.find({});
}

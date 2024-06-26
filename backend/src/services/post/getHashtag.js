import { Post } from "../../models/post.js";

export async function getHashtag() {
    const posts = await Post.find({}, "hashtags");

    // hasttgs extrahieren  und flatten aus den posts
    const hashtags = posts.flatMap((post) => post.hashtags);

    //duplikate removen beim convertieren des Arrays
    const uniqueHashtags = [...new Set(hashtags)];

    //sortieren von hashtags

    const hashtagsorted = uniqueHashtags.sort((a, b) => a.localeCompare(b));

    return hashtagsorted;
}

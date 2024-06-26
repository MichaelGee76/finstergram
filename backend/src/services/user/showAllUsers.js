import { Follow } from "../../models/follow.js";
import { User } from "../../models/user.js";

// async function checkIfFollowed(authenticatedUserId, userId) {
//     const follow = await Follow.findOne({
//         userId: authenticatedUserId,
//         followedId: userId,
//     });
//     return !!follow; // macht einen boolean draus
// }

// export async function showAllUsers(authenticatedUserId) {
//     const users = await User.find(
//         {},
//         "userName _id profession profilePicture isFollowed"
//     );
//     if (!users) {
//         throw new Error("No user found");
//     }

//     //loop users and set isFollwed
//     for (let user of users) {
//         user.isFollowed = await checkIfFollowed(authenticatedUserId, user._id);
//     }

//     return users;
// }

//username _id profession profilePicture, isFollowed true oder false

// export async function showAllUsers(authenticatedUserId) {
//     const user = await User.find({}, "userName _id profession profilePicture ");
//     if (!user) {
//         throw new Error("user not found");
//     }

//     return user;
// }

export const showAllUsers = async (currentUserId) => {
    //Fetche alle users mit selected fields
    const users = await User.find({}, "userName _id profession profilePicture");

    //Fetche die liste of users the current user is following
    const following = await Follow.find({ userId: currentUserId }).select(
        "followedId"
    );
    const followingIds = following.map((follow) =>
        follow.followedId.toString()
    );

    //Map users and add isFollowed field
    const usersWithFollowStatus = users.map((user) => ({
        userName: user.userName,
        _id: user._id,
        profession: user.profession,
        profilePicture: user.profilePicture,
        isFollowed: followingIds.includes(user._id.toString()),
    }));

    return usersWithFollowStatus;
};

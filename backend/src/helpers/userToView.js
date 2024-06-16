export function userToView(user) {
    // _id, firstname, lastname, email, bio, username, isEmailVerified
    return {
        /*    _id: user._id, */
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        profilePicture: user.profilePicture,
        email: user.email,
        userBio: user.userBio,
    };
}

export const sendResponse = (res, result) => {
    res.status(200).json({ result });
};

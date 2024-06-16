import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import { userToView } from "../../helpers/userToView.js";

import { sendEmail } from "../../utils/verifyEmail.js";
import { createToken } from "../../utils/createToken.js";

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
  userName,
}) {
  /*   const { firstName, lastName, userName, email, password } = req.body; */

  if (!firstName || !lastName || !userName || !email || !password) {
    // res.status(400);
    throw new Error("Please provide all informations");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    //res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
  });

  if (user) {
    await user.save();
    sendEmail({
      to: user.email,
      subject: "Welcome to Finstergram",
      text: `Hey ${user.firstName},
        welcome to Finstergram. Please click the link below to verify your account:
        http://localhost:4420/api/v1/users/verifyEmail/${user._id}

        Have fun with finstergraming

        Your Finstergram Team
        `,
    });

    const accessToken = createToken(user, "access");
    const refresh_token = createToken(user, "refresh");

    return {
      user: userToView(user),
      tokens: { accessToken, refresh_token },
    };
  }
}

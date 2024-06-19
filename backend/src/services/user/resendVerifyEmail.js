import { User } from "../../models/user.js";
import { sendEmail } from "../../utils/verifyEmail.js";

export async function resendVerifyEmail(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("user not found");

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
  return { message: "Email successfully sent" };
}

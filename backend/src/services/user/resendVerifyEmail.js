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
        html: `
            <p>Hey ${user.firstName},</p>

            <p>Welcome to Finstagram. Please click the link below to verify your account:</p>

            <p><a href="https://finstergram.onrender.com/api/v1/users/verifyEmail/${user._id}">Verify your account</a></p>

            <p>Have fun here!</p>
            
            <p>Your Finstagram Team</p>
        `,
    });
    return { message: "Email successfully sent" };
}

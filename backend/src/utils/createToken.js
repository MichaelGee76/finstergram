import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export function createToken(user, tokenType = "access") {
    // accessToken ist folgendermaßen aufgebaut:header, payload, signature

    const issuedAtSeconds = Math.ceil(Date.now() / 1000);
    const payload = {
        sub: user._id,
        type: tokenType,
        iat: issuedAtSeconds,
    };

    // unterschiedliche expire times für unterschiedliche Arten von tokens

    const expiresIn = { access: "1h", refresh: "2w" }[tokenType] || "90min";
    const token = jwt.sign(payload, jwtSecret, { expiresIn });

    return token;
}

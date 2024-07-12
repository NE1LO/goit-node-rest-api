import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/users.js";
import Session from "../models/session.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(401, "Authorization header is missing or invalid")
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const session = await Session.findOne({ accessToken: token });

    if (!session) {
      throw new Error("Session not found");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, "Access token expired"));
  }
};

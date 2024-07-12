import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import Session from "../models/session.js";

const {
  JWT_SECRET,
  JWT_EXPIRATION,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION,
} = process.env;

export const createUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  // Видаляємо існуючу сесію, якщо така є
  await Session.deleteMany({ userId: user._id });

  const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: parseInt(JWT_EXPIRATION),
  });
  const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
    expiresIn: parseInt(JWT_REFRESH_EXPIRATION),
  });

  const newSession = new Session({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(
      Date.now() + parseInt(JWT_EXPIRATION) * 1000
    ),
    refreshTokenValidUntil: new Date(
      Date.now() + parseInt(JWT_REFRESH_EXPIRATION) * 1000
    ),
  });

  await newSession.save();

  return { accessToken, refreshToken };
};

export const refreshUserSession = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const session = await Session.findOne({ refreshToken });

    if (!session) {
      throw new Error("Invalid refresh token");
    }

    await Session.deleteOne({ _id: session._id });

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    const newAccessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    const newRefreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRATION,
    });

    const newSession = new Session({
      userId: user._id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenValidUntil: new Date(
        Date.now() + parseInt(JWT_EXPIRATION) * 1000
      ),
      refreshTokenValidUntil: new Date(
        Date.now() + parseInt(JWT_REFRESH_EXPIRATION) * 1000
      ),
    });

    await newSession.save();

    return newAccessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const deleteSession = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw new Error("Invalid refresh token");
  }

  await Session.deleteOne({ _id: session._id });
};

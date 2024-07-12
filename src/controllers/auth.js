import {
  createUser,
  loginUser,
  refreshUserSession,
  deleteSession,
} from "../services/auth.js";
import createHttpError from "http-errors";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await createUser({ name, email, password });

    res.status(201).json({
      status: "success",
      message: "Successfully registered a user!",
      data: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    if (error.message === "Email in use") {
      next(createHttpError(409, "Email in use"));
    } else {
      next(createHttpError(500, "Internal Server Error"));
    }
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken } = await loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
    });

    res.status(200).json({
      status: "success",
      message: "Successfully logged in an user!",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      next(createHttpError(401, "Invalid email or password"));
    } else {
      next(createHttpError(500, "Internal Server Error"));
    }
  }
};

export const refreshSession = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(createHttpError(401, "Refresh token is missing"));
  }

  try {
    const newAccessToken = await refreshUserSession(refreshToken);

    res.status(200).json({
      status: "success",
      message: "Successfully refreshed a session!",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(createHttpError(401, "Invalid refresh token"));
  }
};

//#########################################################################>>>>LOGOUT

export const logout = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(createHttpError(401, "Refresh token is missing"));
  }

  try {
    await deleteSession(refreshToken);
    res.clearCookie("refreshToken");
    res.status(204).send();
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};

import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
export const updateUser = async (req, res, next) => {

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(
          StatusCodes.BAD_REQUEST,
          "Password must be at least six characters"
        )
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(
          StatusCodes.BAD_REQUEST,
          "Username must be between 7 and 20 characters"
        )
      );
    }
    if (req.body.username.includes(" ")) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Username cannot contain spaces")
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(
        errorHandler(StatusCodes.BAD_REQUEST, "Username must be lowercase")
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(
          StatusCodes.BAD_REQUEST,
          "Username can only contain letters and numbers"
        )
      );
    }
  }
  
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(StatusCodes.OK).json(rest);
  } catch (error) {
    next(error);
  }
};

import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorHandler(
          StatusCodes.BAD_REQUEST,
          "You are not allowed to create this comment"
        )
      );
    }
    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(StatusCodes.OK).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(StatusCodes.OK).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(StatusCodes.NOT_FOUND, "Comment not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(StatusCodes.OK).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(StatusCodes.NOT_FOUND, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(
          StatusCodes.UNAUTHORIZED,
          "You are not allowed to edit this comment"
        )
      );
    }
    const editComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json(editComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(StatusCodes.NOT_FOUND, "Comment not found"));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(
          StatusCodes.UNAUTHORIZED,
          "You are not allowed to delete this comment"
        )
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(StatusCodes.OK).json("The comment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(
        StatusCodes.UNAUTHORIZED,
        "You are not allowed to get all comments"
      )
    );
  }
  try {
    const startIndex = parseInt(req.query.limit) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res
      .status(StatusCodes.OK)
      .json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

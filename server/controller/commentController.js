import Comment from "../model/Comment.js";
import Image from "../model/Image.js";
import Vote from "../model/Vote.js";
import User from "../model/User.js";
import { fileURLToPath } from "url";
import multer from "multer";
import crypto from "crypto";
import { calculateUserPoint } from "./userController.js";
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}
const __filename = fileURLToPath(import.meta.url);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath =
      "D:/Desktop/artcrit-alpha/artcrit-early/server/public";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const randomString = generateRandomString(5);
    cb(null, `${randomString}${file.originalname}`);
  },
});
const upload = multer({ storage });

export const getAllComment = async (req, res) => {
  try {
    const data = await Comment.findAll();
    res.status(200).json({ message: "fetch compete" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
export const getPostComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.findAll({
      where: { post_id: postId },
      attributes: ["id_comment", "comment_content", "created_at"],
    });
    const commentsWithVotePoints = await Promise.all(
      comments.map(async (comment) => {
        const { id_comment } = comment;
        const upvotesCount = await Vote.count({
          where: { vote_type: "upvote", comment_id: id_comment },
        });
        const downvotesCount = await Vote.count({
          where: { vote_type: "downvote", comment_id: id_comment },
        });
        const votePoints = upvotesCount - downvotesCount;
        return { ...comment.toJSON(), vote_points: votePoints };
      })
    );
    res.status(200).json(commentsWithVotePoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getUserComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findAll({ where: { user_id: id },
      include: [
        {
          model: Image,
          attributes: ["id_image", "image_path"],
        },
        {
          model: User,
          attributes: ["id_user", "user_name", "user_email", "user_avatar","user_points"],
        },
      ], });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const addComment = async (req, res) => {
  const { commentContent, userId, postId } = req.body;
  const files = req.files;
  try {
    const comment = await Comment.create({
      comment_content: commentContent,
      post_id: postId,
      user_id: userId,
    });
    const imagePromises = files.map(async (image) => {
      return await Image.create({
        image_path: `http://localhost:3030/static/${image.filename}`,
        comment_id: comment.id_comment,
        user_id: userId
      });
    });
    const vote = await Vote.create({
      comment_id: comment.id_comment,
      user_id: userId,
      post_id: postId,
    });
    await Promise.all(imagePromises);
    res.status(200).json({ message: "comment added" });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error });
  }
};
export const addChildComment = async(req,res)=>{
  const parentId = req.params.id
  const { commentContent, userId, postId } = req.body;
  const files = req.files;
  try {
    const comment = await Comment.create({
      comment_content: commentContent,
      post_id: postId,
      user_id: userId,
      comment_parent:parentId
    });
    const imagePromises = files.map(async (image) => {
      return await Image.create({
        image_path: `http://localhost:3030/static/${image.filename}`,
        comment_id: comment.id_comment,
        user_id: userId
      });
    });
    const vote = await Vote.create({
      comment_id: comment.id_comment,
      user_id: userId,
      post_id: postId,
    });
    await Promise.all(imagePromises);
    res.status(200).json({ message: "comment added" });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error: error });
  }
}
export const uploadChildCommentArray = upload.array("files", 4);
export const uploadCommentArray = upload.array("files", 4);

export const upvoteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId, op } = req.body;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    let vote = await Vote.findOne({
      where: { comment_id: commentId, user_id: userId },
    });
    if (!vote) {
      vote = await Vote.create({
        comment_id: commentId,
        vote_type: "up",
        post_id: comment.post_id,
        user_id: userId,
      });
    } else {
      if (vote.vote_type === "up") {
        await vote.destroy();
        vote = null;
      } else {
        await vote.update({ vote_type: "up" });
      }
    }
    const upvotesCount = await Vote.count({
      where: { vote_type: "up", comment_id: commentId },
    });
    const downvotesCount = await Vote.count({
      where: { vote_type: "down", comment_id: commentId },
    });
    const votePoints = upvotesCount - downvotesCount;
    await Comment.update({ vote_points: votePoints }, { where: { id_comment: commentId } });
    await calculateUserPoint(op);
    
    return res.status(200).json({ message: "Comment upvoted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const downvoteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId,op } = req.body;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const vote = await Vote.findOne({
      where: { comment_id: commentId, user_id: userId },
    });
    if (!vote) {
      await Vote.create({
        comment_id: commentId,
        vote_type: "down",
        post_id: comment.post_id,
        user_id: userId,
      });
    }
    if (vote.vote_type === "down") {
      await vote.destroy();
    }
    await vote.update({ vote_type: "down" });
    const upvotesCount = await Vote.count({
      where: { vote_type: "up", comment_id: commentId },
    });
    const downvotesCount = await Vote.count({
      where: { vote_type: "down", comment_id: commentId },
    });
    const votePoints = upvotesCount - downvotesCount;
    await Comment.update({vote_points:votePoints},{where:{id_comment:commentId}},)
    await calculateUserPoint(op)
    return res.status(200).json({ message: "Comment downvoted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

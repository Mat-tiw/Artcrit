import Vote from "../model/Vote.js";
import Post from "../model/Post.js";
import Image from "../model/Image.js";
import User from "../model/User.js";
import { calculateUserPoint } from "./userController.js";
export const likePost = async (req, res) => {
  try {
    const userId = req.params.id;
    const { postId,op } = req.body;

    const existingVote = await Vote.findOne({
      where: {
        post_id: postId,
        user_id: userId,
        vote_type: "like",
      },
    });

    if (!existingVote) {
      await Vote.create({
        vote_type: "like",
        post_id: postId,
        user_id: userId,
      });
    } else {
      await existingVote.destroy();
    }
    const totalLiked = await Vote.count({
      where: { post_id: postId, vote_type: "like" },
    });
    await Post.update({ total_like: totalLiked }, {
      where: { id_post: postId }
    });
    await calculateUserPoint(op)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getLikedPost = async (req, res) => {
  const userId = req.params.id;
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Vote,
          where: { user_id: userId, vote_type: "like" },
          attributes: [],
          order: [["created_at", "DESC"]],
          required: false,
        },
        {
          model: Image,
          attributes: ["id_image", "image_path"],
        },
        {
          model: User,
          attributes: ["id_user", "user_name", "user_email", "user_avatar"],
        },
      ],
      order: [[{ model: Vote }, "created_at", "DESC"]],
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No posts found for the given user and vote type",
      });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};

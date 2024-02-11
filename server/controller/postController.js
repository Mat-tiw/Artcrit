import Post from "../model/Post.js";
import Image from "../model/Image.js";
import Vote from '../model/Vote.js';
import Comment from '../model/Comment.js';
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import crypto from "crypto";
import User from "../model/User.js";
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}
const __filename = fileURLToPath(import.meta.url);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "D:/Desktop/artcrit-alpha/artcrit-early/server/public";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const randomString = generateRandomString(5);
    cb(null, `${randomString}${file.originalname}`);
  },
});

const upload = multer({ storage });

export const createPost = async (req, res) => {
  const { postTitles, postBadge, userId } = req.body;
  const files = req.files;
  try {
    const post = await Post.create({
      post_title: postTitles,
      post_badge: postBadge,
      user_id: userId,
    });
    const imagePromises = files.map(async (image) => {
      return await Image.create({
        image_path: `http://localhost:3030/static/${image.filename}`,
        post_id: post.id_post,
        user_id:userId
      });
    });
    await Promise.all(imagePromises);
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const testFile = (req, res) => {
  const files = req.body.files;
  console.log(files);
};
export const getAllPost = async (req, res) => {
  try {
    const postsWithImages = await Post.findAll({
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Image,
          attributes: ["id_image", "image_path"],
        },
        {
          model: User,
          attributes: ["id_user", "user_name", "user_email", "user_avatar"],
        },
      ],
    });
    res.json(postsWithImages);
  } catch (error) {
    console.error("Error fetching posts and images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const postWithImagesAndUser = await Post.findOne({
      where: { id_post: id },
      include: [
        {
          model: Image,
          attributes: ["id_image", "image_path"],
        },
        {
          model: User,
          attributes: ["id_user", "user_name", "user_email", "user_avatar"],
        },
      ],
    });
    if (!postWithImagesAndUser) {
      return res.status(401).json({ error:true,message:"no post found" });
    }
    res.json(postWithImagesAndUser);
  } catch (error) {
    res.message(error.message);
  }
};
export const getUserPost = async (req, res) => {
  const id = req.params.id;
  try {
    const allUserPost = await Post.findAll({
      where: { user_id: id },
      include: [
        {
          model: Image,
          attributes: ["id_image", "image_path"],
        },
        {
          model: User,
          attributes: ["id_user", "user_name", "user_email", "user_avatar"],
        },
      ],
    });
    if(!allUserPost) return res.status(401).json({ error:true,message:"no post found" })
    res.json(allUserPost);
  } catch (error) {}
};
export const uploadPostImage = upload.array("files", 4);

export const getPostWithComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const postWithImagesAndUser = await Post.findOne({
      where: { id_post: postId },
      include: [
        {
          model: Image,
          attributes: ["id_image", "image_path"],
        },
        {
          model: User,
          attributes: ["id_user", "user_name", "user_email", "user_avatar"],
        },
      ],
    });

    if (!postWithImagesAndUser) {
      return res.status(404).json({ error: true, message: "Post not found" });
    }

    const comments = await Comment.findAll({
      where: { post_id: postId },
      attributes: ["id_comment", "comment_content", "created_at"],
    });

    const commentsWithVotePoints = await Promise.all(comments.map(async (comment) => {
      const { id_comment } = comment;
      const upvotesCount = await Vote.count({ where: { vote_type: "up", comment_id: id_comment } });
      const downvotesCount = await Vote.count({ where: { vote_type: "down", comment_id: id_comment } });
      const votePoints = upvotesCount - downvotesCount;
      return { ...comment.toJSON(), vote_points: votePoints };
    }));
    const postWithComments = {
      ...postWithImagesAndUser.toJSON(),
      comments: commentsWithVotePoints,
    };

    res.status(200).json(postWithComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

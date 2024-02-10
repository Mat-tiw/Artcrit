import Comment from '../model/Comment.js'
import Image from "../model/Image.js";
import { fileURLToPath } from "url";
import multer from "multer";
import crypto from "crypto";
import { dirname } from "path";

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

export const getAllComment = async(req,res)=>{
    try {
        const data = await Comment.findAll()
        res.status(200).json({message:"fetch compete"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}
export const addComment = async(req,res)=>{
    const id = params.id
    const {commentContent,userId} = req.body
    const files = req.files
    try {
        const data = await Comment.create({
            comment_content:commentContent,
            user_id: userId,
            post_id: id
        })
        const imagePromises = files.map(async(image)=>{
          return await Image.create({
            image_path: `http://localhost:3030/static/${image.filename}`,
            comment_id:data.id_comment,
            user_id:userId
          })
        });
        await Promise.all(imagePromises);
        res.status(200).json({message:"comment added"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}
export const uploadCommentArray = upload.array("files",4)
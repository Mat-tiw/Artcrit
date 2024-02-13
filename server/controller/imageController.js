import Image from "../model/Image.js";
import { fileURLToPath } from "url";
import multer from "multer";
import crypto from "crypto";
export const getAllUserImage = async (req,res) => {
    const id = req.params.id;
    try {
        const allUserImage = await Image.findAll({
            where:{user_id:id}
        })
        if(!allUserImage) return res.status(401).json({error:true,message:"user have no media"})
        res.status(200).json(allUserImage)
    } catch (error) {
        res.status(500).json({error:error,message:"internal server error"})
    }
}
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

  export const testImageSaving = async (req,res)=>{
    const files = req.files
    const userId = 1
    try {
        await Image.create({image_path: `http://localhost:3030/static/${files[0].filename}`,user_id:userId})
    } catch (error) {
        res.status(500).json({message:error})
    }
  }
  export const uploadTestImage = upload.array("files",4)
import express from "express";
import { allUser,addUser,loginUser,findUser,updateUser,updateUserAvatar } from "../controller/userController.js";
import {testFile,uploadPostImage,createPost,getAllPost,getPost,getUserPost,getPostWithComments,removePost} from "../controller/postController.js";
import { getAllUserImage,testImageSaving,uploadTestImage } from "../controller/imageController.js";
import { addComment,uploadCommentArray,upvoteComment,downvoteComment,getPostComment,addChildComment,uploadChildCommentArray,getUserComment } from "../controller/commentController.js";
import { likePost,getLikedPost } from "../controller/voteController.js";
const router = express.Router();


router.get("/user", allUser);
router.post('/user/create',addUser);
router.post('/user/login',loginUser)
router.get('/user/:id', findUser);
router.post('/user/update/:id', updateUserAvatar, updateUser);


router.post('/post/create',uploadPostImage,createPost);
router.post('/post/test',testFile);
router.get('/post',getAllPost);
router.get('/post/get/:id', getPost);
router.get('/post/user/:id',getUserPost);
router.post('/post/remove/:id',removePost)


router.get('/image/:id',getAllUserImage);
router.post('/image/test',uploadTestImage,testImageSaving)

router.post('/comment/post/:id',getPostComment)
router.post('/comment/add',uploadCommentArray,addComment);
router.post('/comments/:commentId/upvote', upvoteComment);
router.post('/comments/:commentId/downvote', downvoteComment);
router.post('/comments/add/child/:id',uploadChildCommentArray,addChildComment)
router.post('/comments/user/find/:id',getUserComment)

router.post('/post/comment/:id',getPostWithComments)

router.post('/vote/like/:id',likePost)
router.post('/vote/get/post/:id',getLikedPost)

export default router;
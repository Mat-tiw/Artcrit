"use client";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  FormEvent,
} from "react";
import Banner from "@/app/components/ui/header";
import { Sidebar } from "@/app/components/ui/sidebar";
import { Avatar } from "@mui/material";
import { defaultBackend, userId } from "@/api/api.js";
import axios from "axios";
import { Posts } from "@/app/components/ui/posts";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import ImageModal from "@/app/components/ui/imageModal";
import { Comments } from "@/app/components/ui/comments";
import StarIcon from '@mui/icons-material/Star';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#16181C",
  border: "4px solid #B1F827",
  p: 4,
  color: "white",
  borderRadius: "0.75rem",
};

interface Comment {
  comment_content?: string;
  created_at?: string;
  id_comment?: number;
  vote_points?: number;
  ac_images: Images[];
  ac_user: User;
  commentChild: Comment[];
}

interface Images {
  id_image: number;
  image_path: string;
}

interface Post {
  id_post: number;
  post_title: string;
  post_badge: string;
  created_at: string;
  user_id: number;
  ac_images: Images[];
  ac_user: User;
}
interface User {
  user_name: string;
  user_email: string;
  user_avatar: string;
  id_user: number;
  user_bio: string;
  user_points?: number
}
export default function Page({ params }: Readonly<{ params: { id: number } }>) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLike, setPostLike] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();
  const [image, setImage] = useState<Images[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [noPost, setNoPost] = useState(true);
  const [editUserName, setEditUserName] = useState<string>("");
  const [comment, setComments] = useState<Comment[]>([]);
  const [editBio, setEditBio] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawnImageEdited, setDrawnImageEdited] = useState<File | null>(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.post(
          `${defaultBackend}comments/user/find/${params.id}`
        );
        setComments(res.data);
      } catch (error) {}
    };
    fetchComment()
  }, [params.id]);

  const handleOpenModal = (
    index: number,
    e: React.MouseEvent<MouseEvent>
  ) => {
    e.preventDefault();
    setCurrentIndex(index);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      image === undefined
        ? prevIndex
        : prevIndex === 0
        ? image.length - 1
        : prevIndex - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      image === undefined
        ? prevIndex
        : prevIndex === image.length - 1
        ? 0
        : prevIndex + 1
    );
  };
  const handleSave = (file: File) => {
    setDrawnImageEdited(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  const handleUpdateClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (editUserName === "") {
        const defaultUserName = user?.user_name ?? "";
        formData.append("editUserName", defaultUserName);
      } else {
        formData.append("editUserName", editUserName);
      }
      if (editBio === "") {
        const defaultUserBio = user?.user_bio ?? "";
        formData.append("editBio", defaultUserBio);
      } else {
        formData.append("editBio", editBio);
      }
      if (selectedFile) {
        formData.append("selectedFile", selectedFile);
      }
      const response = await axios.post(
        `${defaultBackend}user/update/${userId}`,
        formData
      );
      localStorage.setItem("userPic", response.data.user_avatar.user_avatar);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditBio(e.target.value);
    const bioarea = textareaRef.current;
    if (bioarea) {
      bioarea.style.height = "auto";
      bioarea.style.height = `${bioarea.scrollHeight}px`;
    }
  };
  const [editActive, setEditActive] = useState(false);
  const handleClose = () => setEditActive(false);
  const handleOpen = () => setEditActive(true);

  const [isHovered, setIsHovered] = useState(false);

  const updateUserId = userId !== null ? parseInt(userId) : null;
  useEffect(() => {
    const fetchLikedPost = async () => {
      try {
        const respond = await axios.post(
          `${defaultBackend}vote/get/post/${params.id}`
        );
        setPostLike(respond.data)
        console.log(respond.data)
      } catch (error) {
        console.log("Error fetch post:", error);
      }
    };
    fetchLikedPost();
  }, [params.id]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${defaultBackend}user/${params.id}`);
        setUser(res.data);
        console.log("user: ",res.data)
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchUser();
  }, [params.id]);
  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const res = await axios.get(`${defaultBackend}post/user/${params.id}`);
        setPosts(res.data);
        setNoPost(false);
      } catch (error) {
        setNoPost(true);
      }
    };
    fetchUserPost();
  }, [params.id]);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${defaultBackend}image/${params.id}`);
        setImage(res.data);
      } catch (error) {
        console.log("error: ", error);
        setNoPost(true);
      }
    };
    fetchImage();
  }, [params.id]);
  return (
    <div className="flex flex-col">
      <Banner />
      <div className="min-h-screen bg-primaryBg flex flex-row">
        <div className="text-white basis-[20%] flex flex-col">
          <Sidebar variant="default" />
        </div>
        <div className="text-white basis-[60%]">
          <div className="flex flex-col">
            <div className="flex flex-row mt-12 ml-6 w-full">
              <Avatar
                src={user?.user_avatar}
                sx={{
                  width: 136,
                  height: 136,
                }}
              />
              <div className="flex flex-col ml-10 w-full">
                <div className="flex flex-row w-full">
                  <h1 id="profileUserName" className="font-montserrart font-bold text-4xl">
                    {user?.user_name}
                  </h1>
                  <div className="flex flex-row-reverse w-full">
                    {updateUserId == params.id ? (
                      <button
                        className="font-montserrart font-semibold border-2 border-primary text-primary rounded-3xl p-1"
                        onClick={handleOpen}
                        id="editProfileButton"
                      >
                        Edit profile
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <p className="mt-2 min-w-fit">{user?.user_bio}</p>
                <p className="mt-5">reputation point: <StarIcon className="mb-2"/>{user?.user_points}</p>
              </div>
            </div>
            <Modal
              open={editActive}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleUpdateClick} className="flex flex-col">
                  <h1 className="font-bold font-montserrart text-2xl">
                    Edit profile
                  </h1>
                  <p>user avatar:</p>
                  <div
                    className="flex w-full justify-center mt-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleAvatarClick}
                  >
                    <div
                      className="relative cursor-pointer"
                      style={{ opacity: isHovered ? 0.7 : 1 }}
                    >
                      <Avatar
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : user?.user_avatar
                        }
                        sx={{
                          width: 100,
                          height: 100,
                        }}
                      />
                      {isHovered && (
                        <EditIcon
                          className="absolute bottom-0 right-0 text-gray-300 bg-white rounded-full p-1"
                          style={{ transform: "translate(50%, 50%)" }}
                        />
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      id="editUserAvatar"
                    />
                  </div>
                  <p className="font-montserrart">username:</p>
                  <div className="flex flex-row">
                    <EditIcon className="text-gray-300 mt-3 mr-2" />
                    <input
                    id="editUsername"
                      value={editUserName ?? ""}
                      className="mt-2 font-karla text-xl bg-transparent border-none focus:border-none outline-none placeholder-white"
                      type="text"
                      placeholder={user?.user_name}
                      onChange={(e) => setEditUserName(e.target.value)}
                    />
                  </div>
                  <p className="font-montserrart">user bio:</p>
                  <div className="flex flex-row">
                    <EditIcon className="text-gray-300 mt-3 mr-2" />
                    <textarea
                    id="editUserBio"
                      ref={textareaRef}
                      placeholder={user?.user_bio}
                      onChange={(e) => handleTextareaChange(e)}
                      value={editBio}
                      className="mt-2 font-karla placeholder-white text-xl w-full overflow-y-hidden resize-none bg-transparent focus:border-none outline-none box-border h-auto pb-0.5"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "transparent transparent",
                      }}
                      rows={1}
                    />
                  </div>
                  <div className="flex flex-row-reverse">
                    <button
                    id="editProfileFormSubmitBtn"
                      type="submit"
                      className="mt-2 font-montserrart text-xl border-primary border-2 rounded-lg p-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Box>
            </Modal>
            <div className="flex flex-row mt-12 ml-10 space-x-6">
              <button
                className={`text-xl ${
                  activeTab === "overview"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                overview
              </button>
              <button
                className={`text-xl ${
                  activeTab === "post"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("post")}
              >
                post
              </button>
              <button
                className={`text-xl ${
                  activeTab === "comments"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("comments")}
              >
                comments
              </button>
              <button
                className={`text-xl ${
                  activeTab === "media"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("media")}
              >
                media
              </button>
              <button
                className={`text-xl ${
                  activeTab === "like"
                    ? "border-b-2 border-primary text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab("like")}
              >
                like
              </button>
            </div>
          </div>
          {noPost ? (
            <div className="flex flex-col">
              <h1>User has no post</h1>
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="">
                  {noPost ? (
                    <div className="flex flex-col">
                      <h1>User has no post</h1>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <Posts
                        showComment={false}
                        key={post.id_post}
                        post_id={post.id_post}
                        title={post.post_title}
                        badge={post.post_badge}
                        userName={post.ac_user.user_name}
                        date={post.created_at}
                        images={post.ac_images}
                        userPic={post.ac_user.user_avatar}
                        toOpenModal={false}
                      />
                    ))
                  )}
                </div>
              )}
              {activeTab === "post" && (
                <div className="">
                  {noPost ? (
                    <div className="flex flex-col">
                      <h1>User has no post</h1>
                    </div>
                  ) : (
                    posts.map((post) => (
                      <Posts
                        showComment={false}
                        key={post.id_post}
                        post_id={post.id_post}
                        title={post.post_title}
                        badge={post.post_badge}
                        userName={post.ac_user.user_name}
                        date={post.created_at}
                        images={post.ac_images}
                        userPic={post.ac_user.user_avatar}
                        isInProfile={true}
                        toOpenModal={false}
                      />
                    ))
                  )}
                </div>
              )}
              {activeTab === "comments" && (
                <div className="">
                  {comment.length === 0 ? (
                    <div>
                      <h1>this user had no comment</h1>
                    </div>
                  ) : (
                    <div>
                      {comment.map((comments) => (
                        <div className="" key={comments.id_comment}>
                          <Comments
                            userName={comments.ac_user.user_name}
                            userPic={comments.ac_user.user_avatar}
                            commentPoint={comments.vote_points}
                            commentContent={comments.comment_content}
                            comment_id={comments.id_comment}
                            commentImage={comments.ac_images}
                            parentId={comments.id_comment}
                            replyable={false}
                            op={params.id}
                            user_points={comments.ac_user.user_points}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === "media" && (
                <div className="">
                  {noPost ? (
                    <div>
                      <h1>User has no media</h1>
                    </div>
                  ) : (
                    <div className="flex flex-row flex-wrap m-2">
                      {image.map((images, index) => (
                        <div className="" key={images.id_image}>
                          <div onClick={(e) => handleOpenModal(index, e)}>
                            <Image
                              className="object-cover m-2"
                              src={images.image_path}
                              width={500}
                              height={500}
                              alt="placeholder"
                            />
                          </div>
                        </div>
                      ))}
                      <ImageModal
                        open={openModal}
                        onClose={handleCloseModal}
                        images={image}
                        currentIndex={currentIndex}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        editable={false}
                        onSave={handleSave}
                      />
                    </div>
                  )}
                </div>
              )}
              {activeTab === "like" && (
                <div className="">
                  {postLike.length === 0 ? (
                    <div>
                      <h1>User have no liked post</h1>
                    </div>
                  ) : (
                    <div className="">
                      {postLike.map((post) => (
                        <Posts
                          showComment={false}
                          key={post.id_post}
                          post_id={post.id_post}
                          title={post.post_title}
                          badge={post.post_badge}
                          userName={post.ac_user.user_name}
                          date={post.created_at}
                          images={post.ac_images}
                          userPic={post.ac_user.user_avatar}
                          isInProfile={true}
                          toOpenModal={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <div className="text-white basis-[20%] ">
          <h1>{""}</h1>
        </div>
      </div>
    </div>
  );
}

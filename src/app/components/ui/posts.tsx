"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { Comments } from "./comments";
import { CommentsInput } from "./commentsInput";
import Link from "next/link";
interface Comment {
  comment_content?: string;
  created_at?: string;
  id_comment?: number;
  vote_points?: number;
  ac_images: Images[];
  ac_user: User;
}
interface User {
  user_name: string;
  user_email: string;
  user_avatar: string;
  id_user: number;
}
interface Images {
  id_image: number;
  image_path: string;
}

interface PostProps {
  title?: string;
  badge?: string;
  userName?: string;
  date?: string;
  images?: Array<{ id_image: number; image_path: string }>;
  userPic?: string;
  userId?: number;
  showComment?: boolean;
  isInProfile?: boolean;
  post_id?: number;
  comment?: Array<Comment>;
}

const formattedDate = (rawDate: string | undefined) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const dateObject = rawDate ? new Date(rawDate) : null;

  return dateObject
    ? new Intl.DateTimeFormat("en-US", options).format(dateObject)
    : "";
};
const Posts: React.FC<PostProps> = ({
  title,
  badge,
  userName,
  date,
  images,
  userPic,
  userId,
  showComment,
  isInProfile,
  post_id,
  comment,
}) => {
  const router = useRouter();
  const renderComment = () => {
    if (!comment || comment.length === 0) {
      return null;
    }
    return (
      <>
        {comment.map((comments) => (
          <Comments
            key={comments.id_comment}
            userName={comments.ac_user.user_name}
            userPic={comments.ac_user.user_avatar}
            commentPoint={comments.vote_points}
            commentContent={comments.comment_content}
            comment_id={comments.id_comment}
            commentImage={comments.ac_images}
          />

          /* <div className="ml-10">
            <Comments
              userName="Tester2"
              userPic="http://localhost:3030/static/def.jpg"
              commentPoint={2}
              commentContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
              testImage={false}
            />
          </div> */
        ))}
      </>
    );
  };
  const renderImages = () => {
    if (!images || images.length === 0) {
      return null;
    }
    let layout;
    switch (images.length) {
      case 1:
        layout = "full";
        break;
      case 2:
        layout = "twoColumn";
        break;
      case 3:
        layout = "twoRow";
        break;
      case 4:
        layout = "twoByTwo";
        break;
      default:
        layout = "default";
    }

    return (
      <div className={`flex flex-wrap justify-center p-5 ${layout}`}>
        {images.map((image, index) => (
          <Image
            key={image.id_image}
            src={image.image_path}
            width={getLayoutImage(layout, index)}
            height={getLayoutImage(layout, index)}
            sizes="(max-width: 1920px) 100vw, (max-height: 1080px) 50vw, 33vw"
            alt={`Image ${index + 1}`}
            className={`p-0.5 rounded-${getBorderRadius(
              layout,
              index
            )} hover:object-scale-down hover:rounded-xl ${getObjectPosition(
              layout,
              index
            )} object-cover`}
          />
        ))}
      </div>
    );
  };

  const getLayoutImage = (layout: string, index: number) => {
    const layoutImageMap: Record<string, Record<number, number>> = {
      full: { 0: 800 },
      twoColumn: { 0: 500, 1: 500 },
      twoRow: { 0: 500, 1: 500, 2: 800 },
      twoByTwo: { 0: 350, 1: 350, 2: 350, 3: 350 },
    };
    return layoutImageMap[layout]?.[index] || 350;
  };

  const getBorderRadius = (layout: string, index: number) => {
    const borderRadiusMap: Record<string, Record<number, string>> = {
      twoByTwo: {
        0: "tl-xl basis-1/2",
        1: "tr-xl basis-1/2",
        2: "bl-xl basis-1/2",
        3: "br-xl basis-1/2",
      },
      twoColumn: {
        0: "tl-xl rounded-bl-xl basis-1/2",
        1: "tr-xl rounded-br-xl basis-1/2",
      },
    };

    return borderRadiusMap[layout]?.[index] || "xl";
  };

  const getObjectPosition = (layout: string, index: number) => {
    const objectPositionMap: Record<string, Record<number, string>> = {
      twoColumn: { 0: "object-left", 1: "object-right" },
      twoByTwo: {
        0: "object-left",
        1: "object-right",
        2: "object-left",
        3: "object-right",
      },
      twoRow: { 0: "object-left", 1: "object-right" },
    };
    return objectPositionMap[layout]?.[index] || "";
  };

  return (
    <div className="m-5 flex flex-col bg-secondary rounded-xl text-white -z-10">
      <div className="p-5 flex z-10">
        {isInProfile ? (
          <Avatar
            className=""
            src={userPic}
            sx={{
              width: 64,
              height: 64,
            }}
          />
        ) : (
          <Link
            href={`/user/${userId}`}
            className="z-10 hover:-translate-y-0.5 hover:translate-x-0.5"
          >
            <Avatar
              className=""
              src={userPic}
              sx={{
                width: 64,
                height: 64,
              }}
            />
          </Link>
        )}
        <div className="flex flex-col pl-2 z-10">
          <button
            className="font-montserrart font-bold text-1xl text-left hover:underline-offset-2 hover:underline"
            onClick={() => router.push(`/user/${userId}`)}
          >
            {userName}
          </button>
          <h1>{formattedDate(date)}</h1>
        </div>
      </div>
      <Link href={`/post/${post_id}`}>
        <div className="pl-16 z-10">
          <p className="font-karla text-wrap mr-6">{title}</p>

          <span className="p-0.5 bg-red-600 rounded-sm">{badge}</span>
        </div>
        {renderImages()}
      </Link>
      <div className="flex flex-row z-10">
        <div className="flex flex-row m-2 p-2 rounded-sm hover:bg-gray-400 hover:cursor-pointer hover:transition-colors ease-in duration-300">
          <FavoriteBorderIcon
            className=""
            sx={{
              width: 36,
              height: 36,
            }}
          />
          <p className="m-2">Like</p>
        </div>
        <Link href={`/post/${post_id}`}>
          <div className="flex flex-row m-2 p-2 rounded-sm hover:bg-gray-400 hover:cursor-pointer hover:transition-colors ease-in duration-300">
            <ChatBubbleOutlineIcon
              className=""
              sx={{
                width: 36,
                height: 36,
              }}
            />
            <p className="m-2 ">Comments</p>
          </div>
        </Link>
      </div>

      {showComment ? (
        <div className="flex flex-col p-5 z-10">
          <div className="">
            <CommentsInput postId={post_id} />
          </div>
          {renderComment()}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

Posts.displayName = "Posts";
export { Posts };

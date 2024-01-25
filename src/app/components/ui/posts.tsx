import React from "react";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
interface PostProps {
  title?: string;
  badge?: string;
  userName?: string;
  date?: string;
  images?: Array<{ id_image: number; image_path: string }>;
  userPic?: string;
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
}) => {
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
            key={index}
            src={image.image_path}
            width={layoutStyle(layout)}
            height={layoutStyle(layout)}
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

  const layoutStyle = (layout: string) => {
    switch (layout) {
      case "full":
        return 800;
      case "twoColumn":
        return 500;
      case "twoRow":
        return 400;
      case "twoByTwo":
        return 350;
      default:
        return 350;
    }
  };

  const getBorderRadius = (layout: string, index: number) => {
    if (layout === "twoByTwo" && index === 0) return "tl-xl basis-1/2";
    if (layout === "twoByTwo" && index === 1) return "tr-xl basis-1/2";
    if (layout === "twoByTwo" && index === 2) return "bl-xl basis-1/2";
    if (layout === "twoByTwo" && index === 3) return "br-xl basis-1/2";
    if (layout === "twoColumn" && index === 0)
      return "tl-xl rounded-bl-xl basis-1/2";
    if (layout === "twoColumn" && index === 1)
      return "tr-xl rounded-br-xl basis-1/2";
    return "xl";
  };
  const getObjectPosition = (layout: string, index: number) => {
    if (layout === "twoColumn" && index === 0) return "object-left ";
    if (layout === "twoColumn" && index === 1) return "object-right";
    if (layout === "twoByTwo" && index === 0) return "object-left ";
    if (layout === "twoByTwo" && index === 1) return "object-right ";
    if (layout === "twoByTwo" && index === 2) return "object-left ";
    if (layout === "twoByTwo" && index === 3) return "object-right ";
    if (layout === "twoRow" && index === 0) return "object-left ";
    if (layout === "twoRow" && index === 1) return "object-right ";
    return "";
  };
  return (
    <div className="m-5 flex flex-col bg-secondary rounded-xl text-white">
      <div className="p-5 flex">
        <div className="">
          <Avatar
            className=""
            src={userPic}
            sx={{
              width: 64,
              height: 64,
            }}
          />
        </div>
        <div className="flex flex-col pl-2">
          <h1 className="font-montserrart font-bold text-1xl">{userName}</h1>
          <h1>{formattedDate(date)}</h1>
        </div>
      </div>
      <div className="pl-16">
        <p className="font-karla text-wrap mr-6">{title}</p>

        <span className="p-0.5 bg-red-600 rounded-sm">{badge}</span>
      </div>
      {renderImages()}
      <div className="flex flex-row">
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
      </div>
    </div>
  );
};

Posts.displayName = "Posts";
export { Posts };

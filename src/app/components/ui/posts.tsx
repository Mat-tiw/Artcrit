import React from "react";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";

interface PostProps {
  title?: string;
  badge?: string;
  userName?: string;
  date?: string;
  images?: Array<{ id_image: number; image_path: string }>;
}
const formattedDate = (rawDate: string | undefined) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
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
}) => {
  const renderImages = () => {
    if (!images || images.length === 0) {
      return null;
    }

    // Determine the layout based on the number of images
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
            width={350}
            height={350}
            sizes="(max-width: 768px) 100vw, (max-width: 1350px) 50vw, 33vw"
            alt={`Image ${index + 1}`}
            className={`p-0.5 rounded-${getBorderRadius(layout, index)} hover:object-scale-down ${getObjectPosition(layout, index)} object-cover`}
          />
        ))}
      </div>
    );
  };

  const getBorderRadius = (layout: string, index: number) => {
    if (layout === "twoByTwo" && index === 0) return "tl-xl";
    if (layout === "twoByTwo" && index === 1) return "tr-xl";
    if (layout === "twoByTwo" && index === 2) return "bl-xl";
    if (layout === "twoByTwo" && index === 3) return "br-xl";
    return "xl";
  };
  const getObjectPosition = (layout: string, index: number) => {
    if(layout === "twoColumn" && index === 0) return "object-left "
    if(layout === "twoColumn" && index === 1) return "object-right"
    if (layout === "twoByTwo" && index === 0) return "object-left ";
    if (layout === "twoByTwo" && index === 1) return "object-right ";
    if (layout === "twoByTwo" && index === 2) return "object-left ";
    if (layout === "twoByTwo" && index === 3) return "object-right ";
    if (layout === "twoRow" && index === 0) return "object-left ";
    if (layout === "twoRow" && index === 1) return "object-right ";
    if (layout === "twoRow" && index === 2) return "object-cover";
    return ""
  }
  return (
    <div className="m-5 flex flex-col bg-secondary rounded-xl text-white">
      <div className="p-5 flex">
        <div className="">
          <Avatar className="" />
        </div>
        <div className="flex flex-col pl-2">
          <h1 className="font-montserrart font-bold text-1xl">{userName}</h1>
          <h1>{formattedDate(date)}</h1>
        </div>
      </div>
      <div className="pl-16">
        <p className="font-montserrart">{title}</p>
        <span className="bg-red-600 rounded-sm">{badge}</span>
      </div>
      {renderImages()}
    </div>
  );
};

Posts.displayName = "Posts";
export { Posts };

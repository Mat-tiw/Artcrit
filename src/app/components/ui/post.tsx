import Avatar from "@mui/material/Avatar";
import Image from "next/image";
interface PostProps{
    postTitle?:string;
    userName?:string;
    srcPF?:string;
    src?:string;
    span:string;
}
interface ImageProps{
    imgSrc?:string;
}
const Post = () => {
  return (
    <div className="m-5 flex flex-col bg-secondary rounded-xl ">
      <div className="p-5 flex">
        <div className="">
          <Avatar className="" />
        </div>
        <div className="flex flex-col pl-2 ">
          <h1 className="font-montserrart font-bold text-1xl">Username</h1>
          <h1>Wed Jan 10 2024 15:23:13 GMT+0700 (Indochina Time)</h1>
        </div>
      </div>
      <div className="pl-16">
        <p className="font-montserrart">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </p>
        <span className="bg-red-600 rounded-sm">hello span</span>
      </div>
      <div className="flex flex-wrap justify-center p-5">
        <div className="basic-1/2">
          <Image
            src="/test3.jpg"
            width={350}
            height={350}
            sizes="(max-width: 768px) 100vw, (max-width: 1350px) 50vw, 33vw"
            alt="alt"
            className="rounded-tl-xl"
          />
          <Image
            src="/test3.jpg"
            width={350}
            height={350}
            sizes="(max-width: 768px) 100vw, (max-width: 1350px) 50vw, 33vw"
            alt="alt"
            className="rounded-bl-xl"
          />
        </div>
        <div className="basic-1/2">
          <Image
            src="/test3.jpg"
            width={350}
            height={350}
            sizes="(max-width: 768px) 100vw, (max-width: 1350px) 50vw, 33vw"
            alt="alt"
            className="rounded-tr-xl"
          />
          <Image
            src="/test3.jpg"
            width={350}
            height={350}
            sizes="(max-width: 768px) 100vw, (max-width: 1350px) 50vw, 33vw"
            alt="alt"
            className="rounded-br-xl"
          />
        </div>
      </div>
    </div>
  );
};

export { Post };

import { Avatar } from "@mui/material";
import React from "react";
interface MiniProfileProps{
    src?:string;
    userName?:string

}
const MiniProfile =React.forwardRef<HTMLDivElement, MiniProfileProps>(({src,userName},ref) => {
  return (
    <div className="bg-secondary m-5 flex flex-col items-center justify-center rounded-xl">
      <Avatar
        alt="Remy Sharp"
        src={src}
        className="m-5"
        sx={{ width: 80, height: 80 }}
      />
      <h1 className="font-montserrat font-bold pb-5 text-2xl">{userName}</h1>
    </div>
  );
});
MiniProfile.displayName ="MiniProfile";
export {MiniProfile};
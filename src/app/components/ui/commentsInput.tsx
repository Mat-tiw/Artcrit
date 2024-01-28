import React from 'react'
import { Avatar } from '@mui/material'
export const CommentsInput = () => {
    const login = localStorage.getItem("token") === null ? false : true;
    const userPic = localStorage.getItem("userPic");
  return (
    <>
    {login ? (  <div className='flex flex-row pb-5'>
        <Avatar src={userPic !== null ? userPic : ""} />
        <input type="text" placeholder='Comment' className='pl-2  border-none bg-transparent focus:outline-none' autoFocus={true}/>
    </div>):(
        <div className="font-montserrart text-white border-red-500 text-center items-center border-2 rounded-lg">
            you must be logged in before you can comments
        </div>
    )}
    </>
  )
}

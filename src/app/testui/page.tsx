"use client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#313338",
  border: "4px solid #B1F827",
  p: 4,
  color: "white",
  borderRadius: "0.75rem",
  display: "flex",
  flexDirection: "column", // Set flexDirection to column
  alignItems: "center", // Center items horizontally
  justifyContent: "center", // Center items vertically
};
const TestUi = () => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [user, setInputUser] = useState<string>("");
  const [pwd, setInputPass] = useState<string>("");
  
  const handleShowToken = () =>{
    localStorage.clear()
  }

  const handleUserOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUser(e.target.value);
  };

  const handlePassOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPass(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3030/api/user/login', {
        user: user,
        pwd: pwd,
      });

      console.log(res.data);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('userName',res.data.userName)
      localStorage.setItem('userPic',res.data.userPic)
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="font-montserrart text-2xl font-bold">Login</h1>
          <input
            type="text"
            onChange={handleUserOnChange}
            className="
            text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
            placeholder="username"
          />
          <input
            type="text"
            onChange={handlePassOnChange}
            className=" text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
            placeholder="password"
          />
          <button onClick={handleSubmit} className="mt-5 border-white border-2 p-2 rounded-xl text-xl font-montserrart">Submit</button>
        </Box>
      </Modal>
    </>
  );
};
export default TestUi;

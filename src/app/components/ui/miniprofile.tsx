import { Avatar } from "@mui/material";
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
interface MiniProfileProps {
  src?: string;
  userName?: string;
}
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
};
const MiniProfile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openRegi, setOpenRegi] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenRegi = () => setOpenRegi(true);
  const handleCloseRegi = () => setOpenRegi(false);
  const [user, setInputUser] = useState<string>("");
  const [pwd, setInputPass] = useState<string>("");
  const userPic = localStorage.getItem('userPic');
  const handleUserOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUser(e.target.value);
  };

  const handlePassOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPass(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3030/api/user/login", {
        user: user,
        pwd: pwd,
      });

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("userPic", res.data.userPic);
      localStorage.setItem("userId",res.data.userId);
      setOpen(false);
      location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleSubmitCreate = async () => {
    try {
      const res = await axios.post("http://localhost:3030/api/user/create", {
        user: user,
        pwd: pwd,
      });
      console.log(res)
      setOpenRegi(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const login = localStorage.getItem("token") === null ? false : true;
  console.log(login);
  return (
    <>
      <div className="bg-secondary m-5 flex flex-col items-center justify-center rounded-xl sticky">
        <Avatar
          alt="Remy Sharp"
          src={userPic !== null ? userPic : ''}
          className="m-5"
          sx={{ width: 100, height: 100 }}
        />
        {login ? (
          <h1 className="font-montserrat font-bold pb-5 text-2xl">{localStorage.getItem('userName')}</h1>
        ) : (
          <div className="">
          <h1
            className="item-center text-primary font-montserrat font-bold p-2 mb-2 text-2xl cursor-pointer border-2 border-primary rounded-xl"
            onClick={handleOpen}
          >
            login
          </h1>
            <i className="border-b-gray-400 w-full border-1"></i>
            <h1
            className="text-primary font-montserrat font-bold p-2 mb-2 text-2xl cursor-pointer border-2 border-primary rounded-xl"
            onClick={handleOpenRegi}
          >
            register
          </h1>
          </div>
        )}
      </div>
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
      <Modal
        open={openRegi}
        onClose={handleCloseRegi}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="font-montserrart text-2xl font-bold">Register</h1>
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
          <button onClick={handleSubmitCreate} className="mt-5 border-white border-2 p-2 rounded-xl text-xl font-montserrart">Submit</button>
        </Box>
      </Modal>
    </>
  );
};
MiniProfile.displayName = "MiniProfile";
export { MiniProfile };

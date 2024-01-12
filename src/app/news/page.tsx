"use client";
import axios from "axios";
import { ChangeEvent, useState,useEffect } from "react";
const News = () => {
  const [pwd, setPwd] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };
  const handlePdwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  async function upload() {
    try {
      const res = await axios.post('http://localhost:3030/api/user/create',{
        user,pwd,email
      })
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    const fetchData = async()=>{
    try {
      const res = await axios.get("http://localhost:3030/api/post")
      const postData = res.data;
      console.log(postData)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
  },[])
  return (
    <>
      <div className="bg-primaryBg flex flex-col items-center">
        <input
          className="m-5"
          type="text"
          placeholder="user_name"
          onChange={handleUserChange}
        />
        <input
          className="m-5"
          type="text"
          placeholder="user_password"
          onChange={handlePdwChange}
        />
        <input
          className="m-5"
          type="text"
          placeholder="user_email"
          onChange={handleEmailChange}
        />
        <div className="border-2 rounded-lg m-5">
          <button className=" text-white border-white p-2" onClick={upload}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default News;

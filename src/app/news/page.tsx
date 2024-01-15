"use client"

import axios from "axios";
import { useEffect, useState } from "react";

const News = () => {
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
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <div className="bg-secondary w-screen h-screen items-center flex flex-col">
        <div className="m-5 flex-col flex">
          <input type="text" className="m-5" onChange={handleUserOnChange} />
          <input type="text" className="m-5" onChange={handlePassOnChange} />
          <button className="m-5 border-2 border-white rounded-xl text-white font-montserrart" onClick={handleSubmit}>
            click me
          </button>
          <button className="m-5 border-2 border-white rounded-xl text-white font-montserrart" onClick={handleShowToken}>show token</button>
        </div>
      </div>
    </>
  );
};

export default News;

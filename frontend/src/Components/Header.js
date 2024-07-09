import React from "react";
import { Link } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { RiImageAddFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCalculator } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { TbMessageChatbot } from "react-icons/tb";
import plantlogo from "../Utils/plantlogo.png";
const Header = () => {
  return (
    <>
      <div className="header bg-black p-4 text-white">
        <div className="content p-2 flex justify-between items-center">
          <div className="heading flex gap-2 justify-center items-center">
            <img className="h-10" src={plantlogo} />
            <div className="font-bold text-3xl ">PlantFix</div>
          </div>
          <div className="flex justify-evenly gap-5 items-center text-lg font-semibold">
            <Link
              to="/upload"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <RiImageAddFill size={25} />
              Upload
            </Link>
            <Link
              to="/weather"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <TiWeatherPartlySunny size={25} />
              Weather
            </Link>
            <Link
              to="/fertilizer"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <FaCalculator size={25} />
              Fertilizer Calculator
            </Link>
            <Link
              to="/stores"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <FaStore size={25} />
              Stores
            </Link>

            <Link
              to="/createblog"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <TfiWrite size={25} />
              Create Blogs
            </Link>
            <Link
              to="/allBlogs"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <TfiWrite size={25} />
              Blogs
            </Link>
            <Link
              to="/chatbot"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <TbMessageChatbot size={25} />
              ChatBot
            </Link>

            <Link
              to="/"
              className="p-2 flex justify-center items-center gap-2 hover:bg-white hover:text-black hover:scale-105 cursor-pointer rounded-xl"
            >
              <BiLogOutCircle size={25} />
              LogOut
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

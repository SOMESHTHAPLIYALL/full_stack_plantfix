import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import axios from "axios";
const LoginPage = () => {
  const URL = "https://plantfix-backend.onrender.com";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const [showLoginIcon, setShowLoginIcon] = useState(false);
  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${URL}/api/v1/user/login`, {
        email: email,
        password: password,
      });
      if (data?.success) {
        localStorage.setItem("id", data?.user._id);
        navigate("/upload");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowLoginIcon = async () => {
    setShowLoginIcon(!showLoginIcon);
  };
  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);
  const styles = `
    .animate-slide-down {
      animation: slideDown 1.0s ease forwards;
    }

    @keyframes slideDown {
      0% {
        transform: translateY(-50%);
      }
     
    }
  `;
  return (
    <>
      <style>{styles}</style>
      <div className="h-screen bg-[url('https://www.advancedtreecareinc.com/wp-content/uploads/2021/11/plant-health.jpeg')] bg-cover">
        <div className="p-4 flex justify-end items-center">
          <div
            className={` ${
              animate ? "animate-slide-down" : ""
            } box  bg-transparent h-[600px] w-[500px]  mt-10 mr-20 rounded-xl shadow-2xl flex flex-col p-4`}
          >
            <h1 className="place-self-center mt-5 font-bold text-6xl underline underline-offset-4">
              Login
            </h1>

            <input
              className="p-4 rounded-xl bg-slate-300 outline-none w-[400px] mt-20 place-self-center"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <input
              className="p-4 rounded-xl bg-slate-300 outline-none w-[400px] mt-10 place-self-center"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <div className="flex justify-center items-center mt-12">
              <button
                className="place-self-center p-4 rounded-xl bg-violet-500 cursor-pointer hover:scale-105 hover:text-white text-black font-bold text-xl w-[200px] flex justify-center items-center gap-2"
                onMouseEnter={handleShowLoginIcon}
                onMouseLeave={handleShowLoginIcon}
                onClick={handleLogin}
              >
                LOGIN
                {showLoginIcon ? <IoMdLogIn size={25} /> : null}
              </button>
            </div>
            <h1 className="mt-5 text-2xl font-bold place-self-center">OR</h1>
            <h1 className="mt-5 text-2xl font-semibold place-self-center">
              Don't have an account?{" "}
              <Link
                className="hover:underline underline-offset-4 font-bold "
                to="/signup"
              >
                Register
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

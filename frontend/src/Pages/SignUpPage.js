import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
const SignUpPage = () => {
  const URL = "https://plantfix-backend.onrender.com";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const [showLoginIcon, setShowLoginIcon] = useState(false);
  const handleRegister = async () => {
    console.log(username);
    try {
      const { data } = await axios.post(`${URL}/api/v1/user/register`, {
        username: username,
        email: email,
        password: password,
      });
      if (data?.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowLoginIcon = async () => {
    setShowLoginIcon(!showLoginIcon);
  };
  const styles = `
    .animate-slide-down {
      animation: slideDown 1.0s ease forwards;
    }

    @keyframes slideDown {
      0% {
        transform: translateX(-150%);
      }
     
    }
  `;

  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <>
      <style>{styles}</style>
      <div className="h-screen bg-[url('https://img.freepik.com/free-vector/flat-design-people-taking-care-plants_23-2148983846.jpg')] bg-cover">
        <div className="p-4 flex justify-end items-end backdrop-blur-sm">
          <div
            className={`box ${
              animate ? "animate-slide-down" : ""
            }  bg-transparent  w-[500px] place-self-end mt-5 mr-20 rounded-xl shadow-2xl flex flex-col p-4`}
          >
            <h1 className="place-self-center mt-5 font-bold text-6xl underline underline-offset-4">
              SignUp
            </h1>
            <input
              className="p-4 rounded-xl bg-slate-300 outline-none w-[400px] mt-20 place-self-center"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
            <input
              className="p-4 rounded-xl bg-slate-300 outline-none w-[400px] mt-10 place-self-center"
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
                onClick={handleRegister}
              >
                SIGNUP
                {showLoginIcon ? <FaSignInAlt size={25} /> : null}
              </button>
            </div>
            <h1 className="mt-8 text-2xl font-bold place-self-center text-white">
              OR
            </h1>
            <h1 className="mt-8 text-2xl font-semibold place-self-center">
              Already have an account?{" "}
              <Link
                className="hover:underline underline-offset-4 font-bold "
                to="/login"
              >
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

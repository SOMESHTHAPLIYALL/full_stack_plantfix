import React, { useEffect, useState } from "react";
import { PiPottedPlantFill } from "react-icons/pi";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const styles = `
    .animate-slide-down {
      animation: slideDown 1.0s ease forwards;
    }

    .animate-slide-up {
      animation: slideUp 1.0s ease forwards;
    }

    @keyframes slideDown {
      0% {
        transform: translateY(-400%);
      }
      100% {
        transform: translateY(0);
      }
    }

    @keyframes slideUp {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
  `;

  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <>
      <style>{styles}</style>
      <div className="h-screen bg-[url('https://img.freepik.com/free-photo/close-up-hands-taking-care-plant_23-2149098334.jpg')] bg-cover p-4">
        <div className="heading flex justify-start items-center mt-40 ml-10">
          <h1
            className={` ${
              animate ? "animate-slide-down" : null
            } font-bold text-8xl text-white flex justify-center items-center`}
          >
            Welcome to PlantFix <PiPottedPlantFill size={100} color="green" />
          </h1>
        </div>
        <div className="flex justify-center items-center mt-32 text-white font-semibold text-2xl">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "(PlantFix  helps farmers to identify diseases in their crops)",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "(It consists of an AI integrated chatbot with voice commands)",
              1000,
              "(A weather recommended crop system)",
              1000,
              "(In-built fertilizer calculator)",
              1000,
              "(Information of all the nearby fertilizers store)",
              1000,
              "(Blogging feature where farmers can spread awareness)",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
          />
        </div>
        <div
          className={` ${
            animate ? "animate-slide-up" : null
          } flex justify-center items-center   mt-40`}
        >
          <button
            className={` ${
              animate ? "animate-slide-up" : null
            }  bg-violet-500 cursor-pointer p-8 rounded-xl hover:scale-105 font-bold text-2xl hover:bg-green-500`}
            onClick={() => navigate("/login")}
          >
            Explore our services
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

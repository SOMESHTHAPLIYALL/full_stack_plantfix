import React, { useEffect, useState } from "react";
import MapComponent from "../Components/MapComponent.js";
import Header from "../Components/Header.js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Stores() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setShow(true);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="h-screen bg-[url('https://imgs.search.brave.com/JHJZBg7PZEuE9ehcy2sbn3vGPwF4jreBTg9tr28C-y4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/Nzg5MTYxNzE3Mjgt/NDY2ODZlYWM4ZDU4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TWpCOGZI/SmxkR0ZwYkh4bGJu/d3dmSHd3Zkh4OE1B/PT0')] bg-cover w-full flex flex-col  items-center">
        <h1 className="font-bold m-5 text-5xl text-white">Nearby Stores</h1>
        {show ? (
          <MapComponent location={location} />
        ) : (
          <div className="flex justify-center items-center h-full">
            {" "}
            <AiOutlineLoading3Quarters
              className="animate-spin"
              size={100}
            />{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default Stores;

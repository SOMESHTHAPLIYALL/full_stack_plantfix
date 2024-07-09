import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
const AllBlogsPage = () => {
  const URL = "https://plantfix-backend.onrender.com";
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/blog/allBlogs`);
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      <Header />
      <div className=" bg-blue-200 min-h-screen">
        <div className="p-4 content">
          <div className="mt-10 flex justify-evenly flex-wrap gap-20">
            {blogs?.map((blog) => {
              return (
                <div className="bg-white h-[600px] w-[600px] overflow-auto p-4 rounded-xl font-bold shadow-xl flex flex-col ">
                  <img
                    className="place-self-center h-[300px] rounded-xl "
                    src={blog?.image}
                  />
                  <h1 className="mt-5 text-xl ">
                    Title: <span className="text-lg">{blog?.title}</span>
                  </h1>
                  <h1 className="mt-5 text-xl">
                    Description:{" "}
                    <span className="text-lg">{blog?.description}</span>
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBlogsPage;

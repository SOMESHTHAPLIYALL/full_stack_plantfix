import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { MdOutlineAddComment } from "react-icons/md";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
const CreateBlog = () => {
  const URL = "https://plantfix-backend.onrender.com";
  const userID = localStorage.getItem("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsUpdateModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [title1, setTitle1] = useState("");
  const [description1, setDescription1] = useState("");
  const [image1, setImage1] = useState("");
  const [loading, setloading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [id, setId] = useState(null);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUpdateModal = (blog) => {
    console.log(blog._id);
    setId(blog?._id);
    setTitle1(blog?.title);
    setDescription1(blog?.description);
    setImage1(blog?.image);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const getBlogs = async () => {
    try {
      const { data } = await axios.post(`${URL}/api/v1/user/singleUser`, {
        id: userID,
      });
      if (data?.success) {
        console.log(data);
        setBlogs(data?.user?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveBlog = async () => {
    try {
      const { data } = await axios.post(`${URL}/api/v1/blog/createBlog`, {
        userID: userID,
        title: title,
        description: description,
        image: image,
      });
      if (data?.success) {
        setTitle("");
        setDescription("");
        setImage("");
        handleCloseModal();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    setloading(true);
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pmcr8gua");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dgplustqn/image/upload",
          formData
        );

        setImage(response.data.url);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange2 = async (e) => {
    setloading(true);
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pmcr8gua");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dgplustqn/image/upload",
          formData
        );

        setImage1(response.data.url);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDel = async (blogID) => {
    try {
      const { data } = await axios.post("/api/v1/blog/deleteBlog", {
        blogID: blogID,
      });
      if (data?.success) {
        alert("Blog deleted succesfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlog = async () => {
    try {
      const { data } = await axios.post("/api/v1/blog/updateBlog", {
        title: title1,
        description: description1,
        image: image1,
        id: id,
      });

      if (data?.success) {
        handleCloseUpdateModal();
        alert("Blog Update Succesfully");
        window.location.reload();
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
          <div className="flex flex-col">
            <div className="flex flex-col gap-5 justify-center items-center mt-5">
              <button
                className="p-4 rounded-xl bg-violet-500 hover:bg-violet-400 hover:scale-105 cursor-pointer font-bold text-3xl gap-2 flex justify-center items-center shadow-xl"
                onClick={handleOpenModal}
              >
                <MdOutlineAddComment className="mt-2" size={30} />
                Create
              </button>
            </div>
          </div>
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
                  <div className="mt-10 flex justify-center gap-5">
                    <button
                      className="bg-red-500  p-4 rounded-xl cursor-pointer text-xl hover:bg-red-400 w-[300px] flex justify-center items-center gap-2"
                      onClick={() => handleDel(blog._id)}
                    >
                      Delete
                      <AiFillDelete size={30} />
                    </button>
                    <button
                      className="bg-green-500  p-4 rounded-xl cursor-pointer text-xl hover:bg-green-400 w-[300px] flex justify-center items-center gap-2"
                      onClick={() => handleOpenUpdateModal(blog)}
                    >
                      Update
                      <RxUpdate size={30} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isModalUpdateOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Update Blog</h2>
              <button
                onClick={handleCloseUpdateModal}
                className="text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  placeholder="Enter the title"
                  value={title1}
                  onChange={(e) => setTitle1(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  rows="4"
                  placeholder="Enter the description"
                  value={description1}
                  onChange={(e) => setDescription1(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  accept="image/*"
                  onChange={handleFileChange2}
                />
              </div>
              <div className="flex justify-center items-center">
                {loading ? <h1>Uploading....</h1> : ""}
              </div>

              <div className="flex justify-center items-center mt-5">
                <button
                  type="button"
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 "
                  onClick={updateBlog}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Create New Blog</h2>
              <button onClick={handleCloseModal} className="text-xl font-bold">
                &times;
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  rows="4"
                  placeholder="Enter the description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-center items-center">
                {loading ? <h1>Uploading....</h1> : ""}
              </div>

              <div className="flex justify-center items-center mt-5">
                <button
                  type="button"
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 "
                  onClick={saveBlog}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBlog;

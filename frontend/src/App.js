import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import UploadPicturePage from "./Pages/UploadPicturePage";
import ChatbotPage from "./Pages/ChatbotPage";
import Stores from "./Pages/Stores";
import FertilizerCalculator from "./Pages/FertilizerCalculator";
import CreateBlog from "./Pages/CreateBlog";
import AllBlogsPage from "./Pages/AllBlogsPage";
import WeatherPage from "./Pages/WeatherPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/upload" element={<UploadPicturePage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/fertilizer" element={<FertilizerCalculator />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/allBlogs" element={<AllBlogsPage />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

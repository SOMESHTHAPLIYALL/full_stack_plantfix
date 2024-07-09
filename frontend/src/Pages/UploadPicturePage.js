import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { FiUpload } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
const UploadPicturePage = () => {
  const URL = "https://plantfix-backend.onrender.com";
  const userId = localStorage.getItem("id");

  const [loading, setloading] = useState(false);
  const [allImages, setallImages] = useState([]);
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

        const mlFormData = new FormData();
        mlFormData.append("file", file);

        const mlEndpoint = "http://127.0.0.1:8000/predict";
        const mlResponse = await axios.post(mlEndpoint, mlFormData);

        if (mlResponse.status === 200) {
          try {
            const { data } = await axios.post(`${URL}/api/v1/image/saveImage`, {
              userId: userId,
              image: response.data.url,
              disease: mlResponse?.data?.class,
              confidence: (
                parseFloat(mlResponse?.data.confidence) * 100
              ).toFixed(2),
            });
            if (data?.success) {
              window.location.reload();
              setloading(false);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.post(`${URL}/api/v1/image/getImage`, {
        userID: userId,
      });
      if (data?.success) {
        console.log(data);
        setallImages(data?.user?.images);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post(`${URL}/api/v1/image/deleteImage`, {
        imageID: id,
      });
      if (data?.success) {
        alert("Image Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Header />
      <div className="bg-[url('https://cdn.thewirecutter.com/wp-content/media/2022/09/plant-ID-apps-2048px-6025-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024')] bg-cover h-screen ">
        <div className="h-full backdrop-blur-sm flex flex-col p-4 overflow-auto">
          <div className="place-self-center mt-10">
            <div className="flex justify-center items-center ">
              <label
                htmlFor="image"
                className="place-self-center p-4 rounded-xl bg-violet-500 cursor-pointer hover:scale-105 hover:text-white text-black font-bold text-2xl w-[200px] flex justify-center items-center gap-2"
              >
                {loading ? (
                  <CgSpinner className="animate-spin" size={30} />
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <FiUpload size={30} />
                    UPLOAD
                  </div>
                )}
              </label>
              <input
                className="hidden"
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              ></input>
            </div>
          </div>
          <div className="mt-10 flex gap-20 flex-wrap justify-start ml-10">
            {allImages?.map((image) => {
              return (
                <div className="bg-white text-xl font-bold rounded-xl shadow-xl p-4 h-[600px] w-[400px] flex flex-col overflow-auto">
                  <img
                    className="place-self-center h-[300px] w-full rounded-xl"
                    src={image?.image}
                  />
                  <h1 className="mt-5">Disease: {image?.disease}</h1>
                  <h1 className="mt-5">Confidence: {image?.confidence}%</h1>
                  {image?.disease === "Early Blight" ? (
                    <h1 className="mt-5">
                      Precautions: 1. *Crop Rotation*: - Avoid planting potatoes
                      or other nightshades in the same soil consecutively to
                      reduce the build-up of early blight pathogens. 2. *Proper
                      Spacing and Pruning*: - Ensure adequate spacing between
                      plants to improve air circulation and reduce humidity
                      around the foliage. Prune lower leaves to prevent
                      soil-borne spores from splashing onto the leaves. 3.
                      *Fungicide Application*: - Apply fungicides as soon as
                      symptoms are detected. Use fungicides containing active
                      ingredients like chlorothalonil or mancozeb, following
                      recommended application rates and intervals.
                    </h1>
                  ) : null}
                  {image?.disease === "Late Blight" ? (
                    <h1 className="mt-5">
                      Precautions: 1. *Regular Monitoring and Removal*: -
                      Frequently inspect plants for symptoms of late blight and
                      promptly remove and destroy infected plants to prevent the
                      spread of the disease. 2. *Preventive Fungicide Spraying*:
                      - Use preventive fungicides containing active ingredients
                      like copper-based compounds or systemic fungicides like
                      metalaxyl before the onset of favorable conditions for
                      late blight (cool, wet weather). 3. *Irrigation
                      Management*: - Avoid overhead irrigation which can spread
                      the spores. Water plants early in the day so the foliage
                      can dry before evening.
                    </h1>
                  ) : null}
                  {image?.disease === "Healthy" ? (
                    <h1 className="mt-5">
                      Precautions: 1. *Soil Health Maintenance*: - Ensure the
                      soil is well-drained and rich in organic matter. Conduct
                      regular soil tests and amend the soil with compost and
                      balanced fertilizers to maintain nutrient levels. 2.
                      *Integrated Pest Management (IPM)*: - Implement IPM
                      practices such as using disease-resistant potato
                      varieties, rotating crops, and employing biological
                      control agents to manage pests and diseases. 3. *Proper
                      Watering and Mulching*: - Water plants at the base rather
                      than from above to keep the foliage dry. Use mulch to
                      retain soil moisture, suppress weeds, and prevent
                      soil-borne diseases from splashing onto the leaves.
                    </h1>
                  ) : null}
                  <button
                    className="p-4 mt-5 rounded-xl font-bold bg-red-500 hover:bg-red-400 cursor-pointer"
                    onClick={() => handleDel(image?._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPicturePage;

import React, { useState } from "react";
import Header from "../Components/Header";
const FertilizerCalculator = () => {
  const [area, setArea] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const areaNum = parseFloat(area);
    const nitrogenNum = parseFloat(nitrogen);
    const percentageNum = parseFloat(percentage);

    if (
      isNaN(areaNum) ||
      isNaN(nitrogenNum) ||
      isNaN(percentageNum) ||
      percentageNum === 0
    ) {
      setResult(
        "Please enter valid numbers and ensure percentage is not zero."
      );
      return;
    }

    const amountNeeded = (nitrogenNum * areaNum) / (percentageNum / 100);
    setResult(`You need ${amountNeeded.toFixed(2)} pounds of fertilizer.`);
  };
  return (
    <>
      <Header />
      <div className="h-[87.5vh] flex items-center justify-center bg-[url('https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_1280.jpg')]">
        <div className="backdrop-blur-sm h-full w-full flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md ">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Fertilizer Calculator
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700">Area (square feet):</label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full outline-none"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Nitrogen Needed (pounds per 1,000 sq ft):
              </label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full outline-none"
                value={nitrogen}
                onChange={(e) => setNitrogen(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Fertilizer Percentage (%):
              </label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full outline-none"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
            <button
              onClick={handleCalculate}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            {result && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                {result}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FertilizerCalculator;

import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";

const cropData = {
  January: [
    {
      name: "Spinach",
      image: "",
      description:
        "A cold-hardy leafy green that's perfect for winter planting.",
    },
    {
      name: "Kale",
      image: "",
      description:
        "Another hardy green that thrives in cold weather and is packed with nutrients.",
    },
    {
      name: "Broccoli",
      image: "",
      description:
        "This vegetable can withstand frost and will yield fresh heads in early spring.",
    },
    {
      name: "Garlic",
      image: "",
      description: "Plant garlic cloves in the winter for a summer harvest.",
    },
    {
      name: "Onions",
      image: "",
      description:
        "Onions are best planted in the cooler months for a late spring harvest.",
    },
  ],
  February: [
    {
      name: "Peas",
      image: "",
      description:
        "Peas thrive in cooler weather and can be planted in late winter.",
    },
    {
      name: "Beets",
      image: "",
      description:
        "Beets grow well in cooler temperatures and can be harvested in the spring.",
    },
    {
      name: "Carrots",
      image: "",
      description: "Plant carrots in late winter for an early summer harvest.",
    },
    {
      name: "Potatoes",
      image: "",
      description:
        "Potatoes can be planted in late winter for a summer harvest.",
    },
    {
      name: "Radishes",
      image: "",
      description:
        "Radishes are quick-growing and can be planted in the cool, late winter.",
    },
  ],
  March: [
    {
      name: "Lettuce",
      image: "",
      description:
        "Lettuce grows well in the cooler temperatures of early spring.",
    },
    {
      name: "Swiss Chard",
      image: "",
      description:
        "Swiss Chard is versatile and can be planted in early spring.",
    },
    {
      name: "Turnips",
      image: "",
      description:
        "Turnips grow quickly and are perfect for early spring planting.",
    },
    {
      name: "Parsley",
      image: "",
      description:
        "This hardy herb can be planted as soon as the ground thaws.",
    },
    {
      name: "Leeks",
      image: "https://example.com/images/leeks.jpg",
      description: "Leeks are cold-hardy and can be started in early spring.",
    },
  ],
  April: [
    {
      name: "Tomatoes",
      image: "",
      description:
        "Tomatoes are a warm-weather crop best started indoors and transplanted.",
    },
    {
      name: "Peppers",
      image: "",
      description: "Peppers thrive in warm weather and can be started indoors.",
    },
    {
      name: "Cucumbers",
      image: "",
      description:
        "Cucumbers prefer warmer soil and should be planted after the last frost.",
    },
    {
      name: "Squash",
      image: "",
      description:
        "Squash grows quickly in warm weather and produces abundant fruit.",
    },
    {
      name: "Eggplant",
      image: "",
      description:
        "Eggplants are heat-loving and should be started indoors and transplanted.",
    },
  ],
  May: [
    {
      name: "Corn",
      image:
        "https://imgs.search.brave.com/hjmaKwJ0B8LMxsUgaboKnoecjbfUtnUbmDJIl0vwE10/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jb3JuXzkzNjc1/LTY3OTguanBnP3Np/emU9NjI2JmV4dD1q/cGc",
      description:
        "Corn is a warm-weather crop that requires plenty of space and sun.",
    },
    {
      name: "Beans",
      image:
        "https://imgs.search.brave.com/RACl23iYgKDbOMs9_Nzc_XdGOEkk3TsNX-UGXlxqmQE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NjAyNTIwMzAtOWZj/NjNjYjc4ZGFjP3E9/ODAmdz0xMDAwJmF1/dG89Zm9ybWF0JmZp/dD1jcm9wJml4bGli/PXJiLTQuMC4zJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4TVRGOGZHSmxZ/VzV6ZkdWdWZEQjhm/REI4Zkh3dw",
      description:
        "Beans are easy to grow and thrive in the warm weather of late spring.",
    },
    {
      name: "Melons",
      image:
        "https://imgs.search.brave.com/gKsphv0UGFZSo9YrXL6bX1fbHdRjivzXW2X4QvEI6bs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/NzQxMjQzL3Bob3Rv/L21lbG9ucy1pbi1z/b3V0aGZpZWxkLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz05/TXd4dEppUkozTjJw/YktkVktRZmprNFlJ/cXN3ZFd0OHBNRnYw/Mi15WTU4PQ",
      description: "Melons need warm temperatures and lots of space to grow.",
    },
    {
      name: "Okra",
      image:
        "https://imgs.search.brave.com/912RMjQgNq_VwEh2WTC1IxceGr2wWykCMUVysTLtMDY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTgz/NzQxODI0L3Bob3Rv/L2dyZWVuLW9rcmEu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWQ1ZURucW9UQVhZ/M1FpVGFvdHpweHkz/YnVTdWZzOEJ0bWRw/YlpqV21RVzQ9",
      description:
        "Okra is heat-tolerant and produces well in the warm months.",
    },
    {
      name: "Pumpkins",
      image:
        "https://imgs.search.brave.com/QftNefK_-CZL7o9QNIke-0DEOt-TtQEZmEJGWQD23HI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8x/MC8wNS8xOS80MC9w/dW1wa2lucy00NTI4/NjUzX18zNDAuanBn",
      description: "Plant pumpkins in late spring for a fall harvest.",
    },
  ],
  June: [
    {
      name: "Basil",
      image: "https://example.com/images/basil.jpg",
      description:
        "Basil thrives in warm weather and is a great addition to any herb garden.",
    },
    {
      name: "Zucchini",
      image: "https://example.com/images/zucchini.jpg",
      description: "Zucchini grows rapidly in the warm summer months.",
    },
    {
      name: "Sunflowers",
      image: "https://example.com/images/sunflowers.jpg",
      description:
        "Sunflowers can be planted in early summer and are great for attracting pollinators.",
    },
    {
      name: "Peppers",
      image: "https://example.com/images/peppers.jpg",
      description:
        "Peppers love the heat and can be transplanted outdoors in early summer.",
    },
    {
      name: "Tomatoes",
      image: "https://example.com/images/tomatoes.jpg",
      description: "Tomatoes continue to thrive when planted in early summer.",
    },
  ],
  July: [
    {
      name: "Sweet Potatoes",
      image: "https://example.com/images/sweet-potatoes.jpg",
      description:
        "Sweet potatoes love the heat and can be planted in mid-summer.",
    },
    {
      name: "Cucumbers",
      image: "https://example.com/images/cucumbers.jpg",
      description:
        "Cucumbers can still be planted in July for a late summer harvest.",
    },
    {
      name: "Squash",
      image: "https://example.com/images/squash.jpg",
      description: "Squash varieties can be planted for a late summer yield.",
    },
    {
      name: "Green Beans",
      image: "https://example.com/images/green-beans.jpg",
      description:
        "Green beans are quick-growing and can be planted in mid-summer.",
    },
    {
      name: "Herbs",
      image: "https://example.com/images/herbs.jpg",
      description:
        "Many herbs such as basil, thyme, and oregano can be planted in July.",
    },
  ],
  August: [
    {
      name: "Kale",
      image: "https://example.com/images/kale.jpg",
      description: "Kale can be planted in late summer for a fall harvest.",
    },
    {
      name: "Broccoli",
      image: "https://example.com/images/broccoli.jpg",
      description: "Broccoli can be started in late summer for a fall harvest.",
    },
    {
      name: "Cauliflower",
      image: "https://example.com/images/cauliflower.jpg",
      description:
        "Cauliflower can be planted in late summer for a fall yield.",
    },
    {
      name: "Brussels Sprouts",
      image: "https://example.com/images/brussels-sprouts.jpg",
      description:
        "Brussels sprouts grow well when planted in late summer for a winter harvest.",
    },
    {
      name: "Radishes",
      image: "https://example.com/images/radishes.jpg",
      description:
        "Radishes grow quickly and can be planted in late summer for a fall harvest.",
    },
  ],
  September: [
    {
      name: "Spinach",
      image: "https://example.com/images/spinach.jpg",
      description: "Spinach can be planted in early fall for a fall harvest.",
    },
    {
      name: "Lettuce",
      image: "https://example.com/images/lettuce.jpg",
      description:
        "Lettuce is a cool-weather crop that can be planted in early fall.",
    },
    {
      name: "Carrots",
      image: "https://example.com/images/carrots.jpg",
      description:
        "Carrots can be planted in early fall for a late fall harvest.",
    },
    {
      name: "Turnips",
      image: "https://example.com/images/turnips.jpg",
      description:
        "Turnips grow well in the cooler temperatures of early fall.",
    },
    {
      name: "Mustard Greens",
      image: "https://example.com/images/mustard-greens.jpg",
      description:
        "Mustard greens thrive in the cool temperatures of early fall.",
    },
  ],
  October: [
    {
      name: "Garlic",
      image: "https://example.com/images/garlic.jpg",
      description: "Garlic can be planted in the fall for a summer harvest.",
    },
    {
      name: "Onions",
      image: "https://example.com/images/onions.jpg",
      description:
        "Onions can be planted in the fall for an early summer harvest.",
    },
    {
      name: "Broad Beans",
      image: "https://example.com/images/broad-beans.jpg",
      description: "Broad beans can be planted in fall for a spring harvest.",
    },
    {
      name: "Peas",
      image: "https://example.com/images/peas.jpg",
      description: "Peas can be planted in fall for an early spring harvest.",
    },
    {
      name: "Arugula",
      image: "https://example.com/images/arugula.jpg",
      description: "Arugula grows well in the cooler temperatures of fall.",
    },
  ],
  November: [
    {
      name: "Carrots",
      image: "https://example.com/images/carrots.jpg",
      description: "Carrots can be planted in late fall for a winter harvest.",
    },
    {
      name: "Spinach",
      image: "https://example.com/images/spinach.jpg",
      description: "Spinach can be planted in late fall for a winter harvest.",
    },
    {
      name: "Lettuce",
      image: "https://example.com/images/lettuce.jpg",
      description: "Lettuce can be planted in late fall for a winter harvest.",
    },
    {
      name: "Kale",
      image: "https://example.com/images/kale.jpg",
      description: "Kale can be planted in late fall for a winter harvest.",
    },
    {
      name: "Chard",
      image: "https://example.com/images/chard.jpg",
      description: "Chard can be planted in late fall for a winter harvest.",
    },
  ],
  December: [
    {
      name: "Garlic",
      image: "https://example.com/images/garlic.jpg",
      description: "Garlic can be planted in winter for a summer harvest.",
    },
    {
      name: "Onions",
      image: "https://example.com/images/onions.jpg",
      description: "Onions can be planted in winter for a summer harvest.",
    },
    {
      name: "Leeks",
      image: "https://example.com/images/leeks.jpg",
      description: "Leeks can be planted in winter for a summer harvest.",
    },
    {
      name: "Shallots",
      image: "https://example.com/images/shallots.jpg",
      description: "Shallots can be planted in winter for a summer harvest.",
    },
    {
      name: "Rhubarb",
      image: "https://example.com/images/rhubarb.jpg",
      description: "Rhubarb can be planted in winter for a summer harvest.",
    },
  ],
};

const soilData = [
  {
    January: [
      {
        name: "Clay Soil",
        image: "https://example.com/images/clay-soil.jpg",
        description:
          "Clay soil retains moisture well, which is beneficial during the dry winter months.",
      },
      {
        name: "Silty Soil",
        image: "https://example.com/images/silty-soil.jpg",
        description:
          "Silty soil has a smooth texture and is fertile, making it ideal for winter crops.",
      },
      {
        name: "Loamy Soil",
        image: "https://example.com/images/loamy-soil.jpg",
        description:
          "Loamy soil is well-draining and nutrient-rich, suitable for winter planting.",
      },
      {
        name: "Peaty Soil",
        image: "https://example.com/images/peaty-soil.jpg",
        description:
          "Peaty soil is acidic and rich in organic matter, which helps to retain heat during cold months.",
      },
    ],
    February: [
      {
        name: "Sandy Loam",
        image: "https://example.com/images/sandy-loam.jpg",
        description:
          "Sandy loam is well-draining and warms up quickly, making it perfect for early planting.",
      },
      {
        name: "Chalky Soil",
        image: "https://example.com/images/chalky-soil.jpg",
        description:
          "Chalky soil is alkaline and suitable for plants that prefer higher pH levels.",
      },
      {
        name: "Clay Loam",
        image: "https://example.com/images/clay-loam.jpg",
        description:
          "Clay loam retains moisture and nutrients well, ideal for cool-season crops.",
      },
      {
        name: "Organic Soil",
        image: "https://example.com/images/organic-soil.jpg",
        description:
          "Rich in organic matter, this soil type enhances root growth and improves soil structure.",
      },
    ],
    March: [
      {
        name: "Loamy Sand",
        image: "https://example.com/images/loamy-sand.jpg",
        description:
          "Loamy sand is easy to work with and drains well, perfect for early spring planting.",
      },
      {
        name: "Sandy Clay Loam",
        image: "https://example.com/images/sandy-clay-loam.jpg",
        description:
          "This soil type provides good drainage and retains enough moisture for young plants.",
      },
      {
        name: "Silty Clay",
        image: "https://example.com/images/silty-clay.jpg",
        description:
          "Silty clay is fertile and retains moisture, ideal for starting spring vegetables.",
      },
      {
        name: "Humus-rich Soil",
        image: "https://example.com/images/humus-rich-soil.jpg",
        description:
          "High in organic matter, this soil improves aeration and water retention for spring crops.",
      },
    ],
    April: [
      {
        name: "Sandy Soil",
        image: "https://example.com/images/sandy-soil.jpg",
        description:
          "Sandy soil drains well and warms up quickly, making it suitable for warm-season crops.",
      },
      {
        name: "Loam Soil",
        image: "https://example.com/images/loam-soil.jpg",
        description:
          "Loam soil is well-balanced in nutrients and drainage, perfect for a variety of plants.",
      },
      {
        name: "Clay Soil",
        image: "https://example.com/images/clay-soil.jpg",
        description:
          "Retains moisture and nutrients, supporting the growth of many spring crops.",
      },
      {
        name: "Peat Soil",
        image: "https://example.com/images/peat-soil.jpg",
        description:
          "Peat soil is rich in organic material and retains moisture well, suitable for April planting.",
      },
    ],
    May: [
      {
        name: "Sandy Loam",
        image:
          "https://imgs.search.brave.com/jfj8eLoA794OV3NIAFEylRhJ1Co9R9QhQUsNf5lf19s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmFtaWx5aGFuZHlt/YW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzEwL0dl/dHR5SW1hZ2VzLTEy/NzIwNjUwMzguanBn/P2ZpdD03MDAsNDY3",
        description:
          "Ideal for vegetables and flowers, sandy loam warms up quickly and provides good drainage.",
      },
      {
        name: "Chalky Soil",
        image:
          "https://imgs.search.brave.com/cqAXxcQ5-WMvTaSzdxsfvesdNMWuiOQ-JacEbucQQUI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/ODkxMzU3MTYzMDMt/ZDA0YjlmM2FiNGI2/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRKOGZI/TnZhV3g4Wlc1OE1I/eDhNSHg4ZkRBPQ",
        description:
          "Chalky soil is free-draining and ideal for plants that prefer alkaline conditions.",
      },
      {
        name: "Loamy Soil",
        image:
          "https://imgs.search.brave.com/pO270-1vnSPDLf44_RwPCb-EsOTI062RPt0Fj2dIyaI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI2/NDM4Nzk5L3Bob3Rv/Ly5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9T2lNdHJfc2dP/ZUpvUFBsWFRLZFRY/aGRnTjJZZmN4SV9M/QTdTU0JOb05nMD0",
        description:
          "Nutrient-rich and well-draining, loamy soil supports a wide range of plants.",
      },
      {
        name: "Organic Soil",
        image:
          "https://imgs.search.brave.com/5JhKOjUJgc_8phIoJ_mWZaYHYQHGncU_2UrMvT_n048/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/b3Atdmlldy1uYXR1/cmFsLXNvaWxfMjMt/MjE0ODg1ODE4My5q/cGc",
        description:
          "Boosts soil fertility and structure, making it excellent for May planting.",
      },
    ],
    June: [
      {
        name: "Sandy Soil",
        image: "https://example.com/images/sandy-soil.jpg",
        description:
          "Perfect for plants that require good drainage and warm soil temperatures.",
      },
      {
        name: "Clay Loam",
        image: "https://example.com/images/clay-loam.jpg",
        description:
          "Combines good drainage with moisture retention, suitable for summer crops.",
      },
      {
        name: "Loamy Sand",
        image: "https://example.com/images/loamy-sand.jpg",
        description:
          "Light and easy to work with, loamy sand is ideal for quick-growing summer plants.",
      },
      {
        name: "Humus-rich Soil",
        image: "https://example.com/images/humus-rich-soil.jpg",
        description:
          "Enhances soil fertility and structure, supporting healthy growth in summer.",
      },
    ],
    July: [
      {
        name: "Sandy Loam",
        image: "https://example.com/images/sandy-loam.jpg",
        description:
          "Provides good drainage and warms up quickly, perfect for mid-summer planting.",
      },
      {
        name: "Clay Soil",
        image: "https://example.com/images/clay-soil.jpg",
        description:
          "Retains moisture well, helping to keep plants hydrated during the hot summer months.",
      },
      {
        name: "Loamy Soil",
        image: "https://example.com/images/loamy-soil.jpg",
        description:
          "Balances moisture retention and drainage, ideal for a variety of summer crops.",
      },
      {
        name: "Peaty Soil",
        image: "https://example.com/images/peaty-soil.jpg",
        description:
          "Rich in organic matter and retains moisture, beneficial for July planting.",
      },
    ],
    August: [
      {
        name: "Sandy Soil",
        image: "https://example.com/images/sandy-soil.jpg",
        description:
          "Drains quickly and warms up fast, making it suitable for late summer crops.",
      },
      {
        name: "Clay Loam",
        image: "https://example.com/images/clay-loam.jpg",
        description:
          "Balances good drainage with moisture retention, supporting August planting.",
      },
      {
        name: "Silty Soil",
        image: "https://example.com/images/silty-soil.jpg",
        description:
          "Smooth and fertile, silty soil is ideal for late summer planting.",
      },
      {
        name: "Organic Soil",
        image: "https://example.com/images/organic-soil.jpg",
        description:
          "Enhances soil fertility and structure, supporting healthy plant growth in August.",
      },
    ],
    September: [
      {
        name: "Loamy Sand",
        image: "https://example.com/images/loamy-sand.jpg",
        description:
          "Easy to work with and well-draining, perfect for early fall planting.",
      },
      {
        name: "Sandy Clay Loam",
        image: "https://example.com/images/sandy-clay-loam.jpg",
        description:
          "Provides good drainage and retains enough moisture for fall crops.",
      },
      {
        name: "Silty Clay",
        image: "https://example.com/images/silty-clay.jpg",
        description:
          "Fertile and moisture-retentive, ideal for starting fall vegetables.",
      },
      {
        name: "Humus-rich Soil",
        image: "https://example.com/images/humus-rich-soil.jpg",
        description:
          "Improves aeration and water retention, supporting healthy growth in fall.",
      },
    ],
    October: [
      {
        name: "Sandy Soil",
        image: "https://example.com/images/sandy-soil.jpg",
        description:
          "Provides good drainage and warms up quickly, suitable for October planting.",
      },
      {
        name: "Loam Soil",
        image: "https://example.com/images/loam-soil.jpg",
        description:
          "Nutrient-rich and well-draining, ideal for a variety of fall plants.",
      },
      {
        name: "Clay Soil",
        image: "https://example.com/images/clay-soil.jpg",
        description: "Retains moisture and nutrients",
      },
    ],
  },
];
const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [month, setMonth] = useState("");
  const [crops, setCrops] = useState([]);
  const [soils, setSoils] = useState([]);

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Dehradun&appid=4325432f39bc4daed069827986b9e2e0";

  const getData = async () => {
    try {
      const { data } = await axios.get(url);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    getData();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonth = new Date().getMonth();
    const currentMonthName = monthNames[currentMonth];
    setCrops(cropData[currentMonthName]);
    if (soilData[0][currentMonthName]) {
      setSoils(soilData[0][currentMonthName]);
    } else {
      setSoils([]);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="bg-blue-100 min-h-screen">
        <div className="content p-4">
          <div className="flex justify-start items-center gap-10">
            <div className="bg-white text-xl font-bold rounded-xl h-[400px] w-[550px] ml-10 bg-[url('https://imgs.search.brave.com/kKFc5U0upzZ9lmvMXGsIYAj0nvJ6qzPQOYlK63P_hBU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NTg0ODYwMTItODE3/MTc2Zjg0YzZkP3E9/ODAmdz0xMDAwJmF1/dG89Zm9ybWF0JmZp/dD1jcm9wJml4bGli/PXJiLTQuMC4zJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4Tkh4OGQyVmhk/R2hsY254bGJud3dm/SHd3Zkh4OE1BPT0')] bg-cover">
              <div className="h-full backdrop-blur-sm flex flex-col p-4 text-white ">
                <h1 className="text-4xl font-bold place-self-center mt-6">
                  Today's Weather
                </h1>
                {weatherData ? (
                  <>
                    <div className="flex justify-evenly gap-10">
                      <h1 className="mt-10 font-bold text-xl">
                        City Name: {weatherData?.name}
                      </h1>
                      <h1 className="mt-10 font-bold text-xl">
                        Temperature:{" "}
                        {(weatherData?.main.temp - 273.15).toFixed(2)}°C
                      </h1>
                    </div>
                    <div className="flex justify-evenly gap-10">
                      <h1 className="mt-10 font-bold text-xl">
                        Max-Temp:{" "}
                        {(weatherData?.main.temp_max - 273.15).toFixed(2)}°C
                      </h1>
                      <h1 className="mt-10 font-bold text-xl">
                        Min-Temp:{" "}
                        {(weatherData?.main.temp_min - 273.15).toFixed(2)}°C
                      </h1>
                    </div>
                    <div className="flex justify-evenly gap-10">
                      <h1 className="mt-10 font-bold text-xl">
                        Humidity: {weatherData?.main.humidity}%
                      </h1>
                      <h1 className="mt-10 font-bold text-xl">
                        Wind Speed: {weatherData?.wind.speed} mph
                      </h1>
                    </div>
                  </>
                ) : (
                  <div className="place-self-center mt-20">Loading...</div>
                )}
              </div>
            </div>
            <div className="bg-white rounded-xl w-[900px] h-[400px] bg-[url('https://imgs.search.brave.com/WHba4-sjCC9xjvYB93yMTf0yL19w0I7K_6Vf0mM1lZY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MDEyNTUxODQyMjQt/YjhlMDY5YmNhMjc4/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4T0h4OGQy/aGxZWFFsTWpCamNt/OXdmR1Z1ZkRCOGZE/QjhmSHd3')] bg-cover">
              <div className="backdrop-blur-sm h-full flex flex-col p-4 overflow-auto">
                <h1 className="text-3xl font-bold mt-5 place-self-center">
                  Best Crops to Grow This Season
                </h1>
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {crops?.map((crop, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow-md"
                      >
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="h-52 w-full object-cover rounded-xl"
                        />
                        <div className="p-2">
                          <h3 className="text-xl font-bold">{crop.name}</h3>
                          <p>{crop.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="mt-10 flex justify-center items-center h-[500px] w-[1200px] bg-white rounded-xl overflow-auto">
              <div className="h-full flex flex-col p-4 overflow-auto">
                <h1 className="text-3xl font-bold mt-5 place-self-center">
                  Best Soils for this Season
                </h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {soils?.map((soil, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-md"
                    >
                      <img
                        src={soil.image}
                        alt={soil.name}
                        className="h-52 w-full object-cover rounded-xl"
                      />
                      <div className="p-2">
                        <h3 className="text-xl font-bold">{soil.name}</h3>
                        <p>{soil.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherPage;

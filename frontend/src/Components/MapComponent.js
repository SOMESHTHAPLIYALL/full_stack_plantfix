import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

import { IoIosCall } from "react-icons/io";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapComponent({ location }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPharmacies();
  }, [location]);

  const fetchPharmacies = async () => {
    let latitude = location.latitude;
    let longitude = location.longitude;

    const options = {
      method: "GET",
      url: "https://trueway-places.p.rapidapi.com/FindPlacesNearby",
      params: {
        location: `${latitude},${longitude}`,
        type: "store",
        radius: "1000",
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": "a8e25abea7msh8465279dfb74285p1645c5jsn70922a7ec0cf",
        "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.results);
      setPharmacies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showModal ? null : (
        <MapContainer
          center={[location.latitude, location.longitude] || [51.505, -0.09]}
          zoom={13}
          style={{ height: "70%", width: "80%", borderRadius: "0.5rem" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <>
            <Marker
              position={[location.latitude, location.longitude]}
              icon={redIcon}
            >
              <Popup>Your current location.</Popup>
            </Marker>
            {pharmacies.map((pharmacy, index) => (
              <Marker
                key={index}
                position={[pharmacy.location.lat, pharmacy.location.lng]}
                icon={redIcon}
              >
                <Popup>{pharmacy.name}</Popup>
              </Marker>
            ))}
          </>
        </MapContainer>
      )}
      {showModal ? null : (
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          See Stores
        </button>
      )}

      {showModal && (
        <>
          <div className="bg-white p-8 rounded-lg overflow-auto min-h-screen">
            <div className="flex flex-col p-4 overflow-auto">
              <button
                onClick={() => setShowModal(false)}
                className=" place-self-center hover:bg-red-400 hover:scale-105  bg-red-500 cursor-pointer rounded-xl p-4 font-bold"
              >
                Close
              </button>
              <div className="flex justify-evenly items-start gap-10 flex-wrap font-bold text-lg mt-10">
                {pharmacies.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-xl p-4 rounded-xl flex flex-col h-[500px] overflow-auto w-[400px]"
                  >
                    <img
                      className="h-72 rounded-xl"
                      src="https://img.freepik.com/premium-vector/shopping-store-cartoon_18591-44033.jpg"
                    />
                    <h1 className="mt-5">Name: {item.name}</h1>
                    <h1>Address: {item.address}</h1>
                    <h1>Distance: {item.distance} metres</h1>
                    <h1>
                      Contact: {item.phone_number ? item.phone_number : "NA"}
                    </h1>
                    <button
                      className="p-4 rounded-xl bg-green-500 flex justify-center items-center gap-2 hover:bg-green-400 cursor-pointer mt-5"
                      onClick={() =>
                        (window.location.href = `tel:${item.phone_number}`)
                      }
                    >
                      <IoIosCall size={30} />
                      Call
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MapComponent;

"use client";
import { Dispatch, SetStateAction, useState } from "react";

const AddCityForm = ({ setShowForm, cities, setCities }: props) => {
  const [cityName, setCityName] = useState("");
  const [inputErr, setInputErr] = useState("");
  const saveCity = () => {
    // Find the index of an object with a specific property value
    let index = cities.findIndex(
      (item: { name: string }) =>
        item.name.toLocaleLowerCase() === cityName.toLocaleLowerCase()
    );
    let currentCities = [...cities];
    // Check if the object with the specified property value exists in the array
    if (index === -1) {
      // If not found, push a new object with the desired properties
      currentCities = [
        ...currentCities,
        {
          name: cityName,
        },
      ];
    } else {
      // If found, a message indicating that the object already exists
      setInputErr("Object already exists");
      return;
    }
    /* rendering list of cities with new addition and saving to localstorage */
    setCities(currentCities);
    localStorage.setItem("cities", JSON.stringify(currentCities));
    setShowForm(false);
  };
  return (
    <>
      <div
        className="w-full h-screen bg-black/50 z-40 absolute top-0"
        onClick={() => {
          setShowForm(false);
          setCityName("");
        }}
      ></div>
      <div className="bg-white flex flex-col rounded-lg p-10 w-80 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-black">Add city name:</span>
        <input
          type="text"
          id="cityName"
          className="text-black border border-gray-500 rounded-lg p-2"
          onChange={(e) => setCityName(e.target.value)}
        />
        {inputErr && <span className="text-red-500">City already exists</span>}
        <button
          type="button"
          className="text-black bg-green-500 mt-3 rounded-lg p-2"
          onClick={() => saveCity()}
        >
          save
        </button>
      </div>
    </>
  );
};

interface props {
  setShowForm: any;
  cities: any;
  setCities: any;
}

export default AddCityForm;

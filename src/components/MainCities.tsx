"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AddCityForm from "./AddCityForm";

const MainCities = () => {
  const [cities, setCities] = useState<{ name: string }[]>();
  const [showForm, setShowForm] = useState(false);

  const triggerForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    let value;
    // Get the value from local storage if it exists otherwise fill with 10 cities from array
    value = localStorage.getItem("cities") || "";
    if (!value) {
      value = [
        {
          name: "Chicago",
        },
        {
          name: "Los Angeles",
        },
        {
          name: "Houston",
        },
        {
          name: "New York",
        },
        {
          name: "San Francisco",
        },
        {
          name: "Philadelphia",
        },
        {
          name: "San Diego",
        },
        {
          name: "Dallas",
        },
        {
          name: "Seattle",
        },
        {
          name: "Boston",
        },
      ];
      localStorage.setItem("cities", JSON.stringify(value));
    } else {
      value = JSON.parse(value);
    }
    setCities(value);
  }, []);

  return (
    <section>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {cities && (
          <>
            {cities.map((city, index) => {
              return (
                <Link
                  href={`/${city.name.replace(" ", "-")}`}
                  key={`${city.name}-${index}`}
                >
                  <div
                    className="m-5 w-32 h-32 bg-white hover:bg-blue-500 hover:text-white text-black rounded-full flex flex-col justify-center text-center"
                    key={index}
                  >
                    {city.name}
                  </div>
                </Link>
              );
            })}
            <button
              className="text-lg bg-green-500 text-white rounded-full p-5"
              onClick={() => triggerForm()}
            >
              +
            </button>
          </>
        )}
      </div>
      {showForm && (
        <AddCityForm
          setShowForm={setShowForm}
          cities={cities}
          setCities={setCities}
        />
      )}
    </section>
  );
};
export default MainCities;

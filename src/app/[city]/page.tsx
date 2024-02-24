"use client";
import { useEffect, useState } from "react";

const CityDetails = ({ params }: { params: { city: string } }) => {
  const [cityData, setCityData] = useState("");

  useEffect(() => {
    const getCity = async (city: string) => {
      const GPT_API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY;
      const GPT_API_URL = "https://api.openai.com/v1/chat/completions";
      const ACCU_API_KEY = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;
      const ACCU_API_URL =
        "http://dataservice.accuweather.com/locations/v1/cities/search";
      /* making query to accuweather to get the details of the city */
      const query = `?apikey=${ACCU_API_KEY}&q=${city}`;
      const cityResponse = await fetch(ACCU_API_URL + query);
      const cityInfo = await cityResponse.json();
      /* prompt for chatgpt */
      const msg =
        "Analyze this json object without mentioning the json or where the information comes from, and return a summary introducing the city";

      try {
        const response = await fetch(GPT_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GPT_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `${msg}: ${JSON.stringify(cityInfo[0])}`,
              },
            ],
          }),
        });

        /* waiting for response from api and saving chatgpt summary into useState */
        const data = await response.json();
        setCityData(data.choices[0].message.content);
      } catch (error) {
        setCityData("City does not exist!");
        console.error("Error:", error);
      }
    };
    getCity(params.city);
  }, []);

  return (
    <main className="px-5">
      <h1 className="text-center text-6xl font-bold">
        {params.city.replace("-", " ")}
      </h1>
      {cityData && <div className="text-center text-xl mt-10">{cityData}</div>}
    </main>
  );
};

export default CityDetails;

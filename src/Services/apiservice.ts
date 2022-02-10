import fetch from "node-fetch";

export const getWeatherData = async (location: String = "Bhubaneswar") => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OWM_KEY}&units=metric`;
  console.log(url);
  const response = await fetch(url);
  const data: any = await response.json();
  if (data.cod == "404") {
    return { ...data, invalidCity: true };
  }
  return { ...data, invalidCity: false };
};

export const getAirData = async (lat: Number, lon: Number) => {
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OWM_KEY}`;
  const response = await fetch(url);
  console.log(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OWM_KEY}`
  );
  const data = await response.json();
  return data;
};

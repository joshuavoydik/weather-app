import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cities = ['Portland', 'San Diego', 'Charleston', 'Joshua Tree'];
    const requests = cities.map((city) =>
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=21d997e87f1d53224fc52c751a8d3e83`)
    );

    Promise.all(requests)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => setWeatherData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App grid grid-cols-2 grid-rows-2 h-screen gap-4 p-4">
      {weatherData.map((data, index) => (
        <div key={index} className="weather rounded-xl bg-blue-800 p-4 text-white shadow-lg min-w-full min-h-full bg-opacity-90 flex flex-col justify-center items-center hover:bg-blue-900 transition-all duration-200">
          <h2 className="text-6xl font-semibold">{data.name}</h2>
          {data.main && <p className="text-2xl">{Math.round((data.main.temp - 32) * 5/9)}°C</p>}
          {data.weather && data.weather[0] && <p className="capitalize text-2xl">{data.weather[0].description}</p>}
        </div>
      ))}
    </div>
  );   
}

export default App;

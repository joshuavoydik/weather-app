import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cities = ['London', 'New York', 'Sydney', 'Tokyo'];
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
        <div key={index} className="weather rounded bg-blue-500 p-4 text-white shadow-lg min-w-full min-h-full">
          <h2 className="text-3xl font-semibold">{data.name}</h2>
          {data.main && <p className="text-xl">{Math.round(data.main.temp)}°C</p>}
          {data.weather && data.weather[0] && <p className="capitalize">{data.weather[0].description}</p>}
        </div>
      ))}
    </div>
  );  
}

export default App;

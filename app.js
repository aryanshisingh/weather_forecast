import React, { useState } from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const apiKey = 'YOUR_API_KEY';  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key

    const fetchWeather = async () => {
        if (!city) return;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            const data = await response.json();
            if (data.cod === 200) {
                setWeather({
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                });
            } else {
                setWeather(null);
                alert("City not found!");
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className="app">
            <h1>Weather App</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchWeather}>Get Weather</button>
            </div>

            {weather && (
                <div className="weather-info">
                    <h2>{city}</h2>
                    <img src={weather.icon} alt="Weather Icon" />
                    <h3>{weather.temp}°C</h3>
                    <p>{weather.description}</p>
                </div>
            )}
        </div>
    );
}

export default App;


// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // We'll create this file next

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    // Prevent the form from submitting and refreshing the page
    e.preventDefault();
    setError(''); // Clear previous errors
    setWeather(null); // Clear previous weather data

    try {
      // Call your Node.js backend, NOT OpenWeatherMap directly
      const response = await axios.get('http://localhost:3001/weather', {
        params: {
          city: city,
        },
      });
      setWeather(response.data);
    } catch (err) {
      // Handle errors from the backend
      const errorMessage = err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'City not found or server error';
      setError(errorMessage);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>

      {/* Search Form */}
      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          className="city-input"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-button">
          Get Weather
        </button>
      </form>

      {/* Display Area */}
      {error && <div className="error-message">{error}</div>}

      {weather && (
        <div className="weather-card">
          <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
          <div className="weather-main">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
          </div>
          <div className="weather-description">
            {weather.weather[0].description}
          </div>
          <div className="weather-details">
            <div className="detail-item">
              <strong>Feels like:</strong> {Math.round(weather.main.feels_like)}°C
            </div>
            <div className="detail-item">
              <strong>Humidity:</strong> {weather.main.humidity}%
            </div>
            <div className="detail-item">
              <strong>Wind:</strong> {weather.wind.speed} m/s
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
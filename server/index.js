// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Loads .env variables

const app = express();
// The PORT is no longer needed here, Vercel handles it
// const PORT = process.env.PORT || 3001; 

app.use(cors());

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const API_KEY = process.env.API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.message });
    } else {
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  }
});

module.exports = app;
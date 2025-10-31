// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Loads .env variables

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

// Define the weather endpoint
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
    // Log the error for debugging
    console.error("Error fetching weather data:", error.message);
    // Send a more specific error status if available
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.message });
    } else {
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
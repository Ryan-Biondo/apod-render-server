require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

// Function to retrieve your NASA API key
const getAPIKey = () => {
  return process.env.API_KEY_APOD;
};

// Function to fetch data from NASA API
const fetchDataFromNASA = async (startDate, endDate) => {
  const API_KEY = getAPIKey();
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from NASA:', error);
    throw error;
  }
};

// Route to fetch APOD date range
app.get('/forward-to-nasa/apod', async (req, res) => {
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  try {
    const data = await fetchDataFromNASA(startDate, endDate);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from NASA:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to fetch APOD data for a specific date
app.get('/forward-to-nasa/apod/:date', async (req, res) => {
  const date = req.params.date;

  try {
    const data = await fetchDataFromNASA(date, date);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from NASA:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`https://apod-server.onrender.com`);
});

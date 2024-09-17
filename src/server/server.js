import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from "axios";


const app = express();

// Resolve the current file's name and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


app.use(cors());
app.use(express.json());

const port = process.env.PORT || 9000;
const user = process.env.USER;

//console.log(`WEATHER_API_KEY: ${process.env.WEATHER_API_KEY}`);


//console.log(user);

app.use(express.static('dist'));

app.get("/", (req, res) => {
    res.render("index.html")
});

// Route to get location data from GeoNames API based on user input
app.post("/getLocation", async (req,res) => {
    //console.log(req.body);
    const {location} = req.body
    const url = `http://api.geonames.org/searchJSON?name=${location}&maxRows=1&username=${user}`;

    // Fetch location data from GeoNames API
    const response = await fetch(url);
    const data = await response.json();



    // Check if data was found and return it, or send an error
    if (data.geonames && data.geonames.length > 0) {
        const { name, lat, lng } = data.geonames[0];
        //console.log(`Name: ${name}, Latitude: ${lat}, Longitude: ${lng}`);
        res.json({ name, lat, lng });
    } else {
        res.status(404).json({ message: "Location not found" });
    }
    
}) 



// Route to get weather data from the Weatherbit API based on coordinates
app.post("/getWeather", async (req,res) => {
    //console.log(req.body);
    try {
        const { lng, lat, Rdays } = req.body;
        const weatherApiKey = process.env.WEATHER_API_KEY;
        if (!weatherApiKey) {
            throw new Error("Missing WEATHER_API_KEY in environment");
        }

        const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${Rdays}&units=M&key=${weatherApiKey}`;

        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data;

        //console.log(weatherData);

        const forecastDay = Rdays - 1; 
        const weather = weatherData.data[forecastDay];

        // Respond with only the data you need
        const forecast = {
            city: weatherData.city_name,
            high_temp: weather.high_temp,
            low_temp: weather.low_temp,
            temp: weather.temp,
            forecast: weather.weather.description
        };

        //console.log("Forecast Data:", forecast);


        res.json(forecast);


    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: "Error fetching weather data" });
    }
}) 


// Route to get a photo of the city from Pixabay API
app.post("/getPhoto", async (req, res) => {

    try {
        const { city_name } = req.body;
        //console.log(city_name);
        
        const pixabayApiKey = process.env.PIXABAY_API_KEY;
        const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(city_name)}&image_type=photo`;

        const photoResponse = await axios.get(pixabayUrl);
        const photoData = photoResponse.data;

        if (photoData.hits && photoData.hits.length > 0) {
            const photoUrl = photoData.hits[0].webformatURL;
            res.json({ photoUrl });
        } else {
            res.status(404).json({ message: "No photos found" });
        }
    } catch (error) {
        console.error('Error fetching photo:', error);
        res.status(500).json({ message: "Error fetching photo" });
    }

});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

import axios from "axios";

const baseURL = 'http://localhost:9000';

const getLocation = async () => {
    try {
        const form = document.querySelector("form");
        const location = form.querySelector('input[name="location"]').value;
        const response = await axios.post(`${baseURL}/getLocation`, { location }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
};

const getWeather = async (lng, lat, Rdays) => {
    try {
        const response = await axios.post(`${baseURL}/getWeather`, {
            lng, lat, Rdays
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

const getPhoto = async (city_name) => {
    try {
        const response = await axios.post(`${baseURL}/getPhoto`, { city_name }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.photoUrl;
    } catch (error) {
        console.error('Error fetching photo:', error);
        throw error;
    }
};

export { getLocation, getWeather, getPhoto };

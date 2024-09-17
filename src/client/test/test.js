import axios from 'axios';
import { getWeather } from '../js/api.js';

jest.mock('axios');

describe('getWeather', () => {
  test('should fetch weather data successfully', async () => {
    const mockWeatherData = {
      data: {
        city: 'Palestine',
        high_temp: 30,
        low_temp: 20,
        temp: 25,
        forecast: 'Sunny',
      },
    };

    axios.post.mockResolvedValue(mockWeatherData);

    const lng = 35.2137;
    const lat = 31.7683;
    const Rdays = 5;

    const result = await getWeather(lng, lat, Rdays);
    expect(result).toEqual(mockWeatherData.data);
  });

  test('should handle error on fetching weather data', async () => {
    axios.post.mockRejectedValue(new Error('API call failed'));

    const lng = 35.2137;
    const lat = 31.7683;
    const Rdays = 5;

    await expect(getWeather(lng, lat, Rdays)).rejects.toThrow('API call failed');
  });
});
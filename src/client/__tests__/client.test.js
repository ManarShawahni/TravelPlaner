import axios from 'axios';
import { getWeather } from '../js/api.js';

jest.mock('axios');  // Mocking axios for all tests

describe('getWeather', () => {
  const lng = 35.2137;
  const lat = 31.7683;
  const Rdays = 5;

  let consoleErrorSpy;

  beforeEach(() => {
    // Spy on console.error to suppress error output during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the console.error spy after each test
    consoleErrorSpy.mockRestore();
  });

  test('should fetch weather data successfully', async () => {
    const mockWeatherData = {
      city: 'Palestine',
      high_temp: 30,
      low_temp: 20,
      temp: 25,
      forecast: 'Sunny',
    };

    axios.post.mockResolvedValue({ data: mockWeatherData });

    const result = await getWeather(lng, lat, Rdays);
    
    expect(result).toEqual(mockWeatherData);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      { lng, lat, Rdays }, 
      { headers: { "Content-Type": "application/json" } }
    );
  });

  test('should handle error on fetching weather data', async () => {
    const mockErrorMessage = 'API call failed';
    axios.post.mockRejectedValue(new Error(mockErrorMessage));


    await expect(getWeather(lng, lat, Rdays)).rejects.toThrow(mockErrorMessage);
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error fetching weather:'),
        expect.any(Error)
    );
});

  test('should throw an error for invalid parameters', async () => {
    await expect(getWeather(undefined, lat, Rdays)).rejects.toThrow();
    await expect(getWeather(lng, undefined, Rdays)).rejects.toThrow();
    await expect(getWeather(lng, lat, undefined)).rejects.toThrow();
  });
});

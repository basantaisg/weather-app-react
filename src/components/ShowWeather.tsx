import { useState } from 'react';
import WeatherCard from './WeatherCard';
import axios from 'axios';

const ShowWeather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    const apiKey = 'API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`show-weather ${weather?.weather[0]?.main.toLowerCase()}`}>
      <h1 className='main-heading'>Weather APP - Basanta Parajuli</h1>
      <WeatherCard fetchWeather={fetchWeather} />
      {loading && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {weather && (
        <div className='weather-info'>
          <h2>{weather.name}</h2>
          <p>
            <span>Temperature:</span> {weather.main.temp}°C
          </p>
          <p>
            <span>Condition:</span> {weather.weather[0].description}
          </p>
          <p>
            <span>Humidity:</span> {weather.main.humidity}%
          </p>
          <p>
            <span>Wind Speed:</span> {weather.wind.speed} m/s
          </p>
          <p>
            <span>Sunrise:</span>{' '}
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            <span>Sunset:</span>{' '}
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowWeather;

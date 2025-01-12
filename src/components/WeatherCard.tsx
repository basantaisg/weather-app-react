import { useState } from 'react';

const WeatherCard = ({
  fetchWeather,
}: {
  fetchWeather: (city: string) => void;
}) => {
  const [city, setCity] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      setRecentSearches((prev) => [...new Set([city, ...prev])].slice(0, 5)); // Keep recent 5 searches
      setCity('');
    }
  };

  return (
    <div className='weather-card'>
      <div className='input-container'>
        <input
          type='text'
          placeholder='Enter City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='city-input'
        />
        <button className='search-button' onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className='recent-searches'>
        <h3>Recent Searches:</h3>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => fetchWeather(search)}>
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherCard;

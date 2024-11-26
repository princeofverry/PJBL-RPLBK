'use client'
import React, { useState, useEffect } from 'react';
import {
    CloudSun,
    CloudRain,
    Sun,
    CloudSnow,
    CloudFog,
    Thermometer,
    Wind,
    Droplet,
    MapPin,
    SearchIcon
} from 'lucide-react';

const WeatherIcons = {
    '01d': Sun,
    '01n': Sun,
    '02d': CloudSun,
    '02n': CloudSun,
    '03d': CloudSun,
    '03n': CloudSun,
    '04d': CloudFog,
    '04n': CloudFog,
    '09d': CloudRain,
    '09n': CloudRain,
    '10d': CloudRain,
    '10n': CloudRain,
    '11d': CloudRain,
    '11n': CloudRain,
    '13d': CloudSnow,
    '13n': CloudSnow,
    '50d': CloudFog,
    '50n': CloudFog
};

const INDONESIAN_CITIES = [
    'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'
];

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Semarang');
    const [searchCity, setSearchCity] = useState('');

    const API_KEY = '3d244404d3c0e65fac7a63942b0d98cb';

    const fetchWeather = async (selectedCity) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error('Gagal mengambil data cuaca');
            }

            const data = await response.json();
            setWeather(data);
            setCity(selectedCity);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);

    const handleCitySearch = (e) => {
        e.preventDefault();
        if (searchCity) {
            fetchWeather(searchCity);
            setSearchCity('');
        }
    };

    const handleQuickSelect = (selectedCity) => {
        fetchWeather(selectedCity);
    };

    if (loading) {
        return (
            <div className="bg-gray-800 text-white p-6 rounded-lg animate-pulse mx-4 md:mx-auto max-w-2xl">
                <div className="flex items-center justify-center space-x-3">
                    <div className="bg-gray-700 w-16 h-16 rounded-full"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500 text-white p-6 rounded-lg mx-4 md:mx-auto max-w-2xl">
                <p>Error: {error}</p>
            </div>
        );
    }

    const WeatherIcon = WeatherIcons[weather.weather[0].icon] || Sun;

    return (
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-lg shadow-xl mx-4 md:mx-auto max-w-2xl">
            {/* City Search */}
            <form onSubmit={handleCitySearch} className="mb-6 flex space-x-3">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        placeholder="Cari kota..."
                        className="w-full p-3 pl-10 rounded-lg bg-red-500 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={18} />
                </div>
                <button
                    type="submit"
                    className="bg-white text-red-600 px-5 py-3 rounded-lg hover:bg-red-100 transition-colors"
                >
                    Cari
                </button>
            </form>

            {/* Quick Select Cities */}
            <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-hide pb-2 whitespace-nowrap">
                {INDONESIAN_CITIES.map((cityName) => (
                    <button
                        key={cityName}
                        onClick={() => handleQuickSelect(cityName)}
                        className={`px-4 py-2 rounded-full text-sm ${city === cityName
                            ? 'bg-white text-red-600'
                            : 'bg-red-500 text-white hover:bg-red-400'
                            } transition-colors`}
                    >
                        {cityName}
                    </button>
                ))}
            </div>

            {/* Main Weather Display */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <WeatherIcon size={64} className="text-white" />
                    <div>
                        <h2 className="text-3xl font-bold flex items-center">
                            <MapPin size={22} className="mr-2" />
                            {weather.name}
                        </h2>
                        <p className="text-md opacity-80 capitalize">{weather.weather[0].description}</p>
                    </div>
                </div>
                <div className="mt-4 md:mt-0">
                    <h3 className="text-4xl font-extrabold">{Math.round(weather.main.temp)}°C</h3>
                </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 border-t border-red-500 pt-6">
                <div className="flex items-center space-x-2">
                    <Thermometer size={26} />
                    <div>
                        <p className="text-sm">Feels Like</p>
                        <p className="font-semibold text-lg">{Math.round(weather.main.feels_like)}°C</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Wind size={26} />
                    <div>
                        <p className="text-sm">Wind</p>
                        <p className="font-semibold text-lg">{weather.wind.speed} m/s</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Droplet size={26} />
                    <div>
                        <p className="text-sm">Humidity</p>
                        <p className="font-semibold text-lg">{weather.main.humidity}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;

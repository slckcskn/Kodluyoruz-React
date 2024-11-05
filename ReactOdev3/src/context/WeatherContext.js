// contexts/WeatherContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'

// Context'leri oluşturuyoruz
const WeatherContext = createContext();

// Custom hook oluşturuyoruz - kullanımı kolaylaştırmak için
export const useWeather = () => {
    const context = useContext(WeatherContext);

    return context;
};

// Weather Provider komponenti
export const WeatherProvider = ({ children }) => {
    // Şehir state'i
    const [selectedCity, setSelectedCity] = useState('İstanbul');
    // Hava durumu verisi state'i
    const [weatherData, setWeatherData] = useState(null);
    // 7 günlük tahmin
    const [forecastData, setForecastData] = useState(null);  
    // Loading state'i
    const [loading, setLoading] = useState(false);
    // Error state'i
    const [error, setError] = useState(null);

    // OpenWeather API'den veri çekme fonksiyonu
    const API_KEY = 'a639c5cdd1739cf7840d2d01abcc2e54'; // OpenWeather API key
    const BASE_URL = 'https://api.openweathermap.org/data/2.5';

    // Hava durumu verilerini çeken fonksiyon
    const fetchWeatherData = async (city) => {
        setLoading(true);
        setError(null);

        try {
            // Anlık hava durumu ve 7 günlük tahmin için paralel istek
            const [currentWeather, forecast] = await Promise.all([
                // Anlık hava durumu isteği
                axios.get(`${BASE_URL}/weather`, {
                    params: {
                        q: `${city},TR`,
                        units: 'metric',
                        appid: API_KEY
                    }
                }),
                // 7 günlük tahmin isteği
                axios.get(`${BASE_URL}/forecast`, {
                    params: {
                        q: `${city},TR`,
                        units: 'metric',
                        appid: API_KEY
                    }
                })
            ]);

            // Anlık hava durumu verisini state'e kaydet
            setWeatherData(currentWeather.data);

            // 7 günlük tahmin verilerini işle
            const processedForecast = processForecastData(forecast.data.list);
            setForecastData(processedForecast);

        } catch (err) {
            setError(err.response?.data?.message || 'Hava durumu verileri alınamadı');
        } finally {
            setLoading(false);
        }
    };

    // Tahmin verilerini işleyen yardımcı fonksiyon
    const processForecastData = (forecastList) => {
        const dailyForecasts = {};
        const today = new Date().setHours(0, 0, 0, 0);
        let daysProcessed = 0;

        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
            // Sadece bugün ve sonraki günleri işle
            if (date >= today && daysProcessed < 7) {
                const dayKey = new Date(date).toISOString().split('T')[0];

                if (!dailyForecasts[dayKey]) {
                    dailyForecasts[dayKey] = {
                        date: date,
                        temp_min: item.main.temp_min,
                        temp_max: item.main.temp_max,
                        weather: item.weather[0],
                        humidity: item.main.humidity,
                        wind_speed: item.wind.speed,
                        dt: item.dt
                    };
                    daysProcessed++;
                } else {
                    // Günün en düşük ve en yüksek sıcaklıklarını güncelle
                    dailyForecasts[dayKey].temp_min = Math.min(
                        dailyForecasts[dayKey].temp_min,
                        item.main.temp_min
                    );
                    dailyForecasts[dayKey].temp_max = Math.max(
                        dailyForecasts[dayKey].temp_max,
                        item.main.temp_max
                    );
                }
            }
        });

        // Object'i array'e çevir ve tarihe göre sırala
        return Object.values(dailyForecasts).sort((a, b) => a.date - b.date);
    };

    // Şehir değiştiğinde hava durumu verilerini güncelle
    useEffect(() => {
        if (selectedCity) {
            fetchWeatherData(selectedCity);
        }
    }, [selectedCity]);

    // Provider değerleri
    const value = {
        selectedCity,
        setSelectedCity,
        weatherData,
        forecastData,
        loading,
        error
    };

    return (
        <WeatherContext.Provider value={value}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherProvider
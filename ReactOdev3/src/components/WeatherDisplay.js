// components/SevenDayForecast.js
import React from 'react';
import { useWeather } from '../context/WeatherContext';

const SevenDayForecast = () => {
    const { forecastData, loading, error } = useWeather();

    // Gün adını Türkçe olarak döndüren yardımcı fonksiyon
    const getDayName = (date) => {
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        return days[new Date(date).getDay()];
    };

    // Tarihi formatlayan yardımcı fonksiyon
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long'
        });
    };

    // Bugünün tarihini kontrol eden yardımcı fonksiyon
    const isToday = (date) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const checkDate = new Date(date).setHours(0, 0, 0, 0);
        return today === checkDate;
    };

    if (loading) {
        return (
            <div className="container mt-3">
                <div className="alert alert-info">Hava durumu bilgileri yükleniyor...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-3">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    if (!forecastData) {
        return null;
    }

    return (
        <div className="container mt-4 mb-4">
            <div className="row row-cols-1 row-cols-sm-3 row-cols-md-6 row-cols-lg-7 g-3">
                {forecastData.map((day) => (
                    <div key={day.dt}  className="col">
                        <div style={{backgroundColor: isToday(day.date) ? 'lightgray' : 'light' }} className={`card h-100 ${isToday(day.date) ? 'border-primary border-2' : ''}`}>
                            <div className="card-body text-center">
                                {/* Gün adı ve tarih */}
                                <h5 className="card-title mb-1">
                                    {getDayName(day.date)}
                                </h5>
                                <small className="text-muted">
                                    {formatDate(day.date)}
                                </small>

                                {/* Hava durumu ikonu */}
                                <div className="my-2">
                                    <img 
                                        src={`http://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                                        alt={day.weather.description}
                                        title={day.weather.description}
                                        className="weather-icon"
                                    />
                                </div>

                                {/* Sıcaklık değerleri */}
                                <div className="mt-2">
                                    <span className="fs-5">
                                        <span className="text-danger fw-bold">{Math.round(day.temp_max)}°</span>
                                        <span className="mx-1">/</span>
                                        <span className="text-primary">{Math.round(day.temp_min)}°</span>
                                    </span>
                                </div>

                                {/* Ek bilgiler */}
                                <div className="mt-2 small text-muted">
                                    <div>Nem: {day.humidity}%</div>
                                    <div>Rüzgar: {day.wind_speed} m/s</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SevenDayForecast;
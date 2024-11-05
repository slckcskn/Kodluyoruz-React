import turkishCities from './turkishCities'
import { useWeather } from '../context/WeatherContext';

// Bootstrap CSS'i head'e eklemek için
const bootstrapCSS = document.createElement('link');
bootstrapCSS.rel = 'stylesheet';
bootstrapCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css';
document.head.appendChild(bootstrapCSS);


const CitySelector = () => {
  // Context'ten sadece ihtiyacımız olan değerleri alıyoruz
  const { selectedCity, setSelectedCity } = useWeather();

  const handleCityChange = (event) => {
      setSelectedCity(event.target.value);
  };

  return (
      <div className="container mt-5">
          <div className="row justify-content-center">
              <div className="col-md-6">
                  <div className="card">
                      <div className="card-header bg-primary text-white">
                          <h5 className="card-title mb-0">Şehir Seçin</h5>
                      </div>
                      <div className="card-body">
                          <select 
                              className="form-select mb-3"
                              value={selectedCity}
                              onChange={handleCityChange}
                              aria-label="Şehir seçimi"
                          >
                              <option value="">Şehir seçiniz...</option>
                              {turkishCities.map((city) => (
                                  <option key={city} value={city}>
                                      {city}
                                  </option>
                              ))}
                          </select>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default CitySelector;
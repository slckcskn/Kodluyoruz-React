import './App.css';
import WeatherProvider from './context/WeatherContext';
import WeatherDisplay from './components/WeatherDisplay';
import CitySelector from './components/CitySelector';

function App() {
  return (
    <WeatherProvider>
         <CitySelector />
         <WeatherDisplay />
    </WeatherProvider>
  );
}

export default App;

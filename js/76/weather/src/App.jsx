import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Weather from './Weather.jsx'
import './App.css'

export default function App() {

  const zip = '08701'

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
 useEffect(() =>   {(async () =>{
        try {
              let location2 = {};
  navigator.geolocation.getCurrentPosition(async (position) =>{
    location2.latitude = position.coords.latitude;
    location2.longitude = position.coords.longitude;
    setLocation(location2)
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location2.latitude}&longitude=${location2.longitude}&daily=sunrise,sunset,weather_code,temperature_2m_min,temperature_2m_max,snowfall_sum,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,rain,showers,snowfall&current=temperature_2m,precipitation,rain,showers,snowfall&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`);
    if (r.ok) {
                const result2 = await r.json();
                console.log(result2);
                setWeather(result2);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
  }, () =>{
    console.log('cannot get location')
  })
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${zip}&count=1&language=en&format=json`;
            const geoResponse = await fetch(geoUrl);
            if (!geoResponse.ok) {
                throw new Error(`HTTP error! status: ${geoResponse.status}`);
            }
            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`City not found: 08701`);
            }
            setLocation(geoData.results[0]);
            
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=sunrise,sunset,weather_code,temperature_2m_min,temperature_2m_max,snowfall_sum,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,rain,showers,snowfall&current=temperature_2m,precipitation,rain,showers,snowfall&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setWeather(result)
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }
    })()}, [])
  return (
    <>
    <div id='title'>weather for 08701</div>
      <Weather weather = {weather}></Weather>
    </>
  )
}



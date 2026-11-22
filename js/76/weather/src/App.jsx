import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import Weather from "./Weather.jsx";
import "./App.css";

export default function App() {
	const defaultZip = "08701";
	

	const [weather, setWeather] = useState(null);
	const [location, setLocation] = useState({name: null});
	useEffect(() => {
		(async () => {
            const location = {};
			try {
				
				const position = await new Promise((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(
						(pos) => {
							resolve(pos);
						},
						(rej) => {
							reject(rej);
						},
					);
				});
				location.latitude = position.coords.latitude;
				location.longitude = position.coords.longitude;
                location.name = 'current location';
				setLocation(location);
			} catch (err) {
				console.log(err.message);
				console.log("cannot get your location using default");
				const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${defaultZip}&count=1&language=en&format=json`;
				const geoResponse = await fetch(geoUrl);
				if (!geoResponse.ok) {
					throw new Error(`HTTP error! status: ${geoResponse.status}`);
				}
				const geoData = await geoResponse.json();
				if (!geoData.results || geoData.results.length === 0) {
					throw new Error(`City not found: 08701`);
				}
                location.latitude = geoData.results[0].latitude;
                location.longitude = geoData.results[0].longitude;
                geoData.results[0].name = defaultZip;
				setLocation(geoData.results[0]);
			}
			const r = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=sunrise,sunset,weather_code,temperature_2m_min,temperature_2m_max,snowfall_sum,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,rain,showers,snowfall&current=temperature_2m,precipitation,rain,showers,snowfall&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`,
			);
			if (r.ok) {
				const result2 = await r.json();
				console.log(result2);
				setWeather(result2);
			} else {
				throw new Error(`HTTP error! status: ${r.status}`);
			}
		})();
	}, []);

	return (
		<>
			<input value={defaultZip} readOnly></input>
			<div id="title">weather for {location.name}</div>
			{weather && <Weather weather={weather}></Weather>}
		</>
	);
}

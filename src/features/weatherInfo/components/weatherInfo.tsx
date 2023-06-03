import { useEffect, useState } from 'react';
import getFormattedWeatherData from 'shared/constants/api';
import { Search } from 'shared/components/icons/icons';
import cloudyImg from 'assets/images/cloudy.jpg';

import '../styles/weatherInfo.scss';

const WeatherInfo = () => {
	const [apiData, setApiData] = useState<any>({});
	const [getState, setGetState] = useState({ q: 'india' });
	const [state, setState] = useState({ q: 'india' });

	const inputHandler = (event: any) => {
		setGetState({ q: event.target.value });
	};

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			// 👇 Get input value
			setState(getState);
		}
	};

	const kelvinToFarenheit = (k: any) => {
		return (k - 273.15).toFixed(2);
	};

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const moment = require('moment');

	const fetchWeather = async () => {
		const data = await getFormattedWeatherData({ ...state }).then((data) => {
			setApiData(data);
		});
		return data;
	};

	useEffect(() => {
		fetchWeather();
	}, [state]);

	const now = moment();

	const formattedDate = now.format('YYYY-MM-DD');
	const formattedTime = now.format('HH:mm');

	const { country, details, dt, feels_like, humidity, icon, lat, lon, name, speed, sunrise, sunset, temp, weather } =
		apiData;
	return (
		<div className='hero--conatiner'>
			<div className='weather-info--container'>
				<div className='left-weather-info--wrapper'>
					<p className='flex justify-content--end mr--30 mt--20'>
						{formattedDate} | <span className='ml--10'>{formattedTime}</span>
					</p>
					<div className='background-effects mt--20'>
						<img src={cloudyImg} alt='current-weather' className='weather-images' />
					</div>
				</div>
				<div className='right-weather-info--wrapper'>
					<div className='right-inner--wrapper'>
						<div className='d--flex position--relative'>
							<input
								type='text'
								id='location-name'
								placeholder='search your city here...'
								className='text--white font-size--lg text--capitalize width--full m--10 p--10 form-control'
								onChange={inputHandler}
								onKeyDown={handleKeyDown}
							/>
							<Search className='position--absolute search--icon' />
						</div>
						<div className='info--wrapper'>
							<h2 className='text--center mt--30 mb--30 text--uppercase'>{name}</h2>
							<div className='flex justify-content--center'>
								<img
									src={`http://openweathermap.org/img/w/${icon}.png`}
									alt='weather status icon'
									className='weather-icon'
								/>
							</div>
							<h4 className='text--center mt--10 mb--10'> {details}</h4>
							<div className='width--full flex justify-content--evenly'>
								<p>Temp: {kelvinToFarenheit(temp)}</p>
								<p>Humidity: {humidity}%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherInfo;

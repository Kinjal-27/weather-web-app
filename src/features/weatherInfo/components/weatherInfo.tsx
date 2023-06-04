import { useEffect, useState } from 'react';
import { getWeatherData } from 'shared/constants/api';
import { Search } from 'shared/components/icons/icons';
import Humidity from 'assets/images/humidity.png';
import Sunrise from 'assets/images/728123.png';
import Sunset from 'assets/images/sunset.png';
import Wind from 'assets/images/wind.png';

import '../styles/weatherInfo.scss';
import Spinner from 'shared/components/spinner/spinner';

const WeatherInfo = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState<any>({});
	const [getState, setGetState] = useState({ q: 'india' });
	const [state, setState] = useState({ q: 'india' });

	const inputHandler = (event: any) => {
		setGetState({ q: event.target.value });
	};

	const handleKeyDown = (event: any) => {
		if (event.key === 'Enter') {
			// Get input value
			setState(getState);
		}
	};

	const kelvinToFarenheit = (k: any) => {
		return (k - 273.15).toFixed(2);
	};

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const moment = require('moment');

	const fetchWeather = async () => {
		setIsLoading(true);
		const data = await getWeatherData('weather', { ...state }).then((data) => {
			setApiData(data);
			setIsLoading(false);
		});
		return data;
	};

	useEffect(() => {
		fetchWeather();
	}, [state]);

	const now = moment();

	const formattedDate = now.format('YYYY-MM-DD');
	const formattedTime = now.format('HH:mm');

	return (
		<div className='hero--conatiner'>
			{isLoading && <Spinner />}
			{!isLoading && apiData && (
				<div className='weather-info--container'>
					<div className='left-weather-info--wrapper'>
						<div className='flex justify-content--between align-items--center mt--30'>
							<div className='ml--30 font-size--30'>{apiData.name}</div>
							<div className='mr--30'>
								{formattedDate} | <span className='ml--10'>{formattedTime}</span>
							</div>
						</div>
						<div className='background-effects mt--20'>
							<div className='mt--60 ml--20'>
								{apiData.weather && <h1>{apiData.weather[0].main}</h1>}
								<p className='ml--10'>{apiData.name}</p>
							</div>
						</div>
					</div>
					<div className='right-weather-info--wrapper'>
						<div className='right-inner--wrapper'>
							<div className='d--flex position--relative'>
								<input
									type='text'
									id='location-name'
									placeholder='search your city here...'
									className='text--white font-size--lg text--capitalize width--full p--10 form-control'
									onChange={inputHandler}
									onKeyDown={handleKeyDown}
								/>
								<Search className='position--absolute search--icon' />
							</div>
							{apiData.weather && (
								<div className='info--wrapper'>
									<h5 className='text--center mt--30 mb--20 text--uppercase'>
										{moment
											.utc(moment.duration(apiData.timezone, 'seconds').asMilliseconds())
											.format('hh:mm')}
									</h5>
									<div className='flex justify-content--center align-items--center'>
										<img
											src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
											alt='weather status icon'
											className='weather-icon mr--20'
										/>
										<div className='position--relative font-size--40'>
											{kelvinToFarenheit(apiData.main.temp)}&deg; C
										</div>
									</div>
									<hr />
									<div className='flex justify-content--evenly mt--30'>
										<div className='flex flex--column align-items--center'>
											<p>{moment.unix(apiData.sys.sunrise).format('HH:mm')}</p>
											<img src={Sunrise} alt='sunrise' width={50} height={50} />
										</div>
										<div className='flex flex--column align-items--center'>
											<p>{moment.unix(apiData.sys.sunset).format('HH:mm')}</p>
											<img src={Sunset} alt='sunrise' width={50} height={50} />
										</div>
									</div>
									<div className='flex justify-content--evenly mt--20'>
										<div className='flex flex--column align-items--center'>
											<p className='mb--10'>High</p>
											<p>{kelvinToFarenheit(apiData.main.temp_max)}&deg; C</p>
										</div>
										<div className='flex flex--column align-items--center'>
											<p className='mb--10'>Low</p>
											<p>{kelvinToFarenheit(apiData.main.temp_min)}&deg; C</p>
										</div>
									</div>
									<hr className='mb--20' />
									<div className='flex flex--column pr--30 pl--30'>
										<p className='font-size--lg text--right mb--10'>Humidity</p>
										<div className='flex justify-content--between align-items--center'>
											<div>
												<img src={Humidity} alt='humidity' width={45} />
											</div>
											<div className='font-size--28'>{apiData.main.humidity}%</div>
										</div>
									</div>
									<hr className='mb--20' />
									<div className='flex flex--column pr--30 pl--30'>
										<p className='font-size--lg text--right mb--10'>Wind speed</p>
										<div className='flex justify-content--between align-items--center'>
											<div>
												<img src={Wind} alt='humidity' width={45} />
											</div>
											<div className='flex flex--column align-items--end'>
												<div className='font-size--28'>{apiData.wind.speed}km/h</div>
												<div>Direction : {apiData.wind.deg}&deg;</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
			{!isLoading && !apiData && <div>No data Found</div>}
		</div>
	);
};

export default WeatherInfo;

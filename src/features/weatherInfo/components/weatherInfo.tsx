import { useEffect, useState } from 'react';
import { getWeatherData } from 'shared/constants/api';
import { Search } from 'shared/components/icons/icons';
import Spinner from 'shared/components/spinner/spinner';
import Humidity from 'assets/images/humidity.png';
import Sunrise from 'assets/images/728123.png';
import Sunset from 'assets/images/sunset.png';
import Wind from 'assets/images/wind.png';
import TempatratureImg from 'assets/images/tempImg.png';
import Rain from 'assets/images/rainy.gif';
import ThunderStrom from 'assets/images/thunderStrom.gif';
import Haze from 'assets/images/haze.gif';
import Snow from 'assets/images/snow.gif';
import Dust from 'assets/images/dust.jpeg';
import Sand from 'assets/images/sand.gif';
import Fog from 'assets/images/fog.gif';
import Tornado from 'assets/images/tornado.gif';

import '../styles/weatherInfo.scss';

const WeatherInfo = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState<any>({});
	const [getState, setGetState] = useState({ q: 'Ahmedabad' });
	const [state, setState] = useState({ q: 'Ahmedabad' });

	const inputHandler = (event: any) => {
		setGetState({ q: event.target.value.trim() });
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
		const data = await getWeatherData('weather', { ...state })
			.then((data) => {
				setApiData(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
		return data;
	};

	useEffect(() => {
		fetchWeather();
	}, [state]);

	interface IWeatherIcon {
		[key: string]: string;
	}

	const weatherConditionImgMapper: IWeatherIcon = {
		ThunderStorm: ThunderStrom,
		Rain: Rain,
		Snow: Snow,
		Mist: Rain,
		Smoke: Rain,
		Haze: Haze,
		Dust: Dust,
		Fog: Fog,
		Sand: Sand,
		Squall: Rain,
		Tornado: Tornado,
		Clear: Rain,
		Clouds: Rain
	};

	return (
		<div className='hero--conatiner'>
			<div className='weather-info--container'>
				<div className='left-weather-info--wrapper'>
					<div className='ml--30 font-size--22 mt--30'>Weather</div>
					{isLoading && <Spinner />}
					{!isLoading && apiData?.weather && (
						<div
							style={{
								backgroundImage: 'url(' + weatherConditionImgMapper[apiData.weather[0].main] + ')'
							}}
							className='background-effects mt--20'
						>
							<div className='overlay'>
								<h1 className='text--center weather-condition'>
									{apiData.weather[0].main} <span className='font-size--lg font--regular'>in</span>{' '}
									{apiData.name}
								</h1>
								<div className='font-size--40 mt--40'>
									{kelvinToFarenheit(apiData.main.temp)}&deg; C
								</div>
							</div>
						</div>
					)}
				</div>
				<div className='right-weather-info--wrapper'>
					<div className='right-inner--wrapper'>
						<div className='d--flex position--relative mt--15'>
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
						{isLoading && <Spinner />}

						{!isLoading && apiData?.weather && (
							<div className='info--wrapper mt--20'>
								<p className='font-size--22 text--center mt--30 mb--20 text--uppercase'>
									{moment.unix(apiData.dt).format('YYYY-MM-DD | HH:mm')}
								</p>
								<div className='flex justify-content--center align-items--center mb--20'>
									<img
										src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
										alt='weather status icon'
										className='weather-icon mr--20'
									/>
									<div className='position--relative font-size--40'>
										{kelvinToFarenheit(apiData.main.temp)}&deg; C
									</div>
								</div>
								<div className='info-container flex justify-content--evenly mt--30'>
									<div className='flex flex--column align-items--center'>
										<p className='font-size--22'>
											{moment.unix(apiData.sys.sunrise).format('HH:mm')}
										</p>
										<img src={Sunrise} alt='sunrise' width={70} height={70} />
									</div>
									<div className='flex flex--column align-items--center'>
										<p className='font-size--22'>
											{moment.unix(apiData.sys.sunset).format('HH:mm')}
										</p>
										<img src={Sunset} alt='sunrise' width={70} height={70} />
									</div>
								</div>
								<div className='info-container flex justify-content--evenly mt--20'>
									<div>
										<img src={TempatratureImg} alt='temperature' width={100} />
									</div>
									<div className='flex flex--column align-items--center'>
										<p className='mb--30 font-size--22'>High</p>
										<p className='font-size--22'>
											{kelvinToFarenheit(apiData.main.temp_max)}&deg; C
										</p>
									</div>
									<div className='flex flex--column align-items--center'>
										<p className='mb--30 font-size--22'>Low</p>
										<p className='font-size--22'>
											{kelvinToFarenheit(apiData.main.temp_min)}&deg; C
										</p>
									</div>
								</div>
								<div className='info-container flex flex--column'>
									<p className='font-size--22 text--right mb--30'>Humidity</p>
									<div className='flex justify-content--between align-items--center'>
										<div>
											<img src={Humidity} alt='humidity' width={60} />
										</div>
										<div className='font-size--30'>{apiData.main.humidity}%</div>
									</div>
								</div>
								<div className='info-container flex flex--column'>
									<p className='font-size--22 text--right mb--30'>Wind speed</p>
									<div className='flex justify-content--between align-items--center'>
										<div>
											<img src={Wind} alt='humidity' width={70} />
										</div>
										<div className='flex flex--column align-items--end'>
											<div className='font-size--30 mb--15'>{apiData.wind.speed}km/h</div>
											<div className='font-size--22'>Direction : {apiData.wind.deg}&deg;</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{!isLoading && !apiData && <div>No data Found</div>}
		</div>
	);
};

export default WeatherInfo;

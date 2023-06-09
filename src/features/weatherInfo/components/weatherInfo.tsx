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
import Sunny from 'assets/images/sunset-sunrise.gif';

import '../styles/weatherInfo.scss';
import LineChart from './lineChart';
import { notify } from 'shared/components/notification/notification';
import { kelvinToFarenheit } from 'shared/util/utility';
import { toast } from 'react-toastify';

const WeatherInfo = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [weatherData, setWeatherData] = useState<any>({});
	const [getState, setGetState] = useState({ q: 'Ahmedabad' });
	const [state, setState] = useState({ q: 'Ahmedabad' });
	const [chartParams, setChartParams] = useState({
		q: 'Ahmedabad',
		cnt: 7
	});
	const [chartParamsState, setChartParamsState] = useState({
		q: 'Ahmedabad',
		cnt: 7
	});
	const [weeklyArr, setWeeeklyArr] = useState([]);
	const [date, setDate] = useState<string[]>([]);
	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGetState({ q: event.target.value.trim() });
		setChartParams({ ...chartParams, q: event.target.value.trim() });
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			// Get input value
			setState(getState);
			setChartParamsState(chartParams);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const moment = require('moment');

	const fetchWeather = async () => {
		setIsLoading(true);
		const data = await getWeatherData('weather', { ...state })
			.then((data) => {
				setWeatherData(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
		return data;
	};

	const fetchWeeklyData = async () => {
		setIsLoading(true);
		const data = await getWeatherData('forecast', { ...chartParamsState })
			.then((data) => {
				const weeklyArr: any = [];
				const dateTemp: string[] = [];
				data.list.map((items: Record<string, any>) => {
					weeklyArr.push(items);
					dateTemp.push(items.dt_txt.split(' '));
					setDate(dateTemp);
					setWeeeklyArr(weeklyArr);
				});
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				toast.error('No city name found', {
					position: toast.POSITION.TOP_CENTER
				});
				console.error(error);
				setWeeeklyArr([]);
			});
		return data;
	};
	useEffect(() => {
		fetchWeather();
		fetchWeeklyData();
	}, [state]);

	interface IWeatherIcon {
		[key: string]: string;
	}

	const weatherConditionImgMapper: IWeatherIcon = {
		ThunderStorm: ThunderStrom,
		Rain: Rain,
		Snow: Snow,
		Mist: Sunny,
		Smoke: Fog,
		Haze: Haze,
		Dust: Dust,
		Fog: Fog,
		Sand: Sand,
		Squall: Rain,
		Tornado: Tornado,
		Clear: Sunny,
		Clouds: Sunny
	};

	const { dt, main, sys, wind, weather, name } = weatherData;

	return (
		<div className='hero--container'>
			<div className='weather-info--container'>
				<div className='left-weather-info--wrapper'>
					<div className='ml--30 font-size--22 mt--30'>The.Weather</div>
					{isLoading && <Spinner />}
					{!isLoading && weatherData?.weather && (
						<div
							style={{
								backgroundImage: 'url(' + weatherConditionImgMapper[weather[0].main] + ')'
							}}
							className='background-effects mt--20'
						>
							<div className='overlay'>
								<div className='chart-content-wrapper'>
									<div className='flex justify-content--center'>
										<h1 className='weather-condition'>{kelvinToFarenheit(main.temp)}&deg; C</h1>
										<h3 className='weather-condition ml--30'>{name}</h3>
									</div>
									{/* <div className='font-size--40 mt--40'>{kelvinToFarenheit(main.temp)}&deg; C</div> */}
									<LineChart weeklyArr={weeklyArr} dateTemp={date} />
								</div>
							</div>
						</div>
					)}
					{weatherData.length === undefined && weeklyArr.length === 0 && (
						<div className='error-message m--auto text--center font-size--40'>City not found</div>
					)}
				</div>
				<div className='right-weather-info--wrapper'>
					<div className='right-inner--wrapper'>
						<div className='d--flex position--relative mt--15'>
							<input
								type='text'
								id='location-name'
								placeholder='Search your city here...'
								className='text--white font-size--lg width--full p--10 form-control'
								onChange={inputHandler}
								onKeyDown={handleKeyDown}
							/>
							<Search className='position--absolute search--icon' />
						</div>
						{isLoading && <Spinner />}

						{!isLoading && weatherData?.weather && (
							<div className='info--wrapper mt--20'>
								<p className='font-size--22 text--center mt--30 mb--20 text--uppercase'>
									{moment.unix(dt).format('YYYY-MM-DD | HH:mm')}
								</p>
								<div className='flex justify-content--center align-items--center mb--20'>
									<img
										src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
										alt='weather status icon'
										className='weather-icon mr--20'
									/>
									<div className='position--relative font-size--40'>{weather[0].description}</div>
								</div>
								<div className='info-container flex justify-content--evenly mt--30'>
									<div className='flex flex--column align-items--center'>
										<p className='font-size--22'>{moment.unix(sys.sunrise).format('HH:mm')}</p>
										<img src={Sunrise} alt='sunrise' width={50} height={50} />
									</div>
									<div className='flex flex--column align-items--center'>
										<p className='font-size--22'>{moment.unix(sys.sunset).format('HH:mm')}</p>
										<img src={Sunset} alt='sunrise' width={50} height={50} />
									</div>
								</div>
								<div className='info-container flex justify-content--evenly mt--20'>
									<div>
										<img src={TempatratureImg} alt='temperature' width={100} />
									</div>
									<div className='flex flex--column align-items--center'>
										<p className='mb--30 font-size--22 font--semi-bold'>High</p>
										<p className='font-size--22'>{kelvinToFarenheit(main.temp_max)}&deg; C</p>
									</div>
									<div className='flex flex--column align-items--center'>
										<p className='mb--30 font-size--22 font--semi-bold'>Low</p>
										<p className='font-size--22'>{kelvinToFarenheit(main.temp_min)}&deg; C</p>
									</div>
								</div>
								<div className='info-container flex'>
									<div className='humidity-wrapper width--40 flex justify-content--between mr--20 align-items--end'>
										<div className='flex flex--column'>
											<p className='font-size--22 text--right mb--30 font--semi-bold'>Humidity</p>
											<div className='font-size--30'>{main.humidity}%</div>
										</div>
										<div>
											<img src={Humidity} alt='humidity' width={60} />
										</div>
									</div>
									<div className='width--50 flex justify-content--between align-items--end'>
										<div className='flex flex--column'>
											<p className='font-size--22 text--right mb--30 font--semi-bold'>
												Wind speed
											</p>
											<p className='font-size--22 mb--15'>{wind.speed}km/h</p>
										</div>
										<div>
											<img src={Wind} alt='humidity' width={70} />
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherInfo;

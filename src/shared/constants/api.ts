import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import { DateTime } from 'luxon';

export const API_CONFIG = {
	baseUrl: `${process.env.REACT_APP_URL}`,
	path: {
		login: 'login',
		forget: 'password/forgot',
		reset: 'password/reset'
	}
};

export const getUrl = (url: string, params: any = {}): string => {
	Object.keys(params).forEach((key) => (params[key] == null || params[key] === '') && delete params[key]);
	let urlString = `${url}`;
	if (params && !isEmpty(params)) {
		urlString += `?${queryString.stringify(params)}`;
	}
	return urlString;
};

export const getWeatherData = (infoType: any, searchParams: any) => {
	const url = new URL(process.env.REACT_APP_URL + '/' + infoType);
	url.search = new URLSearchParams({ ...searchParams, appid: process.env.REACT_APP_API_KEY }) as any;
	return fetch(url).then((res) => res.json());
};
const formatCurrentWeather = (data: any) => {
	const {
		coord: { lat, lon },
		main: { temp, feels_like, temp_min, temp_max, humidity },
		name,
		dt,
		sys: { country, sunrise, sunset },
		weather,
		wind: { speed }
	} = data;
	const { main: details, icon } = weather[0];
	return {
		lat,
		lon,
		temp,
		feels_like,
		temp_max,
		temp_min,
		humidity,
		name,
		dt,
		country,
		sunrise,
		sunset,
		weather,
		speed,
		details,
		icon
	};
};

// const formatForcastWeather = (data: any) => {
// 	let { daily, hourly } = data;
// 	console.log('formatForcastWeather ~ daily:', data);
// 	const timezone = data;
// 	daily = daily.slice(1, 6).forEach((d: any) => {
// 		return {
// 			title: formatToLocalTime(d.dt, timezone, 'ccc'),
// 			temp: d.temp.day,
// 			icon: d.weather[0].icon
// 		};
// 	});
// 	hourly = hourly.slice(1, 6).map((d: any) => {
// 		return {
// 			title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
// 			temp: d.temp.day,
// 			icon: d.weather[0].icon
// 		};
// 	});

// 	return { timezone, daily, hourly };
// };

export const formatToLocalTime = (secs: any, zone: any, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") =>
	DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getFormattedWeatherData = async (searchParams: any) => {
	const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

	// const { lat, lon } = formattedCurrentWeather;

	// const formattedForcastWeather = await getWeatherData('onecall', {
	// 	lat,
	// 	lon,
	// 	exclude: 'current,minutely,alerts',
	// 	units: searchParams.units
	// }).then(formatForcastWeather);
	return { ...formattedCurrentWeather };
};

export default getFormattedWeatherData;

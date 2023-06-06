import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

export const API_CONFIG = {
	baseUrl: `${process.env.REACT_APP_URL}`,
	path: {
		login: 'login',
		forget: 'password/forgot',
		reset: 'password/reset'
	}
};

const API_KEY: any = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_URL;

export const getUrl = (url: string, params: Record<string, any> = {}): string => {
	Object.keys(params).forEach((key) => (params[key] == null || params[key] === '') && delete params[key]);
	let urlString = `${url}`;
	if (params && !isEmpty(params)) {
		urlString += `?${queryString.stringify(params)}`;
	}
	return urlString;
};

export const getWeatherData = (infoType: string, searchParams: Record<string, any>) => {
	const url = new URL(API_URL + '/' + infoType);
	url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }) as any;
	return fetch(url).then((res) => res.json());
};

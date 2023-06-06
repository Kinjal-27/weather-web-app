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

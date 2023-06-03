import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'hoc/layout/layout';
import WeatherInfo from 'features/weatherInfo/components/weatherInfo';

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<WeatherInfo />} />
			</Routes>
		</Layout>
	);
};

export default App;

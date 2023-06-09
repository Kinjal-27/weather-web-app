import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { kelvinToFarenheit } from 'shared/util/utility';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IChartProps {
	weeklyArr: string[];
	dateTemp: string[];
}
const LineChart = ({ weeklyArr, dateTemp }: IChartProps) => {
	const temperature: any = [];
	const handleTemperature = () => {
		weeklyArr.map((items: any) => {
			temperature.push(kelvinToFarenheit(items.main.temp));
		});
		return temperature;
	};

	const handleHumidity = () => {
		const humidity: any = [];

		weeklyArr.map((items: any) => {
			humidity.push(items.main.humidity);
		});
		return humidity;
	};

	const data = {
		labels: dateTemp,
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		borderColor: '#fff',
		datasets: [
			{
				label: 'Temperature (°C)',
				data: handleTemperature(),
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'white',
				color: 'white'
			},
			{
				label: 'Humidity',
				data: handleHumidity(),
				borderColor: 'rgba(255, 34, 100, 1)',
				backgroundColor: 'white',
				color: 'white'
			}
		]
	};
	const config = {
		data: data,
		scales: {
			x: {
				grid: {
					drawBorder: false,
					color: 'rgba(99, 99, 132, 0.2)',
					labelMaxWidth: 6
				},
				ticks: {
					color: 'white',
					font: {
						weight: 'bold',
						size: 15
					}
				},
				color: 'white'
			},
			y: {
				grid: {
					drawBorder: false,
					color: 'rgba(99, 99, 132, 0.2)'
				},
				ticks: {
					color: 'white',
					font: {
						weight: 'bold',
						size: 15
					}
				},
				color: 'white'
			}
		},
		plugins: {
			legend: {
				labels: {
					color: 'white',
					size: 22,
					font: {
						weight: 'bold',
						size: 18
					}
				}
			}
		}
	};

	return (
		<div className='line-chart-wrapper'>
			<Line data={data} options={config as Record<string, any>} />
		</div>
	);
};

export default LineChart;

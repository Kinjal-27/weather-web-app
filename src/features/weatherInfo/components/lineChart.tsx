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
import { Chart } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IChartProps {
	tempArr: string[];
	dateTemp: string[];
}
const LineChart = ({ tempArr, dateTemp }: IChartProps) => {
	const data = {
		labels: dateTemp,
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		fill: true,
		borderColor: '#fff',
		datasets: [
			{
				label: 'Temperature (°C)',
				data: tempArr,
				fill: true,
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'white',
				color: 'white'
			}
		]
	};
	const config = {
		type: 'bar',
		data: data,
		filler: {
			backgroundColor: 'rgba(255, 0, 0, 01)' // Replace with your desired color
		},
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
				label: {
					color: 'white'
				}
			}
		}
	};

	return <Chart data={data} type='line' options={config as Record<string, any>} />;
};

export default LineChart;

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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IChartProps {
	tempArr: string[];
	dateTemp: string[];
}
const LineChart = ({ tempArr, dateTemp }: IChartProps) => {
	const data = {
		labels: dateTemp,
		backgroundColor: 'rgba(255, 99, 132, 0.2)',
		borderColor: '#fff',
		datasets: [
			{
				label: 'Temperature (°C)',
				data: tempArr,
				borderColor: 'rgba(75, 192, 192, 1)',
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
				label: {
					color: 'white'
				}
			}
		}
	};

	return <Line data={data} options={config as Record<string, any>} />;
};

export default LineChart;

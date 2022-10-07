import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { plotChart, getDiastolic, getSystolic, weeklyChartLabels, monthlyChartLabels, plotMonthlyChart, dataAveraging, plotYearlyChart, yearlyChartLabels,reformatDataTime, sortData, plotWeeklyChart, chartPlotter, prepareVitalsData } from './helper';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

let sampleData = [
    {date: new Date(2022,8,10), reading: '80', email: ''},
    {date: new Date(2022,8,2), reading: '120', email: ''},
    {date: new Date(2022,7,30), reading: '85', email: ''},
    {date: new Date(2022,7,23), reading: '100', email: ''},
    {date: new Date(2022,7,16), reading: '125', email: ''},
    {date: new Date(2022,7,11), reading: '90', email: ''},
    {date: new Date(2022,7,4), reading: '30', email: ''},
    {date: new Date(2022,6,10), reading: '70', email: ''},
    {date: new Date(2022,6,2), reading: '110', email: ''},
    {date: new Date(2022,6,30), reading: '77', email: ''},
    {date: new Date(2022,6,23), reading: '100', email: ''},
    {date: new Date(2022,6,16), reading: '120', email: ''},
]

//set labels, data, title
const MyChart = props => {
    useEffect(() => {

    }, [props.datasets])
    
    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: props.title,
        },
        },
    };

    // const dataSets = [{
    //     label: 'systolic',
    //     data: [100,67,200,78,89,89,250],
    //     borderColor: 'rgb(253, 106, 91)',
    //     backgroundColor: 'rgba(255, 99, 132, 0)',
    //     }
    // ]   
    //const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataSets = [{
        label: 'systolic',
        data: [{x: 'Jan', y: 100},{x: 'Feb', y: 67}, {x: 'Mar', y: 200},{x: 'Apr', y: 78},
        {x: 'May', y: 89}, {x: 'Jun', y: 86},{x: 'Jul', y: 250}],
        borderColor: 'rgb(253, 106, 91)',
        backgroundColor: 'rgba(255, 99, 132, 0)',
        }
    ] 

    const data = {
       // labels,
        datasets: props.datasets? props.datasets: dataSets
    }

    return   <Line options={options} data={data} redraw = {true} {...props} />
}
export default MyChart;
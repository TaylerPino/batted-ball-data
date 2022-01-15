import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { IBattedBallData } from '../models/IBattedBallData';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = {
    battedBallData: Array<IBattedBallData>;
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  }
};

const dataSetLabels = [
    { value: 'LAUNCH_ANGLE', label: 'Launch Angle'},
    { value: 'EXIT_SPEED', label: 'Exit Speed' },
    { value: 'EXIT_DIRECTION', label: 'Exit Direction'},
    { value: 'HIT_DISTANCE', label: 'Hit Distance' },
    { value: 'HANG_TIME', label: 'Hang Time'},
    { value: 'HIT_SPIN_RATE', label: 'Hit Spin Rate'}
];

const ScatterChart = ({battedBallData} : Props) => {
    const [x, setX] = useState<string>('LAUNCH_ANGLE');
    const [y, setY] = useState<string>('EXIT_SPEED');

    let datasets = new Map([
        ['Out', {
            label: 'Out',
            data: new Array(),
            backgroundColor: 'rgb(255, 41, 68)'
        }],
        ['Single', {
            label: 'Single',
            data: new Array(),
            backgroundColor: 'rgb(255, 159, 64)'
        }],
        ['HomeRun', {
            label: 'Home Run',
            data: new Array(),
            backgroundColor: 'rgb(75, 192, 192)'
        }],
        ['Double', {
            label: 'Double',
            data: new Array(),
            backgroundColor: 'rgb(153, 102, 255)'
        }],
        ['Error', {
            label: 'Error',
            data: new Array(),
            backgroundColor: 'rgb(128, 128, 128)'
        }],
        ['Undefined', {
            label: 'Undefined',
            data: new Array(),
            backgroundColor: 'rgb(229, 255, 255)'
        }],
        ['Sacrifice', {
            label: 'Sacrifice',
            data: new Array(),
            backgroundColor: 'rgb(255, 255, 102)'
        }],
        ['FieldersChoice', {
            label: 'Fielders Choice',
            data: new Array(),
            backgroundColor: 'rgb(102, 0, 51)'
        }],
        ['Triple', {
            label: 'Triple',
            data: new Array(),
            backgroundColor: 'rgb(15, 183, 104)'
        }]
    ]);

    //Map data point with play outcome
    battedBallData.forEach(element => {
        datasets.get(element?.PLAY_OUTCOME)?.data.push(({ x : element[x as keyof IBattedBallData], y : element[y as keyof IBattedBallData]}))
    });

    const data = {
        datasets: Array.from(datasets.values())
      };

    //Get available axis datasets
    const dropdownDatasets = () =>  dataSetLabels.map((element)=> <MenuItem key={element.value} value={element.value}>{element.label}</MenuItem>);

    const handleChangeX = (event: any) => {
        setX(event.target.value as string);
    };

    const handleChangeY = (event: any) => {
        setY(event.target.value as string);
    };

    return (
        <div>
            <div className='filter-container'>
                <div className='filter'>
                    <FormControl>
                        <InputLabel>X</InputLabel>
                            <Select
                            id="x-select"
                            value={x}
                            onChange={handleChangeX}
                            >
                                {dropdownDatasets()}
                            </Select>
                    </FormControl>
                </div>
                <div className='filter'>
                    <FormControl>
                        <InputLabel>Y</InputLabel>
                            <Select
                            id="y-select"
                            value={y}
                            onChange={handleChangeY}
                            >
                                {dropdownDatasets()}
                            </Select>
                    </FormControl>
                </div>
            </div>
            
            <div className='chart-container'>
                <div className='chart-wrapper'>
                    <Scatter options={options} data={data} />
                </div>
            </div>
        </div>
    );
}

export default ScatterChart;

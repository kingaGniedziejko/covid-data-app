import React, { FunctionComponent } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type ChartProps = {data: CovidDataType}

const Chart:FunctionComponent<ChartProps> = ({data}) => {
    return (
        <LineChart width={800} height={500} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" interval="preserveStart" padding={{ left: 30, right: 30 }} />
            <YAxis interval="preserveEnd"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="confirmed" stroke="#BD93D8" />
            <Line type="monotone" dataKey="deaths" stroke="#FE5F55" />
            <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
        </LineChart>
    );
}

export default Chart;

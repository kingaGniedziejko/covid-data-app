import React, { FunctionComponent } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type ChartProps = {
    width: number;
    data: CovidDataType;
}

class Chart extends React.Component<ChartProps> {
    // state = {
    //     windowWidth: window.innerWidth
    // }

    // handleResize = () => {
    //     this.setState({ windowWidth: window.innerWidth });
    // };
      
    // componentDidMount() {
    //     // addEventListener("resize", this.handleResize);
    // }
       
    // componentWillUnmount() {
    //     window.addEventListener("resize", this.handleResize);
    // } 
      

    render() {
        const {data, width} = this.props;
        // const {windowWidth} = this.state;

        return (
            <LineChart width={width} height={width/1.5} data={data}>
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
  
}

export default Chart;

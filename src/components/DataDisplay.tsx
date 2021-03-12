import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';

import { covidapi } from '../apis/covidapi';
import countries from '../data/countries';
import Chart from './Chart';

type DataParams = {
    date: string;
    countryCode: string;
} 

const DataDisplay = (props: { match: { params: DataParams; }; }) => {
    const {date, countryCode} = props.match.params;
    const [covidData, setCovidData] = useState<CovidDataType | null>(null);

    const [year, month] = date.split('-').map(Number);
    const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 0);

    useEffect(()=>{
        const getData = async () => {
            const {data} = await covidapi.get(`/country/${countryCode}/timeseries/${moment(startDate).format("YYYY-MM-DD")}/${moment(endDate.setDate(endDate.getDate() + 1)).format("YYYY-MM-DD")}`)
            setCovidData(data.result);
        }
        getData();
    },[])

    
    //test
    console.log(covidData);

    return (
        <Container>
            <h1>Data Display</h1>
            <p><b>Country: </b>{(countries.find((country) => country[1] === countryCode) || ["", ""])[0]}</p>
            <p> 
                <b>Time span: </b>
                <Moment format="DD MMMM YYYY" className={"d-inline"}>{startDate}</Moment> 
                &nbsp;-&nbsp;
                <Moment format="DD MMMM YYYY" className={"d-inline"}>{endDate}</Moment> 
            </p>
            <Row>
                <Col>
                    { covidData ? <Chart data={covidData} /> : null }
                </Col>
            </Row>
        </Container>
    )
}

export default DataDisplay;
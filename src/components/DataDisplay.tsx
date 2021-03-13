import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';

import { covidapi } from '../apis/covidapi';
import countries from '../data/countries';
import ChartDisplay from './ChartDisplay';

type DataParams = {
    date: string;
    countryCode: string;
} 

const DataDisplay = (props: { match: { params: DataParams; }; }) => {
    const {date, countryCode} = props.match.params;
    const [year, month] = date.split('-').map(Number);

    const [startDate, setStartDate] = useState(new Date(year, month-1, 1));
    const [covidData, setCovidData] = useState<CovidDataType | null>(null);
    const [firstLoad, setFirstLoad] = useState(true);

    const endDate = new Date(startDate.getFullYear(), startDate.getMonth()+1, 0)

    const addMonth = (value: number) => {
        setStartDate(new Date(startDate.setMonth(startDate.getMonth() + value)));
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                const {data} = await covidapi.get(`/country/${countryCode}/timeseries/${moment(startDate).format("YYYY-MM-DD")}/${moment(endDate.setDate(endDate.getDate() + 1)).format("YYYY-MM-DD")}`)
                setCovidData(data.result);
                if (data.result) setFirstLoad(false); 
            } catch (error) {
                const { request, ...errorObject } = error.response;
                console.log(errorObject);
                setCovidData(null);
            }
        }
        getData();
    },[startDate])

    return (
        <>
            <Row>
                <Col className="text-center mb-4">
                    <p className="mb-1"> 
                        <b>Time span: </b>
                        <Moment format="D MMMM YYYY" className={"d-inline"}>{startDate}</Moment> 
                        &nbsp;-&nbsp;
                        <Moment format="D MMMM YYYY" className={"d-inline"}>{endDate}</Moment> 
                    </p>
                    <p><b>Country: </b>{(countries.find((country) => country[1] === countryCode) || ["", ""])[0]}</p>
                </Col>
            </Row>
            <ChartDisplay covidData={covidData} onPrevClick={() => addMonth(-1)} onNextClick={() => addMonth(1)} firstLoad={firstLoad}/>
        </>
    )
}

export default DataDisplay;
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
    const [year, month] = date.split('-').map(Number);

    const [startDate, setStartDate] = useState(new Date(year, month-1, 1));
    const [covidData, setCovidData] = useState<CovidDataType | null>(null);
    const [firstLoad, setFirstLoad] = useState(true);


    // var endDate = new Date(year, month, 0);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth()+1, 0)

    useEffect(()=>{
        const getData = async () => {

            try {
                const {data} = await covidapi.get(`/country/${countryCode}/timeseries/${moment(startDate).format("YYYY-MM-DD")}/${moment(endDate.setDate(endDate.getDate() + 1)).format("YYYY-MM-DD")}`)
                setCovidData(data.result);
                if (data.result) setFirstLoad(false); 

            } catch (error) {
                const { response } = error;
                const { request, ...errorObject } = response; // take everything but 'request'
                console.log(errorObject);

                setCovidData(null);
            }
        }
        getData();
    },[startDate])

    
    const addMonth = (value: number) => {
        setStartDate(new Date(startDate.setMonth(startDate.getMonth() + value)));
    }

    
    //test
    console.log(covidData);

    return (
        <>
            <Row>
                <Col className="text-center mb-4">
                    <p> 
                        <b>Time span: </b>
                        <Moment format="D MMMM YYYY" className={"d-inline"}>{startDate}</Moment> 
                        &nbsp;-&nbsp;
                        <Moment format="D MMMM YYYY" className={"d-inline"}>{endDate}</Moment> 
                    </p>
                    <p className="mb-1"><b>Country: </b>{(countries.find((country) => country[1] === countryCode) || ["", ""])[0]}</p>
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center">
                <Col className="col-1 text-center">
                    <Button variant="primary" onClick={() => addMonth(-1)}>
                        Prev
                    </Button>
                </Col>
                <Col className="col-10 d-flex flex-column align-items-center" style={{minHeight: "70vh"}}>
                    { 
                        covidData ? 
                            <Chart data={covidData.map(elem => {
                                return {
                                    ...elem, 
                                    date: moment(new Date(elem.date)).format("MMMM D")
                                } 
                            })} /> 
                        : firstLoad ? 
                            null
                            : <p className="m-auto"><i>No data avalible</i></p>
                    }
                </Col>
                <Col className="col-1 text-center">
                    <Button variant="primary" onClick={() => addMonth(1)}>
                        Next
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default DataDisplay;
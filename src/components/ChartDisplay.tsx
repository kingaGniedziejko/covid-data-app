import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { Button, Col, Row } from 'react-bootstrap';
import Chart from './Chart';

type ChartDisplayProps = {
    covidData: CovidDataType | null;
    onPrevClick: () => void;
    onNextClick: () => void;
    firstLoad: boolean;
}

const ChartDisplay = ({covidData, onPrevClick, onNextClick, firstLoad}: ChartDisplayProps) => {
    const chartColumnRef = useRef<HTMLDivElement | null>(null);

    return (
        <Row id="chart-display" className="justify-content-center d-flex flex-wrap">
                <Col className="col-3 col-lg-2 text-center mt-3" xs={{ order: 2 }} lg={{ order: 1 }}  >
                    <Button variant="primary" onClick={onPrevClick}>Prev</Button>
                </Col>
                <Col className="col-10 col-lg-8 d-flex flex-column align-items-center" ref={chartColumnRef} xs={{ order: 1 }} lg={{ order: 2 }} >
                    { 
                        covidData && chartColumnRef.current ? 
                            <Chart width={chartColumnRef.current.clientWidth} data={covidData.map(elem => {
                                return {
                                    ...elem, 
                                    date: moment(new Date(elem.date)).format("MMMM D")
                                } 
                            })} /> 
                        : firstLoad ? <p className="m-auto"><i>Loading...</i></p> : <p className="m-auto"><i>No data avalible</i></p>
                    }
                </Col>
                <Col className="col-3 col-lg-2 text-center mt-3"  xs={{ order: 3 }} lg={{ order: 3 }} >
                    <Button variant="primary" onClick={onNextClick}>Next</Button>
                </Col>
            </Row>
    )
}

export default ChartDisplay;
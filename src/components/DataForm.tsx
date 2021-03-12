import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import countries from '../data/countries';

const DataForm = () => {
    const today = new Date();
    const currentDate: string = today.getFullYear() + "-" + ('0' + (today.getMonth()+1)).slice(-2);
    
    const [date, setDate] = useState(currentDate);
    const [country, setCountry] = useState<[string, string]>(countries[0]);

    //test
    useEffect(() => {
        console.log(date);
        console.log(country);
    }, [date, country])


    return (
        <Row className="justify-content-center">
            <Col className="col-8" >
                <h4 className="text-center mb-4">Enter data</h4>
                <Form className="d-flex flex-column">
                    <Form.Group controlId="date">
                        <Form.Label>Month & year</Form.Label>
                        <Form.Control type="month" lang="eng" min="2020-01" max={currentDate} value={date} onChange={(e)=>setDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="country" className="mb-5">
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" className="pr-2" value={country[1]} onChange={(e) => setCountry(countries.find((country) => country[1] === e.target.value) || ["", ""])} >
                            {countries.map(([name, code]) => <option id={code} key={code} value={code}>{name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Link to={"/display/" + date + "/" + country[1]} className="align-self-center">
                        <Button variant="primary" className="px-4">
                            Submit
                        </Button>
                    </Link>
                </Form>
            </Col>
        </Row>
    )
}

export default DataForm;
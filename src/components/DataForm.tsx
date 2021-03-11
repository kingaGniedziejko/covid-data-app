import React from 'react';
import { Container, Form } from 'react-bootstrap';

const countries = [
    ["India", "IND"],
    ["United States of America", "USA"],
    ["Czech Republic", "CZE"],
]

const DataForm = () => {
    return (
        <Container>
            <h1>Enter data</h1>
            <Form>
                <Form.Group controlId="date">
                    <Form.Label>Month & year</Form.Label>
                    <Form.Control type="month"/>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control as="select" className="pr-2">
                        {countries.map(([name, code]) => <option value={code}>{name}</option>)}
                    </Form.Control>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default DataForm;
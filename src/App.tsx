import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import DataDisplay from './components/DataDisplay';
import DataForm from './components/DataForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container className="py-4">
          <Row>
            <Col className="text-center mb-4">
              <h1>Covid Statistics</h1>
            </Col>
          </Row>
          <Switch>
            <Route exact path={"/"} component={DataForm}/>
            <Route exact path={"/display/:date/:countryCode"} component={DataDisplay}/>
          </Switch>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/style.css'

import Header from './components/Header';
import Content from './components/Content';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container className="py-4">
          <Header/>
          <Content/>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;

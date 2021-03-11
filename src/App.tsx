import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import DataDisplay from './components/DataDisplay';
import DataForm from './components/DataForm';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={DataForm}/>
          <Route exact path={"/display/:date/:country"} component={DataDisplay}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DataForm from './DataForm';
import DataDisplay from './DataDisplay';

const Content = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={DataForm}/>
            <Route exact path={"/display/:date/:countryCode"} component={DataDisplay}/>
        </Switch>
    )
}

export default Content;
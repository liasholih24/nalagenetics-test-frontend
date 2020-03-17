import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Homepage from './News/Homepage';


const Routes = () => (
<Router>
    <Switch>
        <Route exact path="/">
            <Homepage/>
        </Route>
        <Route path="/sign-in">
            <SignIn/>
        </Route>
        <Route path="/sign-up">
            <SignUp/>
        </Route>
    </Switch>
</Router>
);

export default Routes;
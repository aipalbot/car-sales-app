import React, { Component } from 'react'
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SignIn from './auths/SignIn';
import SignUp from './auths/SignUp';
import Dashboard from './forms/Dashboard';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route  exact path='/' component={SignIn}/>
                </Switch>
            </div>
        );

    }
}
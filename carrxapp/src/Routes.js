import React, { Component } from 'react'
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SignIn from './auths/SignIn';
import SignUp from './auths/SignUp';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/' component={SignIn}/>
                </Switch>
            </div>
        );

    }
}
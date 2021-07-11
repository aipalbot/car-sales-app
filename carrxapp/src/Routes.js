import React, { Component } from 'react'
import { BrowserRouter as Switch, Route } from "react-router-dom";
import SignIn from './auths/SignIn';
import SignUp from './auths/SignUp';
import CommonConstant from './constants/CommonConstant';
import AdminDashboard from './forms/AdminDashboard';
import CustomerForm from './forms/CustomerForm';
import Dashboard from './forms/Dashboard';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={CommonConstant.SIGN_UP} component={SignUp}/>
                    <Route path={CommonConstant.CUSTOMER_FORM} component={CustomerForm}/>
                    <Route path={CommonConstant.SIGN_IN} component={SignIn}/>
                    <Route path={CommonConstant.DASHBOARD} component={Dashboard}/>
                    <Route path={CommonConstant.ADMIN_DASHBOARD} component={AdminDashboard}/>
                    <Route  exact path={CommonConstant.HOME} component={SignIn}/>
                </Switch>
            </div>
        );

    }
}
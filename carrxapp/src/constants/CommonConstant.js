
    import React from "react";
    
  

    export default class CommonConstant extends React.Component {
        static DASHBOARD = '/dashboard';
        static ADMIN_DASHBOARD = '/admin-dashboard';
        static SIGN_IN ='/sign-in'
        static SIGN_UP ='/sign-up'
        static HOME = '/';
        static CREATE_USER_API_ENDPOINT = 'http://localhost:8080/user/create';
        static SIGIN_API_ENDPOINT ='http://localhost:8080/user/sign-in';
        static CREATE_CAR_API_ENDPOINT ='http://localhost:8080/stock/new';
    }
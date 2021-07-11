
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
        static RETRIEVE_CARS_API_ENDPOINT ='http://localhost:8080/stock/items/all';
        static S3_BUCKET ='avt-car-images';
        static REGION ='us-east-2';
        static ACCESS_KEY ='AKIA3JJ6B3CDQWM6YXL3';
        static SECRET_ACCESS_KEY ='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';
    }
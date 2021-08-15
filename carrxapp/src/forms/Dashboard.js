import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CommonConstant from '../constants/CommonConstant';
import CustomerForm from './CustomerForm';
import axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Welcome to Carsales Portal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {    
    marginRight:'40%'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Dashboard() {
  const [showCustomer,setShowCustomer] =useState(true)
  const [customerBtnName,setCustomerBtnName] = useState("Update Profile")
  const [data, setData] = useState(null)

  useEffect(() => {

    loadCarsAPI();

    }, [])

  const loadCarsAPI = () => {
    axios.get(  
    CommonConstant.RETRIEVE_CARS_API_ENDPOINT
      ).then((response) => {
        //It means the API is working
        console.log(response.data); 
        setData(response.data)      
      }, (error) => {
        console.log(error);
      });
  }

  const showCustomerForm = () =>{
    if(showCustomer){
      setShowCustomer(false)
      setCustomerBtnName("Update Profile")
    }else{
      setCustomerBtnName("Close Profile")
      setShowCustomer(true)
    }
  }

  const Show = () =>{
    if (showCustomer) {
      return <CustomerForm />;
    }
  }



  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
      
          <Typography variant="h6" color="inherit" noWrap>
           
        
          </Typography>   

        </Toolbar>
       
      </AppBar>
     
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              <br></br>
              Welcome to our Car Sales App
              <br></br>
              <Link href={CommonConstant.SIGN_IN}>
            Sign Out
           </Link>
         
            </Typography>
            
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>  
                  <Button variant="contained" color="primary" onClick={showCustomerForm}>
                   {customerBtnName}
                  </Button>                                
                 {Show()}
                </Grid>
                {/* <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid> */}
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data && data.map((car) => (
              <Grid item key={car} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={car.carImageUrl}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {car.maker} | ${car.price}
                    </Typography>
                    <Typography>
                   <b>VIN</b> : {car.vin} <br></br>
                   <b>ENGINE</b>: {car.engine} <br/>
                   <b>YEAR</b> : {car.year} <br/>
                   <b>MILEAGE</b> : {car.milleage}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

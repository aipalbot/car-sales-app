import {React,useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import axios from "axios";
import CommonConstant from '../constants/CommonConstant';

import {AppBar,Button,CardActions,CardContent,
    CardMedia,CssBaseline,Card,Grid,Toolbar,Typography,
    Container,Link,Tabs,Tab,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function CarStockList() {
  const classes = useStyles();
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


  console.log("My Data")
  console.log(data);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>

            {data  && data.map((item) => (
              <Grid item key={item.stockId} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={item.Model}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.maker}
                    </Typography>
                    <Typography>
                     <img src={item.carImageUrl} height='100' width='100'/>
                    </Typography>
                   <b>VIN:</b> {item.vin} <br></br>
                   <b>PRICE:</b> {item.price}
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
  );
}

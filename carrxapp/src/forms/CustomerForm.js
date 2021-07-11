import {React,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, 
    Button
} from '@material-ui/core';
import axios from "axios";
import CommonConstant from '../constants/CommonConstant';
import { uploadFile } from 'react-s3';
import S3 from 'react-aws-s3';
import Autocomplete from '@material-ui/lab/Autocomplete';

const config = {
  bucketName: CommonConstant.S3_BUCKET,
  dirName: 'car-images',
  region: CommonConstant.REGION,
  accessKeyId: CommonConstant.ACCESS_KEY,
  secretAccessKey: CommonConstant.SECRET_ACCESS_KEY,
}


const config1 = {
  bucketName: CommonConstant.S3_BUCKET,
  dirName: 'media', /* optional */
  region: 'us-east-1',
  accessKeyId: CommonConstant.ACCESS_KEY,
  secretAccessKey: CommonConstant.SECRET_ACCESS_KEY
}
const ReactS3Client = new S3(config1);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


// const handleYearChange = (event) => {
//     const name = event.target.name;
//     setState({
//       ...state,
//       [name]: event.target.value,
//     });
//   };

const carRequest ={
    "address":"",
  "city":"",
   "state":"",
   "zipCode":"",
   "imageUrl":""
}

export default function CustomerForm() {
  const classes = useStyles();
  const [data, setData] = useState(carRequest);
  const [image, setImage] = useState(null);
  const [selectedFile,setSelectedFile] = useState(null)
  const [apiResponse, setAPIResponse] = useState("");

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
     console.log(img.name)
      setSelectedFile(img)
      const url = URL.createObjectURL(img);
      setImage(url)
      console.log(url)
    }
  };
  const handleUpload = async (file) => {
    // uploadFile(file, config)
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err))

    const newFileName = 'test-file.jpg';

ReactS3Client
    .uploadFile(file, newFileName)
    .then(data => console.log(data))
    .catch(err => console.error(err))
}


  const handleInputChange = e => {
    e.preventDefault();
    //code below is an example deconstruct
    const { name, value } = e.target;
    // ...data
    
    setData({
      ...data,
      [name]: value
    });  
  }


  const handleCreateButton = (event) => {
    event.preventDefault();   
    console.log(data)
    handleUpload(selectedFile)
    data.imgUrl = selectedFile.name
    axios.post(  
    CommonConstant.CREATE_CAR_API_ENDPOINT , data
      ).then((response) => {
        //It means the API is working
        console.log(response);
        setAPIResponse(response.data);
        //clear all the textfields after submitting
        setData({
            "address":"",
            "city":"",
             "state":"",
             "zipCode":"",
             "imageUrl":""
      }
      )
      }, (error) => {
        console.log(error);
      });
  }

  const states =  [
    { code: 'PA', state: "Pennsylvania" },
    { code: 'CA', state: "California" },
    { code: 'FL', state: "Florida" }
  ]
  return (
    <div className={classes.root}>
      <div>
        <TextField
          value = {data.address}
          id="standard-full-width"
          label="Address"
          name="address"
          style={{ margin: 8 }}
          placeholder="Enter your address"         
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
        />
        <TextField
         value = {data.city}
          id="standard-full-width"
          label="City"
          name="City"
          style={{ margin: 8 }}
          placeholder="Enter your city"         
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
        />
        <br />
        <br/>
        <Autocomplete
      id="combo-box-demo"
      options={states}
      getOptionLabel={(option) => option.code}
      style={{ width: 300 }}
      value = {data.state}
      renderInput={(params) => <TextField {...params} label="States" variant="outlined" />}
    />
        <br/>
        <br/>
           <TextField
           value = {data.zipCode}
          id="standard-full-width"
          label="ZipCode"
          name="zipCode"
          style={{ margin: 8 }}
          placeholder="Enter your 5digits zipcode"         
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
        />
        
       

        <div>
            <img src={image} />
            <h1>Select Image</h1>
            <input type="file" name="imgUrl" onChange={onImageChange} />
            {/* <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button> */}
          </div>

          <br/>

          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleCreateButton}
            >
            Update Customer Info
            </Button>
            <p>
              <b style={{color:'green'}}>{apiResponse}</b>
            </p>
      </div>

    
    </div>
  );
}

const express = require('express')
const https = require('https')
const app = express()
const request = require('request')
const mongoose = require('mongoose')
const cron = require('node-cron')
const cors = require('cors');
const urlocal='mongodb://localhost:27017'
const url= process.env.URL_MONGO || urlocal;
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const Weather = require("./weather");
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL;
require('dotenv').config({path:"./.env"})



//var inputValue = document.querySelector('.inputValue')

const options = {
  method: 'GET',
  url: 'https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=16c4230a0b9b1a4d6647594e1d280088',
  
};

app.use(bodyParser.json());
app.use(cors({origin: '*'}))
app.get('/', (req, res) => { 
    res.send('Robot is running')
});
app.listen(process.env.PORT);

//connection à MongoDB
mongoose.connect(MONGO_URL,
 {   //pour recuperer le 1er paramètre, aller sur mongodb, cliquer sur connect > connect your application
     useNewUrlParser: true, useUnifiedTopology:true
    }).then(()=>{
        console.log("connexion success !");//si ça fonctionne on affiche cela dans la console
    }).catch((error) =>{
        console.log(error); //sinon on affiche l'erreur
    });


async function getWeatherByDateAndTime(){
        
    request(options, function (error, response, body) {
        console.log("je suis dans le request");
        const bodyResponse = JSON.parse(body);
        console.log(bodyResponse.list[0].dt);
        console.log(bodyResponse.list[0].main.temp);
        console.log(bodyResponse.list[0].main.feels_like);
        console.log(bodyResponse.list[0].main.humidity);
        console.log(bodyResponse.list[0].weather[0].id);
        console.log(bodyResponse.list[0].weather[0].description);
        console.log(bodyResponse.list[0].dt_txt);
        console.log(bodyResponse.city.id);
        console.log(bodyResponse.city.name);
        console.log(bodyResponse.city.country);
        
        console.log(bodyResponse.list.length)
        for (let i =0; i< 10; i++){
        const temps = new Weather({
            city_id : bodyResponse.city.id,
            name : bodyResponse.city.name,
            country : bodyResponse.city.country,
            dt : bodyResponse.list[i].dt,
            temp : bodyResponse.list[i].main.temp,
            feels_like : bodyResponse.list[i].main.feels_like,
            humidity : bodyResponse.list[i].main.humidity,
            //weather_id : bodyResponse.list[i].weather[i].id, 
            description : bodyResponse.list[i].weather[0].description, 
            dt_txt : bodyResponse.list[i].dt_txt    
        })
        temps.save();
        }

        
    
        
       


    });
           
}
getWeatherByDateAndTime();

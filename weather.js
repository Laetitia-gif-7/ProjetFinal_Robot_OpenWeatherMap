const mongoose = require('mongoose'); 

const weather = mongoose.Schema({
    dt:{
        type : Number
    },
    temp:{
        type : Number
    },
    feels_like : {
        type : Number
    },
    humidity : {
        type : Number
    },
    weather_id : {
        type: Number
    },
    description : {
        type: String
    },
    dt_txt : {
        type: Date
    },
    city_id : {
        type: Number
    },
    name : {
        type: String
    },
    country : {
        type: String
    }
});

module.exports = mongoose.model('weather', weather, 'Weathers');
//nous l’exportons afin que nous puissions l’utiliser dans app.js.



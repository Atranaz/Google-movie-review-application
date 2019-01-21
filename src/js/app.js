require('../css/style.css');
let cars = require("./cars.js");
let $ = require('jquery');

$.each(cars, (key,value) => {
    $('body').append('<h1>'+cars[key].name+'</h1>');
});


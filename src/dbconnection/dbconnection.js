//SETUP
var express = require('express');
var mongoose = require('mongoose');
var app = express();


mongoose.connect('localhost:27017/magang');


var Data = mongoose.model('Data', dataSchema);

//SETUP

//CREATE


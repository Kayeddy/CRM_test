const express = require("express");
const mongoose = require("mongoose");
const contactModel = require('./Models/Contacts');
const taskModel = require('./Models/Tasks');
const commentModel = require('./Models/Comments');


const app = express();
mongoose.connect('mongodb+srv://Eddy:1477@crm.ulvukwt.mongodb.net/CRM_data?retryWrites=true&w=majority');



app.listen(3001, () => {
    console.log('IT WORKS');
});
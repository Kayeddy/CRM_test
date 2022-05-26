const express = require("express");
const mongoose = require("mongoose");
const contactModel = require('./Models/Contacts');
const taskModel = require('./Models/Tasks');
const commentModel = require('./Models/Comments');
const { json } = require("express");


const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://Eddy:1477@crm.ulvukwt.mongodb.net/CRM_data?retryWrites=true&w=majority');

app.get("/getContacts", (req, res) => {

    contactModel.find({}, (err, data) => {

        err ? console.log(json(err)) : res.json(data);

    });

});

app.post("/createContact", async(req, res) => {
    const contact = req.body;
    const newContact = new contactModel(contact);
    await newContact.save();

    res.json(contact);
})

app.post("/createTask", async(req, res) => {
    const task = req.body;
    const newTask = new contactModel(task);
    await newTask.save();

    res.json(task);
})

app.post("/createComment", async(req, res) => {
    const comment = req.body;
    const newComment = new contactModel(comment);
    await newComment.save();

    res.json(comment);
})

app.listen(3001, () => {
    console.log('IT WORKS');
});
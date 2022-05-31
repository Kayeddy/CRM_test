const express = require("express");
const mongoose = require("mongoose");
const contactModel = require('./Models/Contacts');
const taskModel = require('./Models/Tasks');
const commentModel = require('./Models/Comments');
const { json } = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Eddy:1477@crm.ulvukwt.mongodb.net/CRM_data?retryWrites=true&w=majority');


app.get("/getContacts", (req, res) => {

    contactModel.find({}, (err, data) => {

        err ? console.log(json(err)) : res.json(data);

    });

});



app.get("/getTasks", (req, res) => {

    taskModel.find({}, (err, data) => {

        err ? console.log(json(err)) : res.json(data);

    });

});



app.get("/getComments", (req, res) => {

    commentModel.find({}, (err, data) => {

        err ? console.log(json(err)) : res.json(data);

    });

});

app.post("/createContact", async(req, res) => {
    const contact = req.body;
    const newContact = new contactModel(contact);
    await newContact.save();

    res.json(contact);
});

app.post("/createTask", async(req, res) => {
    const task = req.body;
    const newTask = new taskModel(task);
    await newTask.save();

    res.json(task);
});

app.post("/createComment", async(req, res) => {
    const comment = req.body;
    const newComment = new commentModel(comment);
    await newComment.save();

    res.json(comment);
});


app.put("/editContact/:id", async(req, res) => {
    
    const contactProfile = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        birth_date: req.body.birth_date,
        address: req.body.address,
        type_of_contact: req.body.type_of_contact,
        origin: req.body.origin,
        _id: req.params.id,
    }

    contactModel.findByIdAndUpdate(contactProfile._id, contactProfile, function(err, response) {
        if(err)
        {
            console.log(err);

        }
        else {
            res.statusCode === 200 ? res.json("Contact has been updated") : res.json("Couldn't update profile");
        }

    });
    
});

app.put("/editTask/:id", async(req, res) => {

    const task = {
        title: req.body.title,
        responsible: req.body.responsible,
        responsible_id: req.body.responsible_id,
        end_date: req.body.end_date,
        summary_required: req.body.summary_required,
        _id: req.params.id,
    }

    taskModel.findByIdAndUpdate(task._id, task, function(err, response) {
        if(err)
        {
            console.log(err);

        }
        else {
            res.statusCode === 200 ? res.json("Task has been updated") : res.json("Couldn't update task");
        }

    });

});

app.put("/editComment/:id", async(req, res) => {
    const comment = {
        content: req.body.content,
        recipient: req.body.recipient,
        delivery_date: req.body.delivery_date,
        _id: req.params.id,
    }

    commentModel.findByIdAndUpdate(comment._id, comment, function(err, response) {
        if(err)
        {
            console.log(err);

        }
        else {
            res.statusCode === 200 ? res.json("Comment has been updated") : res.json("Couldn't update comment");
        }

    });

});


app.delete("/deleteContact/:id", async(req, res) => {
    
    const contactProfile = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        birth_date: req.body.birth_date,
        address: req.body.address,
        type_of_contact: req.body.type_of_contact,
        origin: req.body.origin,
        _id: req.params.id,
    }

    contactModel.findByIdAndDelete(contactProfile._id, contactProfile, function(err, response) {
        if(err)
        {
            console.log(err);

        }
        else {
            res.statusCode === 200 ? res.json("Contact has been deleted") : res.json("Couldn't update profile");
        }

    });
    
});


app.delete("/deleteTask/:id", async(req, res) => {
    
    const task = {
        title: req.body.title,
        responsible: req.body.responsible,
        responsible_id: req.body.responsible_id,
        end_date: req.body.end_date,
        summary_required: req.body.summary_required,
        _id: req.params.id,
    }

    taskModel.findByIdAndDelete(task._id, task, function(err, response) {
        if(err)
        {
            console.log(err);

        }
        else {
            res.statusCode === 200 ? res.json("Task has been deleted") : res.json("Couldn't delete task");
        }

    });
    
});

app.delete("/deleteComment/:id", async(req, res) => {

    const comment = {
        content: req.body.content,
        recipient: req.body.recipient,
        delivery_date: req.body.delivery_date,
        _id: req.params.id,
    }

    commentModel.findByIdAndDelete(comment._id, comment, function(err, response) {
        if(err)
        {
            console.log(err);

        }
        else {
            res.statusCode === 200 ? res.json("Comment has been deleted") : res.json("Couldn't delete comment");
        }

    });

});

app.listen(3001, () => {
    console.log('IT WORKS');
});
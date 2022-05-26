const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema( { 

    sender: {
        type: String,
        required: true,
    },

    recipient: {
      type: String,
      required: true,
    },

    delivery_date: {
      type: Date,
      required: true,
    },

    content: {
        type: String,
        required: true,
    },
} );

const commentModel = mongoose.model ("contact", commentSchema);

module.exports = commentModel;

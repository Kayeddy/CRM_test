const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema( { 

    recipient: {
      type: mongoose.Schema.Types.ObjectId,
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

const commentModel = mongoose.model ("comment", commentSchema);

module.exports = commentModel;

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema( { 

    title: {
        type: String,
        required: true,
    },

    responsible: {
      type: String,
      required: true,
    },

    responsible_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }, 

    end_date: {
      type: Date,
      required: true,
    },

    summary_required: {
        type: Boolean,
        required: true,
    },
} );

const taskModel = mongoose.model ("task", taskSchema);

module.exports = taskModel;

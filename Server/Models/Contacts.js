const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema( {

  first_name: {
      type: String,
      required: true,
  },

  middle_name: {
    type: String,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
    required: true,
  },

  birth_date: {
    type: Date,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  type_of_contact: {
    type: String,
    required: true,
  },

  origin: {
    type: String,
    required: true,
  },

} );

const contactModel = mongoose.model ("contact", contactSchema);

module.exports = contactModel;
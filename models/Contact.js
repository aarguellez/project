const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", ContactSchema);
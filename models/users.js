// import mongoose from "mongoose";
const mongoose = require('mongoose')

// Create Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.model("users", userSchema);
module.exports = User = mongoose.model("users", userSchema);
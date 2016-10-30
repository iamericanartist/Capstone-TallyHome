"use strict"

const mongoose = require("mongoose")

// const User = mongoose.model("user", {
module.exports = mongoose.model("User", {
  email: {
    type: String,
    lowercase: true,
    required: true,
  // add when ready to use
    // const HTML5_EMAIL_VALIDATION = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // match: [HTML5_EMAIL_VALIDATION, "Please enter valid email address"],
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
  },
  info: {
    name: String,
    about: String,
    picture: String
  },
  homes: [mongoose.Schema.Types.ObjectId]
})

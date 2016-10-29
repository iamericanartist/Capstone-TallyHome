"use strict"

const mongoose = require("mongoose")

// const Home = mongoose.model("home", {
module.exports = mongoose.model("Home", {
  userId: String,
  homeName: String,
  moveIn: String,
  homeEvent: [Object]
}) 

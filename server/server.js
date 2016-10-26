"use strict"

const { json } = require("body-parser")                               //returns middleware that only parses json
const express = require("express")                                    //pull Express in
const mongoose = require("mongoose");                                 //pull Mongoose in

const app = express()                                                 //initialize Express
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/tallyhome"
const PORT = process.env.PORT || 3000                                 //set up ports



/////////////////////////////////  Middleware  /////////////////////////////////
app.use(express.static("client"))                                     //express base directory is the ROOT, not the folder where the server is - established in package.JSON
app.use(json())

app.get("/api/title", (req, res) =>                                   //setting title here
  res.json({ title: "TallyHome / Angular / Bootstrap" })              //use objects here NOT STRINGS  
)


////////////////////////////////////  MODEL  ////////////////////////////////////
const Home = mongoose.model('home', {
  homeName: String,
  moveIn: String,

}) 

app.get("/api/homes", (req, res, err) =>
  Home
    .find()
    .then(homes => res.json({ homes }))
    .catch(err)
)

// replace hard coded messages:
// app.get("/api/homes", (req, res) =>
//   res.json({
//     homes: [
//       {
//         homeName: "MyHouse1",
//         moveIn: "November 20, 2016",
//       },
//       {
//         homeName: "MyHouse2",
//         moveIn: "Sept 10, 2010",
//       },
//       {
//         homeName: "MyHouse3",
//         moveIn: "4/4/92",
//       },
//     ],  //use objects here NOT STRINGS
//   })
// )

app.post("/api/homes", (req, res, err) => {
  const home = req.body
  Home
    .create(home)
    .then(home => res.json(home))
    .catch(err)
})


mongoose.promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))     //server/server.js console.log()
)

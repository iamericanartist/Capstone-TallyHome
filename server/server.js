"use strict"

const { json } = require("body-parser")                               //returns middleware that only parses json
const express = require("express")                                    //pull Express in
const mongoose = require("mongoose")                                  //pull Mongoose in

const app = express()                                                 //initialize Express
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/tallyhome"
const PORT = process.env.PORT || 3000                                 //set up ports



/////////////////////////////////  Middleware  /////////////////////////////////
app.use(express.static("client"))                                     //express base directory is the ROOT, not the folder where the server is - established in package.JSON
app.use(json())

app.get("/api/title", (req, res) =>                                   //setting title here
  res.json({ title: "TallyHome / Ang / Boot / Exp / Mgoose" })        //use objects here NOT STRINGS  
)


////////////////////////////////////  MODEL  ////////////////////////////////////

const User = mongoose.model("user", {
  email: String,
  password: String,
  homes: [String],    
  info: {
    id: String,
    name: String,
    about: String,
    picture: String
  } 
})

const Home = mongoose.model("home", {
  userId: String,
  homeName: String,
  moveIn: String,
  homeEvent: String
}) 



app.get("/api/homes", (req, res, err) =>
  Home
    .find()
    .then(homes => res.status(201).json({ homes }))
    .catch(err)
)


app.post("/api/homes", (req, res, err) => {
  const newHomeObj = req.body
  Home
    .create(newHomeObj)
    .then(response => {res.json(response)
      console.log("~~~~req.body~~~~", req.body)
      console.log("~~~~response~~~~", response)
    })
    .catch(err)
    console.log("~~This Home~~", newHomeObj)
})

///////////////////////////////  ERROR HANDLING  ///////////////////////////////
app.use("/api", (req, res) =>
  res.status(404).send({ code: 404, status: "Not Found" })
)
app.use((err, req, res, next) =>
  res.status(500).send({ code: 500, status: "Internal Server Error", detail: err.stack })
)


mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))     //server/server.js console.log()
)

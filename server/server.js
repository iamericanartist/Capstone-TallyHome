"use strict"

const { json, urlencoded } = require("body-parser")                   //returns middleware that only parses json
const express = require("express")                                    //pull Express in
const mongoose = require("mongoose")                                  //pull Mongoose in

const app = express()                                                 //initialize Express
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/tallyhome"
const PORT = process.env.PORT || 3000                                 //set up ports


/////////////////////////////////  Middleware  /////////////////////////////////
app.use(express.static("client"))                                     //express base directory is the ROOT, not the folder where the server is - established in package.JSON
app.use(json())

app.use(urlencoded({extended: false}))

app.get("/api/title", (req, res) =>                                   //setting title here
  res.json({ title: "TallyHome / Ang / Boot / Exp / Mgoose" })        //use objects here NOT STRINGS  
)

app.locals.errors = {}
app.locals.body = {}
app.locals.company = "TallyHome"


///////////////////////////////////  MODELS  ///////////////////////////////////
const User = mongoose.model("user", {
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

const Home = mongoose.model("home", {
  userId: String,
  homeName: String,
  moveIn: String,
  homeEvent: [{ 
      name: String,
      date: String,
      info: String
    }],
  eventDate: Date,
}) 


/////////////////////////////////  GETS/POSTS  /////////////////////////////////
///////////////////////////////////  HOMES  ///////////////////////////////////
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
    .then(response => {res.status(201).json(response)
    })
    .catch(err)
    console.log("~~This Home~~", newHomeObj)
})
app.delete("/api/homes/:id", (req, res, err) => {
  const id = req.params.id
  console.log("||SERVER REMOVE ID: ", id)
  Home
    .find({_id: id})
    .remove({_id: id})
    .then(() => res.status(204))
    .catch(err)
})


//////////////////////////////////  NEWEVENT  //////////////////////////////////
app.get("/api/events", (req, res, err) =>
  Event
    .find()
    .then(events => {
      res.json({ events })
      console.log("events", events);
    })
    .catch(err)
)

app.post("/api/events", (req, res, err) => {
  const newEventObj = req.body
  Event
    .create(newEventObj)
    .then(response => {
      console.log("NEW EVENT OBJ", newEventObj)
      console.log("response", response)
      User.findOneAndUpdate({ email: newEventObj.userID }, { $push: {"events": response}})
      .then((data) => {
        console.log("data", data)
      })
      .catch(err)
      // res.json(response)
    })
    .catch(err)
})



//////////////////////////////////  REGISTER  //////////////////////////////////
app.post("/api/register", (req, res, err) => {
  const newUserObj = req.body
  User
    .create(newUserObj)
    .then(response => {res.json(response)
    })
    .catch(err)
    // console.log("~~This User~~", newUserObj)
})


//////////////////////////////////  LOGIN  //////////////////////////////////
app.post("/api/login", (req, res, err) => {
  console.log("login LOG req.body:", req.body )
  const userObj = req.body
  User
    .findOne({ email: userObj.email })
    .then(response => {
      if (response.password === userObj.password) { 
        res.status(201).json({ user: response, message: "Successful Login!" })
      } else {
        res.json({message: "Issue with Email/Password"})
      }
    })
    .catch(err)
    // console.log("~~This User~~", userObj)
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
mongoose.disconnect = () => mongoose.disconnect()


"use strict"

const { json, urlencoded } = require("body-parser")                               //returns middleware that only parses json
const express = require("express")                                    //pull Express in
const mongoose = require("mongoose")                                  //pull Mongoose in

const app = express()                                                 //initialize Express
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/tallyhome"
const PORT = process.env.PORT || 3000                                 //set up ports

const routes = require("../routes/") // same as ./routes/index.js


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
// console.log("~~app.locals~~", app.locals)


///////////////////////////////////  MODELS  ///////////////////////////////////
// MOVED TO "/models/"


///////////////////////////////////  ROUTES  ///////////////////////////////////
app.use(routes)



// app.get("/api/login", (req, res, err) => {
//   console.log("LOGIN VIEW")
//   res.render("login", {page: "Login"})
// })
//////////////////////////////////  GETS/POSTS  //////////////////////////////////
// app.get("/api/homes", (req, res, err) =>
//   Home
//     .find()
//     .then(homes => res.status(201).json({ homes }))
//     .catch(err)
// )


// app.post("/api/homes", (req, res, err) => {
//   const newHomeObj = req.body
//   Home
//     .create(newHomeObj)
//     .then(response => {res.json(response)
//       console.log("~~~~req.body~~~~", req.body)
//       console.log("~~~~response~~~~", response)
//     })
//     .catch(err)
//     console.log("~~This Home~~", newHomeObj)
// })

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


"use strict"

const { Router } = require("express")                       //pull Express Router in
const router = Router()

///////////////////////////////////  MODELS  ///////////////////////////////////
const User = require("../models/user")
const Home = require("../models/home")



//////////////////////////////  HOME/INDEX ROUTE  //////////////////////////////
router.get("/", (req, res) => {                             //this is the route for INDEX "/"
  console.log("HOME/INDEX VIEW")
  res.render("index")                                       //render this page
})


///////////////////////////////  REGISTER ROUTES  ///////////////////////////////
router.get("/register", (req, res) => {                     //this is the route for REGISTER
  console.log("REGISTER VIEW")
  res.render("register")                                    //render this page
})

router.post('/register', function (req, res) {
  console.log("req.body", req.body)
  User
    .create({ user: req.body.email, pass: req.body.password })
    // .then(() => res.send("Spitballin here"))
    .then(() => res.redirect('/login'))
    .catch(err)
})


////////////////////////////////  LOGIN ROUTES  ////////////////////////////////
router.get("/login", (req, res) => {                        //this is the route for LOGIN 
  console.log("LOGIN VIEW")
  res.render("login")                                       //render this page
})


////////////////////////////////  LOGOUT ROUTES  ////////////////////////////////
router.get("/logout", (req, res) => {                       //this is the route for LOGOUT 
  console.log("LOGOUT VIEW")
  res.render("logout")                                      //render this page
})


//////////////////////////////////  GETS/POSTS  //////////////////////////////////
router.get("/homes", (req, res, err) =>
  Home
    .find()
    .then(homes => res.status(201).json({ homes }))
    .catch(err)
)


router.post("/homes", (req, res, err) => {
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







module.exports = router

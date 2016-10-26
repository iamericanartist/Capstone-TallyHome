"use strict"

const express = require("express")                                    //pull Express in

const app = express()                                                 //initialize Express
const PORT = process.env.PORT || 3000                                 //set up ports


app.use(express.static('client'))                                     //express base directory is the ROOT, not the folder where the server is - established in package.JSON

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))     //server/server.js console.log()

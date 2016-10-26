"use strict"

const express = require("express")                                    //pull Express in

const app = express()                                                 //initialize Express
const PORT = process.env.PORT || 3000                                 //set up ports


app.use(express.static("client"))                                     //express base directory is the ROOT, not the folder where the server is - established in package.JSON

app.get("/api/title", (req, res) =>                                   //setting title here
  res.json({ title: "TallyHome / Angular / Bootstrap" })              //use objects here NOT STRINGS  
)

app.get("/api/homes", (req, res) =>
  res.json({
    homes: [
      {
        homeName: "MyHouse1",
        moveIn: "November 20, 2016",
      },
      {
        homeName: "MyHouse2",
        moveIn: "Sept 10, 2010",
      },
      {
        homeName: "MyHouse3",
        moveIn: "4/4/92",
      },
    ],  //use objects here NOT STRINGS
  })
)

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))     //server/server.js console.log()

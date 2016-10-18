# TallyHome - Front-End Capstone Project
## Node / Database Driven Applications / MEAN Stack

### [NSS](http://nashvillesoftwareschool.com/) Cohort D14 / Instructor - [Scott Humphries](https://github.com/sscotth) / Advisors - [Caitlin Stein](https://github.com/C-Stein) & [Callan Morrison](https://github.com/morecallan)

![TallyHomeScreencap](img/TallyHomeScreencap.jpg?raw=true "TallyHome Screencap")

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/iamericanartist/Capstone-TallyHome/master/LICENSE)


<p align="center">
    <img src="https://rawgit.com/badges/shields/master/logo.svg"
         height="130">
</p>
<p align="center">
    <a href="https://www.gratipay.com/Shields/">
        <img src="https://img.shields.io/gratipay/team/shields.svg"
             alt="Gratipay">
    </a>
    <a href="https://npmjs.org/package/gh-badges">
        <img src="https://img.shields.io/npm/v/gh-badges.svg"
             alt="npm version">
    </a>
    <a href="https://travis-ci.org/badges/shields">
        <img src="https://img.shields.io/travis/badges/shields.svg"
             alt="build status">
    </a>
</p>
<p align="center"><sup><strong>An image server for legible and concise information. Our <a href="http://shields.io/">Homepage</a> | <a href="https://twitter.com/shields_io">Twitter</a></strong></sup></p>


***


## PROPOSAL
### OweSki - “...so you KnowSki”
When two people go to lunch, get beers, buy a soda, etc., and one of the people buys and says “you get the next one”: OweSki is a way for both parties to track who owes whom. 
### OweSki Snapshot
OweSki is basically a “who’s turn is it?” tracker. 
Someone bought lunch? +1 to buyer / -1 to beneficiary

### NOTES
- OweSki is an idea I’ve had for a while now. A best friend and I have had a “mental” OweSki going for a while, and I’ve always intended to make it an application at some point; why not now?
- I see this as a phone app eventually, but functionally it could/should work just as well as a web app (make it responsive!) 

## REQUIREMENTS
1. Must have the ability to register a user in Firebase
1. Must have the ability to log in
1. You must be able to add OweSkis
1. You must use Firebase to store credits/dollar amounts
1. You must be able to add categories
1. You must be able to remove categories
1. Each OweSki must have the following properties
   1. tokenId
   1. positive value for one user and opposite for the other
   1. A boolean value that, if true, means that user has the positive or negative token value
1. It must be written with Angular
1. For the layout, should probably use Bootstrap

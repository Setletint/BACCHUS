const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')
const Bid = require('./func/Bid')
const app = express()
const port = 8081
const auctionUrl = 'http://uptime-auction-api.azurewebsites.net/api/Auction';

let auctions = new Array();

var jsonParser = bodyParser.json()

app.get('/auctions', (req, res) => {
    axios.get('http://uptime-auction-api.azurewebsites.net/api/Auction')
        .then((response) => {
            auctions = response.data;
            res.send(auctions);
        }).catch((error) => {
            res.status(500).send('External server is disabled')
        })
})

app.get('/getBid/:id', (req, res) => {
    let reqId = req.params['id']
    if (reqId != undefined) {
        let sem = new Bid
        let dbRes = sem.checkBid(reqId)
        console.log(dbRes);
        if(dbRes != null){
            res.send(dbRes)
        }else{
            res.status(404).send('bid not found')
        }
    }else{
        res.status(400).send('no parameters were given')
    }
})

app.post('/makebid', jsonParser, (req, res) => {

    let isBidExist = false
    let userName = req.body.name;
    let userSurname = req.body.surname;
    let auctionID = req.body.auctionID;
    let auctionName = req.body.auctionName;
    let amount = req.body.amount;
    let currentTimeDate = new Date;

    if (userName && userSurname) {
        userName = userName.replace(/\s/g, '');
        userSurname = userSurname.replace(/\s/g, '');
        userName = userName.replaceAll(';','')
        userSurname = userSurname.replaceAll(';', '');

        let bidID = userName + ';' + userSurname +';'+ currentTimeDate.toJSON();
        console.log(bidID);

        let sem = new Bid
        highiestBid = sem.checkBid(auctionID);

        if(highiestBid == null) isBidExist = true;

        if (amount > highiestBid) {
            sem.makeBid(auctionID,auctionName ,bidID, amount, isBidExist)
            res.status(201).send('bid has been created')
        }
    }
    res.status(200).send('');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
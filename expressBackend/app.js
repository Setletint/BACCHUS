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

            let sem = new Bid
            console.log(sem.checkBid('DASDA31231'))

            res.send(auctions);
        }).catch((error) => {
            res.status(500).send('External server is disabled')
        })
})

app.post('/makebid', jsonParser ,(req,res)=>{
    console.log(req.body);
    let userName   = req.body.name;
    let userSurname= req.body.surname;
    let auctionID  = req.body.auctionID;
    let currentTimeDate = new Date;

    if(userName && userSurname){
        userName = userName.replace(/\s/g, '');
        userSurname = userSurname.replace(/\s/g, '');
        
        let bidID = userName + userSurname + currentTimeDate.toJSON();
        console.log(bidID);
    }


    res.send('');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
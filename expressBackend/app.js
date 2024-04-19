const axios = require('axios')
const express = require('express')
const Bid = require('./func/Bid')
const app = express()
const port = 8081
const auctionUrl = 'http://uptime-auction-api.azurewebsites.net/api/Auction';

let auctions = new Array();


app.get('/auctions', (req, res) => {
    axios.get('http://uptime-auction-api.azurewebsites.net/api/Auction')
        .then((response) => {
            auctions = response.data;
            res.send(auctions);
        }).catch((error) => {
            res.status(500).send('External server is disabled')
        })
})

app.post('/auctions',(req,res)=>{
    console.log(req);
    res.send('');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
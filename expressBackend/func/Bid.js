const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./expressBackend/bidsDatabase.sqlite');

class Bid{
    createDatabase(){
        db.serialize(()=>{
            db.run(`CREATE TABLE bids(
                auctionID varchar(255),
                userID varchar(255),
                highestBid DECIMAL(255,2)
                );`)
        })
    }
    dropBidsTable(){
        db.serialize(()=>{
            db.run("DROP TABLE bids")
        })
    }

    checkBid(productId,userID,amount) {
        db.serialize(()=>{
            db.get(`SELECT MAX(highestBid) FROM bids WHERE auctionID='`+productId+`'`, (err,row)=>{
                if(err){
                    return console.error(err.message);
                }
                return row.highestBid
            })
        })
    }

    makeBid(productId,userID,amount){
        db.serialize(()=>{
            db.run(`INSERT INTO bids(auctionID, userID, highestBid) VALUES ('`+productId+`','`+userID+`','`+amount+`')`)
        })
    }
}

module.exports = Bid;
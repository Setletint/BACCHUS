const Database = require('better-sqlite3');
const db = new Database('./expressBackend/bidsDatabase.sqlite');
db.pragma('journal_mode = WAL');

class Bid{
    createDatabase(){
        db.exec(`CREATE TABLE bids(
            auctionID varchar(255),
            userID varchar(255),
            highestBid DECIMAL(255,2)
            );`)
        
    }
    dropBidsTable(){
        db.exec("DROP TABLE bids")
    }

    /*checkBid(productId,userID,amount) {
        db.serialize(()=>{
             db.get(`SELECT MAX(highestBid) FROM bids WHERE auctionID='`+productId+`'`, (err,row)=>{
                if(err){
                    return console.error(err.message);
                }
                row = Object.entries(row)
            }) 
        })
    }*/

    makeBid(productId,userID,amount){
        const stmt = db.prepare(`INSERT INTO bids(auctionID, userID, highestBid) VALUES (?,?,?)`)
        const inform = stmt.run(productId,userID,amount)
    }
}

let das = new Bid
das.makeBid('DASDAS123','SomeUID',254)

module.exports = Bid;
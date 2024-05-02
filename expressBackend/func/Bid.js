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

    checkBid(productId) {
        const maxBidObj = db.prepare(`SELECT MAX(highestBid) FROM bids WHERE auctionID=?`).get(productId);
        const result = Object.entries(maxBidObj);
        return result[0][1];
    }

    makeBid(productId,userID,amount){
        const stmt = db.prepare(`INSERT INTO bids(auctionID, userID, highestBid) VALUES (?,?,?)`)
        const inform = stmt.run(productId,userID,amount)
    }
}

let das = new Bid
das.makeBid('DASDAS123','SomeUID',254)

module.exports = Bid;
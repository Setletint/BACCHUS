const Database = require('better-sqlite3');
const db = new Database('./expressBackend/bidsDatabase.sqlite');
db.pragma('journal_mode = WAL');

class Bid {
    createDatabase() {
        db.exec(`CREATE TABLE bids(
            auctionID varchar(255),
            auctionName varchar(255),
            userID varchar(255),
            highestBid DECIMAL(255,2)
            );`)

    }
    dropBidsTable() {
        db.exec("DROP TABLE bids")
    }

    checkBid(productId) {
        const maxBidObj = db.prepare(`SELECT MAX(highestBid) FROM bids WHERE auctionID=?`).get(productId);
        const result = Object.entries(maxBidObj);
        return result[0][1];
    }

    makeBid(productId, auctionName, userID, amount, isBidExist) {

        if (isBidExist == false) {
            const stmt = db.prepare(`INSERT INTO bids(auctionID, auctionName, userID, highestBid) VALUES (?,?,?,?)`)
            const inform = stmt.run(productId, auctionName, userID, amount)
        }else{
            const stmt = db.prepare(`UPDATE bids SET userID = ?, highestBid = ? WHERE auctionID = ?`)
            const inform = stmt.run(userID, amount, productId)
        }
    }
}
module.exports = Bid;
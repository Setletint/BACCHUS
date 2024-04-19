const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./expressBackend/bidsDatabase.sqlite');

class Bid{
    makeBid(productId,userName,userFullname,amount) {
    }
}

module.exports = Bid;
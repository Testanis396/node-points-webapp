class Transaction {
    constructor(payer, points, timestamp) {
    this.payer = payer;
    this.points = points;
    this.timestamp = timestamp;
    this.balance = (points > 0) ? points:0;
    } 
}

module.exports = Transaction;
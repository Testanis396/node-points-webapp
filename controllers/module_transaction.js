class Transaction {
    static count = 0;

    constructor(payer, points, timestamp) {
    this.payer = payer;
    this.points = points;
    this.timestamp = timestamp;
    this.balance = (points > 0) ? points:0;
    this.id = ++this.constructor.count;
    } 
}

module.exports = Transaction;
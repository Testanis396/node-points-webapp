const transaction = require("./module_transaction");

class Payer {
    
    constructor(payer, points) {
        this.payer = payer;
        this.points = points;
    }
}

function spendPoints (account, points, bal) {
    // returns a list of spent points {"payer","points"}.
    // sorts account by timestamp. loop through, spend points, update individual and total balances.
    let ret = new Array();
    
    function compare (a, b) {
        if ( a.timestamp < b.timestamp ){
            return -1;
        }
        if ( a.timestamp > b.timestamp ){
            return 1;
        }
        return 0;
    }
    
    account.sort(compare);
    
    //for all transactions where balance is positive,
    //update each balance, and add new spend transaction, until points are spent.
    for (const obj of account) {
        if (obj.balance > 0) {
            let sum = points + obj.balance;
            let cur = bal.get(obj.payer);
            var d = new Date();
            
            let date = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') + 'T' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':') + 'Z';
            
            if(sum >= 0) {
                //done spending
                obj.balance = sum;
                bal.set(obj.payer, cur + points);
                let newT = new transaction(obj.payer, points, date);
                account.push(newT);
                ret.push(new Payer(obj.payer, points));
                return ret;
            }
            else {
                //add transaction and continue spending
                obj.balance *= -1;
                bal.set(obj.payer, cur + obj.balance);
                let newT = new transaction(obj.payer, obj.balance, date);
                account.push(newT);
                ret.push(new Payer(obj.payer, obj.balance));
                obj.balance = 0;
                points = sum;
            }
        }
    }
}

module.exports = spendPoints;
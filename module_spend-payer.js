function spendPayer (account, payer, points) {
    // spends points and deducts from only payer balances.
    // sort account by timestamp, loop through and spend payer points.
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
    
    //for all transactions of type payer, and balance is positive,
    //update each balance until points are spent.
    for (const obj of account) {
        if ((obj.payer == payer) && (obj.balance > 0)) {
            let cur = points + obj.balance;
            if(cur >= 0) {
                //done 
                obj.balance = cur;
                return;
            }
            else {
                obj.balance = 0;
                points = cur;
            }
        }
    }
}

module.exports = spendPayer;
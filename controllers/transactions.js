const transaction = require("./module_transaction");
const spendPayer = require("./module_spend-payer");
const spendPoints = require("./module_spend-points");

const getAllTransactions = (req, res) => {
    //respond with transaction history
    //res.write("your transaction history is ...");
    try {    
        let history = req.app.get('account');
        res.json(JSON.stringify(history));
    }
    catch(err){
        console.error(err);
        res.status(500).json("something went wrong");
    }
}
        
const createTransaction = (req, res) => {
    //add new transaction to list
    let payer = req.body.payer;
    let points = req.body.points;
    let timestamp = req.body.timestamp;
    try {
        let bal = req.app.get('balance');
        let cur = (bal.has(payer)) ? bal.get(payer):0;
        let acc = req.app.get('account');
        if (points > 0) {
            //if points are earned add to bal
            bal.set(payer, cur + points);  
        }
        else {
            if(points + cur >= 0) {
                //if points are spent add to bal
                bal.set(payer, cur + points);
                //call function spend payer points.
                spendPayer(acc, payer, points);
            }
            else {
                res.json({message: "Invalid transaction, spend record exceeds payer balance"});
            }
        }
        let newT = new transaction(payer, points, timestamp);
        acc.push(newT);   
        res.json({message: "transaction added ..."});
    }
    catch(err){
        console.error(err);
        res.status(500).json("something went wrong");
    }
}

const getPoints = (req, res) => {
    //respond with current total points balance
    try {  
        res.json(JSON.stringify(Array.from(req.app.get('balance'))));
    }
    catch(err){
        console.error(err);
        res.status(500).json("something went wrong");
    }
}

const updatePoints = (req, res) => {
    //respond with list of new negative transactions
    let points = req.body.points * -1;
    try {
        let bal = req.app.get('balance');
        let acc = req.app.get('account');
        let sum = 0;
        let ret = [];
        bal.forEach(value => {
            sum += value;
        });
        if(points + sum >= 0) {
            //call function to spend points and add new transactions
            ret = spendPoints(acc, points, bal);
        }
        else {
            res.json({message: "Invalid transaction, points exceeds total balance"});
        }
        res.json(JSON.stringify(Array.from(ret))); 
    }
    catch(err){
        console.error(err);
        res.status(500).json("something went wrong");
    }  
}

module.exports = {
    getAllTransactions,
    createTransaction,
    getPoints,
    updatePoints,
}
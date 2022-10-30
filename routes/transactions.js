const express = require("express");
const transaction = require("../module_transaction");
const spendPayer = require("../module_spend-payer");
let router = express.Router();

router
    .route("/")
    .get((req, res) => {
        //respond with transaction history
        //res.write("your transaction history is ...");
        let history = req.app.get('account');
        res.json(JSON.stringify(history));})
        
    .post((req, res) => {
        //add new transaction to list
        let payer = req.body.payer;
        let points = req.body.points;
        let timestamp = req.body.timestamp;
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
        res.json({message: "transaction added ..."});})

module.exports = router;
const express = require("express");
const transaction = require("../module_transaction");
const spendPoints = require("../module_spend-points");
let router = express.Router();

router
    .route("/")
    .post((req, res) => {
        //respond with list of new negative transactions
        let points = req.body.points * -1;
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
    })
    
module.exports = router;
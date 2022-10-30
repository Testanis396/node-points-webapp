const express = require('express');
const app = express();
const port = process.env.port || 8080;
const transactions_route = require("./routes/transactions.js");
const spend_route = require("./routes/spend.js");
const balance_route = require("./routes/balance.js");

app.use(express.json());
app.use("/transactions", transactions_route);
app.use("/spend", spend_route);
app.use("/balance", balance_route);

app.get('/',(req,res) => {
    //handle root
    res.json({message: "account created"});
});

const account = new Array();
const balance = new Map();

app.set('account', account);
app.set('balance', balance);

app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`my-points app listening at http://localhost:${port}`);
});
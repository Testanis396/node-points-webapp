const express = require("express");
const app = express();
const transactions_route = require("./routes/transactions.js");
const transaction = require("./controllers/module_transaction");

app.use(express.json());
app.use("/api/transactions", transactions_route);

app.post("/api",(req,res) => {
    //handle root
    const account = new Array();
    const balance = new Map();
    app.set("account", account);
    app.set("balance", balance);
    transaction.count = 0;
    res.status(200).json({message: "account created"});
});

module.exports = app;
const express = require('express');
const app = express();
const port = process.env.port || 8080;
const transactions_route = require("./routes/transactions.js");

app.use(express.json());
app.use("/api/transactions", transactions_route);

app.get('/api',(req,res) => {
    //handle root
    const account = new Array();
    const balance = new Map();
    app.set('account', account);
    app.set('balance', balance);
    res.json({message: "account created"});
});

app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`my-points app listening at http://localhost:${port}`);
});
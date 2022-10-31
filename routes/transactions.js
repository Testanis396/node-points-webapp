const express = require("express");
let router = express.Router();

const {
    getAllTransactions,
    createTransaction,
    getPoints,
    updatePoints,
} = require("../controllers/transactions");

router
    .route("/")
    .get(getAllTransactions) 
    .post(createTransaction);

router
    .route("/points")
    .get(getPoints)
    .post(updatePoints);

module.exports = router;
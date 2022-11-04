const express = require("express");
let router = express.Router();

const {
    getAllTransactions,
    createTransaction,
    getTransaction,
    patchTransaction,
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

router
    .route("/:id")
    .get(getTransaction)
    .patch(patchTransaction);

module.exports = router;
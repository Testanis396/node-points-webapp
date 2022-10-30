const express = require("express");
let router = express.Router();

router
    .route("/")
    .get((req, res) => {
    //respond with current total points balance
    res.json(JSON.stringify(Array.from(req.app.get('balance'))));
})

module.exports = router;
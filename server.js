const app = require("./app");
const port = process.env.port || 8080;

app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`my-points app listening at http://localhost:${port}`);
});
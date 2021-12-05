const express = require('express');
const app = express();
const config = require('./config.json');

app.get("/", async (req, res) => {

})


app.listen(config.port, () => {
    console.log("Listening . . .")
})
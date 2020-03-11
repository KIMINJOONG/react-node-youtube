const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/youtube", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("mongo db success"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`sever run http://localhost:${port}`));

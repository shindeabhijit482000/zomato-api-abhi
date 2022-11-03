const express = require('express');
const mongoose = require('mongoose')
const app = express();
const APIRouter = require("./Routes/APIRouter");
const cors = require("cors");

const PORT = 5003;
const URI = 'mongodb://127.0.0.1:27017/zomatoDB'

app.use(cors()); // to enable the cors request



//to enable/access post data
app.use(express.json()) //convert string JSON data topure JSON data
app.use(express.urlencoded({ extended: false })) //normal post data to jsion data

app.use("/", APIRouter);
console.log("connecting to db.....");
mongoose
    .connect(URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("db connected successfully!!!");
            console.log("zomato api is running on port :", PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
// const dotenv = require("dotenv"); 
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// import uuidv4 from 'uuid/v4';
import mongoose from 'mongoose';
import listRoutes from './api/listRoute';
const path = require("path");

const app = express();
// const listRoutes = express.Router();

dotenv.config();

const PORT = process.env.PORT || 4000;
// const URI_lists = 'mongodb://localhost:27017/lists';

let List = require('./api/models/task');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "../client/build")))

mongoose.connect(process.env.DB_URI_REMOTE ||"mongodb://localhost:27017/lists", 
                {useNewUrlParser: true,
                 useUnifiedTopology: true},
                )
        .then(() => {
            console.log("MongoDB database initial connection established successfully.");
        })
        .catch((err) => {
            console.log("ERROR! Could not connect to Database!");
            console.log(err);
        });

const connection = mongoose.connection;
connection.on('disconnected',()=> {console.log('lost connection!')});
connection.on('reconnected',()=> {console.log('reconnected to db again!')});

app.use('/lists', listRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});


app.listen( PORT, () => { 
    console.log('Server is running on Port: ' + PORT);
});

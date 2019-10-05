// const dotenv = require("dotenv"); 
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// import uuidv4 from 'uuid/v4';
import mongoose from 'mongoose';

const app = express();
const listRoutes = express.Router();

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI_lists = 'mongodb://localhost:27017/lists';

let List = require('./models/task');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(URI_lists, 
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
        

listRoutes.route('/').get(function(req, res) {
    List.find(function(err, lists) {
        if (err) {
            console.log(err);
        } else {
            res.json(lists);
        }
    });
});

listRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    List.findById(id, function(err, list) {
        res.json(list);
    });
});

listRoutes.route('/update/:id').post(function(req, res) {
    List.findById(req.params.id, function(err, list) {
        if (!list)
            res.status(404).send("data is not found");
        else
            list.list_item = req.body.list_item;
            list.list_status = req.body.list_status;
            list.list_due = req.body.list_due;
            list.list_created = req.body.list_created;

            list.save().then(list => {
                res.json('List item updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

listRoutes.route('/add').post(function(req, res) {
    let newitem = new List(req.body);
    newitem.save()
        .then(list => {
            res.status(200).json({'list': 'list item added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new list item failed');
        });
});

app.use('/lists', listRoutes);

app.listen( PORT, () => { 
    console.log('Server is running on Port: ' + PORT);
});

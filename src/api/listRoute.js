// listRoute.js

const express = require('express');
const listRoutes = express.Router();


// Require List model in our routes 
let List = require('./models/task');

// Get all items
listRoutes.route('/').get(function(req, res) {
    List.find(function(err, lists) {
        if (err) {
            console.log(err);
        } else {
            res.json(lists);
        }
    });
});

// Get item by :id
listRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    List.findById(id, function(err, list) {
        res.json(list);
    });
});

// Add new items
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


// Save edited item
listRoutes.route('/update/:id').post(function(req, res) {
    List.findById(req.params.id, function(err, list) {
        if (!list)
            res.status(404).send("data is not found");
        else
            list.list_item = req.body.list_item;
            list.list_status = req.body.list_status;
            list.list_due = req.body.list_due;
            list.list_created = req.body.list_created;

            list.save()
                .then(list => {
                    res.json('List item updated!');
                })
                .catch(err => {
                    res.status(400).send("Unable to update the database");
                });
    });
});

// Completed item
listRoutes.route('/complete/:id').post(function(req, res) {
    List.findById(req.params.id, function(err, list) {
        if (!list)
            res.status(404).send("data is not found");
        else
            list.list_complete = req.body.list_complete;
            list.save()
                .then(list => {
                    res.json('List item updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
    });
});

module.exports = listRoutes;
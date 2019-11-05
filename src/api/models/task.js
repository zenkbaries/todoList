const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    list_complete: {
        type: Boolean,
        required: true,
        default: false
    },
    list_item: {
        type: String,
        required: true
    },
    list_due: {
        type: Date,
        required: false
    },
    list_status: {
        type: String,
    },
    list_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('List', listSchema);

const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema({
    // Restricts the data a user can submit to the DB
    todo: String,
    author: String
});

module.exports = mongoose.model('todo', TodosSchema);
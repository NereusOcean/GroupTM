const {Schema, model} = require("mongoose");

const News = new Schema({
    header: {type: String, required: true},
    text:{type: String, required: true},
    date: {type:Date},
    author: {type:String},
})

module.exports = model('News',News);

const {Schema, model} = require("mongoose");

const Groups = new Schema({
    customId: {type: Number, required: true, index:{unique: true}},
    nameGroup:{type: Number, required: true},
    schedule: [Object],
})

module.exports = model('Groups',Groups);

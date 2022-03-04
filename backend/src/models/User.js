const {Schema, model} = require("mongoose");

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password:{type: String, required: true},
    avatar: {type:String},
    group:{type:String, required: true},
    role: {type:String, required: true},
    name:{type:String},
})

module.exports = model('User',User);

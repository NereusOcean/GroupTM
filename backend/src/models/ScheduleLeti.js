const {Schema, model} = require("mongoose");

const ScheduleLeti = new Schema({
    group:{type: String, required: true, index:{unicode: true}},
    time: [String],
    weekDay: [String],
    title:[String],
    shortTitle:[String],
    teacher:[String],
    cabinet:[String],
    kindWeek:[Number],

})

module.exports = model('ScheduleLeti',ScheduleLeti);


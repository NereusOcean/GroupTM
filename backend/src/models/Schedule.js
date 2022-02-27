const {Schema, model} = require("mongoose");

const ScheduleLeti = new Schema({
    dateUpdate: {type: String, required: true},
    group:{type: String, required: true},
    time: {type: String},
    weekDay: [String],
    name:[String],
    teacher:[String],
    cabinet:[String],
    kindWeek:[Number],

})

module.exports = model('ScheduleLeti',ScheduleLeti);

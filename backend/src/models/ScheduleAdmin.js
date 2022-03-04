const {Schema, model} = require("mongoose");

const ScheduleAdmin = new Schema({
    dateUpdate: {type: String, required: true},
    group:{type: String, required: true},
    time: {type: String},
    weekDay: [String],
    name:[String],
    teacher:[String],
    cabinet:[String],
    kindWeek:[Number],

})

module.exports = model('ScheduleAdmin',ScheduleAdmin);

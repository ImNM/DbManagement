const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alarm = mongoose.Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    serialNum : {
        type : Schema.Types.ObjectId,
        ref:'everyDay'
    },
    pillName : {
        type:String
    },
    startDate : {
        type :String,
    },
    endDate : {
        type : String
    },
    when : {
        type :String
    }



})


const Alarm = mongoose.model('alarm', alarm);

module.exports = {Alarm};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const everyDay = mongoose.Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    serialNum : {
        type : String,
        unique:1
    },
    enrollDate : {
        type :String,
        default : ""
    },
    description : {
        type : String,
        default : ""
    },
    state :{
        type: Boolean ,
        default : false
    },
    dosageState :{
        type: Boolean ,
        default : false
    },
    toggle :{
        type: Boolean ,
        default : false
    }



},{timestamps : true})


const EveryDay = mongoose.model('everyDay', everyDay);

module.exports = {EveryDay};
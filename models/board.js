const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema({
    writerId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    writerName : {
        type : String,
    },
    title : {
        type :String,
        ref : 'board'
    },
    content : {
        type : String
    },
    views : {
        type : Number,
        default : 0
    },
    like : {
        type : Number,
        default : 0
    },
    comment : {
        type : Number,
        default : 0
    },
    tag : {
        type : String,
        default : ""
    }



}, {timestamps : true})



const Board = mongoose.model('Board', boardSchema);
module.exports = {Board};
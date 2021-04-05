const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
    userId:{
        type : Schema.Types.ObjectId,
        ref:'user'
    },
    boardId:{
        type : Schema.Types.ObjectId,
        ref:'board'
    },

}, {timestamps : true})


const Like = mongoose.model('Like', likeSchema);

module.exports = {Like}

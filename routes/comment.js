const express = require('express');
const router = express.Router();

const {Comment} = require("../models/comment");
const {Board} = require("../models/board");

router.post("/saveComment",(req,res) =>{
    const comment  = new Comment(req.body);
   
    comment.save((err,comment)=>{
        if(err) return res.json({success: flase , err})

        Board.findOne({_id : comment.boardId},function(err,boardList2){
            // console.log("조회수 증가?",boardList2)
             boardList2.comment = boardList2.comment+1;
             boardList2.save();
        })


        Comment.find({'_id' : comment._id})
        .populate('writer')
        .exec((err,result)=>{
            if(err) return res.json({success:false ,err})
            res.status(200).json({success:true , result})
        })
    })


})


router.post("/getComments",(req,res) =>{
   // console.log("boardid",req.body.boardId)

    Comment.find({"boardId":req.body.boardId})
    .populate('writer')
    .exec((err,comments)=>{
        //console.log("comment", comments)
        if(err) return res.status(400).send(err)
        res.status(200).json({comments})
    })

})

module.exports = router;
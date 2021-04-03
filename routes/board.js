const { request } = require('express');
const express = require('express');
const router = express.Router();

const {Board} = require("../models/board");


router.post("/upload",(req,res) =>{
    console.log("upload:",req.body)
    const boardInfo = req.body.body;
    const board = new Board({
        writerId: boardInfo.writerId,
        title: boardInfo.title,
        content : boardInfo.content,
        writerName : boardInfo.writerName
    })

    board.save((err,doc)=>{
        if(err) return res.json({succes:false,err})
        res.status(200).json({succes:true})
    })
//
})


router.get('/pagination',function (req,res) {
    var boardLength = 0; 
     Board.find({},function(err,boardList){
       // console.log("boardLength : ",boardList.length);
     boardLength = boardList.length;
     return res.status(200).json({boardLength:boardLength});
     })
   
   
 });
 router.get('/page',function (req,res) {

     Board.find({},function(err,boardList){
       // console.log("boardList : ",boardList);
   
     return res.status(200).json({boardList:boardList});
     })
   
   
 });


 router.get('/pageInfo',function (req,res) {
    console.log("gdgd",req.query.key);
    const pageId = req.query.key;

     Board.find({_id : pageId},function(err,boardList){
       // console.log("boardList : ",boardList);
   
     return res.status(200).json({boardList:boardList});
     })
  
});

module.exports = router;
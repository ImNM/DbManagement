const { request } = require('express');
const express = require('express');
const router = express.Router();

const {Board} = require("../models/board");
const {Like} = require("../models/Like");
const {Comment} = require("../models/comment");
const {auth} =require('.././middleware/auth');

router.post("/upload",(req,res) =>{
    console.log("upload:",req.body)
    const boardInfo = req.body.body;
    const board = new Board({
        writerId: boardInfo.writerId,
        title: boardInfo.title,
        content : boardInfo.content,
        writerName : boardInfo.writerName,
        tag : boardInfo.tag
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
       
     boardLength = boardList.length;
     return res.status(200).json({boardLength:boardLength});
     })
   
   
 });
 router.get('/page',function (req,res) {

     Board.find({},function(err,boardList){
        var avatarList = [];
        Board.find().populate("writerId").exec((err,board)=>{
            if(err) return status(400).send(err);
            for(i = 0 ; i<board.length; i++){
                avatarList.push(board[i].writerId.avatar)
            }
            return res.status(200).json({boardList:boardList,avatarList:avatarList});
         })
     
})
       
     

    
   
   
 });


 router.get('/pageInfo',function (req,res) {
    console.log("gdgd",req.query.key);
    const pageId = req.query.key;

     Board.find({_id : pageId},function(err,boardList){
         boardList[0].populate("writerId").execPopulate((err,user)=>{  //미확인된 코드 수정할수 도 있음
             if(err) return res.status(400).send(err)
             //console.log("user:",user)
             //console.log("boardlist",boardList)
             Board.findOne({_id : pageId},function(err,boardList2){
                // console.log("조회수 증가?",boardList2)
                 boardList2.views = boardList2.views+1;
                 boardList2.save();
                // console.log("조회수 증가?",boardList2)
                return res.status(200).json({boardList:boardList2 , avatar:user.writerId.avatar});
             })
             
        })
       // console.log("boardList : ",boardList);
   
     
     })
  
});


router.post('/delete',auth,function (req,res) {

    const localUserInfo = req.body.localUserInfo;
    console.log(localUserInfo)
    const pageId = req.query.key;
    Board.findById((pageId), (err, board)=>{
        //console.log(localUserInfo.token)
        if(localUserInfo.userId == board.writerId){
            console.log("gdgd",pageId);
            Comment.find(({boardId:pageId}),(err,comments)=>{
             
                comments.map((comment)=>{
                   console.log(comment)
                   Comment.deleteMany({_id:comment._id},(err)=>{
                       console.log(err)
                   })   
                })
            })
            Like.find(({boardId:pageId}),(err,Likes)=>{
              
               Likes.map((like)=>{
                   Like.deleteMany({_id:like._id},(err)=>{
                      console.log(err)
                  })   
               })
           })
           // Like.remove({boardId:pageId})
          Board.deleteOne({_id:pageId},(err)=>{
           console.log(err)}
           )
            console.log("gdgd",req.query.key);
            return res.status(200).json({success:true});




        }
        else{
            return res.status(400).json({succes:false , message : "인증된 사용자가 삭제요청을 하지 않았습니다."})
        }
    })
   
 
   
    
  
});

module.exports = router;
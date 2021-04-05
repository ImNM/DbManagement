const express = require('express');
const router = express.Router();


const {Board} = require("../models/board");
const {Like} = require("../models/Like");

router.post('/getLikes',(req,res)=>{
    //게시판 좋아요만 구현 더 추가할거면 분기 처리하셈
    Like.find({boardId:req.body.boardId})
    .exec((err,likes)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true ,  likes})
    })
})

router.post('/upLike',(req,res)=>{
    //게시판 좋아요만 구현 더 추가할거면 분기 처리하셈
    const like = new Like({
        boardId: req.body.boardId,
        userId: req.body.userId
    });
    //console.log(like)
    like.save((err,likeResult)=>{
        if(err) return res.status(400).json({success: false ,err});

        Board.findOne({_id:like.boardId},(err,board)=>{
            if(err) return res.status(400).json({success: false ,err});
            board.like = board.like+1;
            board.save();
        })
        return res.status(200).json({success:true});
    })

    
})

router.post('/disLike',(req,res)=>{
    //게시판 좋아요만 구현 더 추가할거면 분기 처리하셈
    

    Board.findOne({_id:req.body.boardId},(err,board)=>{
        if(err) return res.status(400).json({success: false ,err});
        board.like = board.like-1;
        board.save();
    })

    Like.deleteOne({boardId:req.body.boardId , userId: req.body.userId},(err)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true})
    })

    
})



module.exports = router;
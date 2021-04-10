const express = require('express');
const router = express.Router();

const {Alarm} = require("../models/alarm");
const {EveryDay} = require("../models/everyDay");

router.post("/getUsers",(req,res) =>{//유저들 정보 확인

    
   
})
router.post("/geteveryDay",(req,res) =>{//기기 가져오기

    
   
})
router.post("/seteveryDay",(req,res) =>{//기기 시리얼 넘버 등록

    
   
})


module.exports = router;
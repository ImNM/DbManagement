const express = require('express');
const router = express.Router();

const {Alarm} = require("../models/alarm");
router.post('/save',(req,res)=>{
    const alarm  = new Alarm(req.body);
    alarm.save((err)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({success:true});
    })
})


router.post('/getAlarm',(req,res)=>{
   const everyDayId =  req.body.everyDayId;
   console.log("evr",everyDayId);
   
   Alarm.find({serialNum : everyDayId},(err,alarms)=>{
       if(err) return res.status(404).json({success:false});
       if(!alarms.length) return res.status(200).json({success:true});
       return res.status(200).json({success:true,alarms})
      console.log(alarms);
   })
    
})


router.post('/delete',(req,res)=>{
    const alarmId =  req.body.alarmId;
    console.log("evr",alarmId);
    
    Alarm.deleteOne({ _id : alarmId},(err)=>{
        if(err) return res.status(404).json({success:false});
        return res.status(200).json({success:true})
    })
 })

module.exports = router;
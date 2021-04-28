var cron = require('cron');
const moment = require('moment')
const {EveryDay} = require("../models/everyDay");

var cronJob = cron.job("*/10 * * * * *", function(){
    EveryDay.find({},(err,everyday)=>{
        const now = moment();
    
        everyday.map((one)=>{
            const time = moment(one.updatedAt);
           
           if(moment.duration(now.diff(time)).asMinutes() > 3){
               if(one.state === true){
                one.state = false;
                one.save();
               }
           }
           
        })
    })
}).start(); 

module.exports = {cronJob};
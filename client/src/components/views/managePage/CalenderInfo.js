import React ,{useState,useEffect} from 'react'
import { Calendar, Badge,Tooltip ,Popconfirm ,message} from 'antd';
import { LeftOutlined, RightOutlined,  DeleteFilled } from '@ant-design/icons';
import '../../../CalenderInfo.scss'
import moment, { Moment as MomentTypes } from 'moment';
import axios from 'axios';
let dateInfo = [];

function CalenderInfo(props) {
    const [changeWeek, setchangeWeek] = useState(moment().clone().week());
    const [todayInfo, settodayInfo] = useState(moment().clone().format('YYYY년 MM 월 DD 일'))
    const [calendarWeek , setcalendarWeek] =useState([])
    const [alarmInfo, setalarmInfo] = useState([])
    const [todayAlarmInfo,settodayAlarmInfo] = useState([]);

    useEffect(() => {  //db에 등록된 알람 정보를 가져온다!
      axios.post('/api/alarm/getAlarm',{everyDayId : props.everyDayId})
        .then((res)=>{
          if(res.data.success){
            console.log(res.data.alarms)
            setalarmInfo(res.data.alarms)
           //
          }
        })
    }, [])


    const Righthandler = ()=>{
        if(changeWeek + 1 === 54)
        setchangeWeek(1)
        else{
            setchangeWeek(changeWeek+1)
        }
    }
    const lefthandler = ()=>{
        if(changeWeek - 1 ===0)
        setchangeWeek(53)
        else{
            setchangeWeek(changeWeek-1)
        }
    }
  
    const onClickdate = (current)=>{
        const day = current.target.innerText || 28;
        console.log("day",day)
      
            dateInfo.map((mam)=>{
                //console.log(mam.format('D') )
              if(mam.format('D') === day){//여기서 axios 날짜마다 요청
                settodayInfo(mam.format('YYYY년 MM 월 DD 일'))
                console.log("mam",mam)
                var alarmForView = [];

                alarmInfo.map((alarm)=>{
                  if( (moment(mam.format('YYYY-MM-DD')).isAfter(alarm.startDate)
                   && moment(mam.format('YYYY-MM-DD')).isBefore(alarm.endDate)) 
                  ||  moment(mam.format('YYYY-MM-DD')).isSame(alarm.endDate)
                  ||  moment(mam.format('YYYY-MM-DD')).isSame(alarm.startDate)
                  )
                    alarmForView.push(alarm)

                })

                settodayAlarmInfo(alarmForView)



              }
            })
            
        
        
    }
    function generate() {
    
        const today = moment();
       // const startWeek = today.clone().week();
        const startMonth = moment().clone().week(changeWeek).month();
        
        const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
       
        console.log("몇주startmonth",startMonth)
        //console.log(endWeek)
        let calendar = [];
        dateInfo = [];
        for (let week = changeWeek; week <= changeWeek; week++) {
        
          calendar.push(
            <div className="row" key={week}>
              {
                Array(7).fill(0).map((n, i) => {
                  
                  let current = moment().clone().week(week).startOf('week').add(n + i, 'day')
                  dateInfo.push(current)
                 // console.log("current",current)
                  let currentMonth = current.month()===startMonth ? current.month() : startMonth -1;
                 // console.log("currentmmm",currentMonth)
                  let isSelected = todayInfo === current.format('YYYY년 MM 월 DD 일') ? 'selected' : '';
                  let isGrayed = current.format('MM') === today.format('MM') ? '' : 'grayed';
                  return (
                    <div className={`box  ${isSelected} ${isGrayed}`} onClick={onClickdate}  key={i}>
                      <span value = {current.format('YYMMDD')}className={`text`}>{current.format('D')}</span>
                    </div>
                  )
                })
              }
            </div>
          )
        }
        console.log(calendar)
        //setcalendarWeek(calendar)
        return calendar;
    }

    const showPopconfirm = (event)=>{
      console.log(event)
      var r = window.confirm("해당 알람을 삭제하시겠습니까?");
        if (r == true) {      
          axios.post('/api/alarm/delete',{alarmId : event })
            .then((res)=>{
              if(res.data.success)
                alert("알람 정보 지우기 성공")
            })
        }   else {
              return ;
      }
    }
    return (
        <div>
          <div className="Calendar">
           <div className="head">
               <button><LeftOutlined onClick ={lefthandler} /></button>
                <span className="title">{moment().clone().week(changeWeek).format('MMMM YYYY')}</span>
                <button><RightOutlined onClick={Righthandler} /></button>
           </div>
           <div className="body">
            
       
        

        <div className="row">
         <div className="box">
            <span className="text">일</span>
          </div>
          <div className="box">
            <span className="text">월</span>
          </div>
          <div className="box">
            <span className="text">화</span>
          </div>
          <div className="box">
            <span className="text">수</span>
          </div>
          <div className="box">
            <span className="text">목</span>
          </div>
          <div className="box">
            <span className="text">금</span>
          </div>
          <div className="box">
            <span className="text">토</span>
          </div>
        </div>
        {generate()}

       
          </div>
        </div>
        <div style={{display:'flex',flexDirection:"column",alignItems:"center"}} className ="dateInfo">
          
                 <div><h3 >{todayInfo}</h3> </div>
                 <div>{todayAlarmInfo && 
                  todayAlarmInfo.map((Info,index)=>(
                    <div style = {{display: "flex"}} >
                    <li > {Info.when} {Info.pillName}</li>
                    <Tooltip title ="알람 삭제" >
                    
                    <DeleteFilled onClick={() => showPopconfirm(Info._id)} id = {Info._id}/>   
                        
                 
                   </Tooltip>
                  </div>
                  ))
                 }</div>
          
           

           
        </div>
        </div>
    )

}
export default CalenderInfo


import React ,{useState} from 'react'
import { Calendar, Badge } from 'antd';
import { LeftOutlined, RightOutlined, BellOutlined } from '@ant-design/icons';
import '../../../CalenderInfo.scss'
import moment, { Moment as MomentTypes } from 'moment';
let dateInfo = [];

function CalenderInfo() {
    const [changeWeek, setchangeWeek] = useState(moment().clone().week());
    const [todayInfo, settodayInfo] = useState(moment().clone().format('YYYY년 MM 월 DD 일'))
    const [calendarWeek , setcalendarWeek] =useState([])


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
        const day = current.target.innerText;
      
            dateInfo.map((mam)=>{
                //console.log(mam.format('D') )
              if(mam.format('D') === day){//여기서 axios 날짜마다 요청
                settodayInfo(mam.format('YYYY년 MM 월 DD 일'))




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
                 <div>asdf</div>
          
           

           
        </div>
        </div>
    )

}
export default CalenderInfo


import React,{useState} from 'react'
import axios from 'axios';
import { Steps, Button, message ,Input ,TimePicker } from 'antd';
import DatePicker from './DatePicker'
import moment from 'moment';
const { Step } = Steps;


function Setalarm(props) {



    const [current, setCurrent] = useState(0)
    const [pillname, setpillname] = useState("")
    const [pillTime,setpillTime] = useState("")
    const [pillTerm, setpillTerm] = useState({})

      const next = () => {
        setCurrent(current + 1);
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };

      const steps = [
        {
          title: '투약 이름',
          content: 'First-content',
        },
        {
          title: '투약 시간',
          content: 'Second-content',
        },
        {
          title: '투약 기간',
          content: ''
                ,
        },
      ];

     const onPillNameHandler = (e) =>{
      setpillname(e.target.value);
     }
     const onPillTimeHandler = (time, timeString) => {
      console.log(timeString);
      setpillTime(timeString)
    }
    const onSaveHandler = ()=>{
      console.log(pillname,pillTime,pillTerm)
     console.log(moment(pillTerm.endDate).format("YYYY-MM-DD") )
     console.log(moment(pillTerm.startDate).format("YYYY-MM-DD") )
      if(pillname === "" || pillTime === "") return alert("모든정보를 올바르게 입력하세요")
     const sendInfo = {
       owner : props.userId,
       serialNum : props.everyDayId,
       pillName : pillname,
       startDate : moment(pillTerm.startDate).format("YYYY-MM-DD"),
       endDate : moment(pillTerm.endDate).format("YYYY-MM-DD") ,
       when : pillTime
     }


      console.log(props.everyDayId)
     axios.post('/api/alarm/save',sendInfo).then(res =>{
       if(res.success) 
       alert("저장 성공")
     })
    }

    const onSelectDateHandler = (data) =>{
      console.log(data)
      setpillTerm(data)

    }


    return (
        <div style={{transitionDuration :"3s"}}>

<Steps  size = "small" current={current}>
              {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                        ))}
               </Steps>
                 <div className="steps-content" style ={{display : "flex" ,justifyContent:"center"}}>
                    {current === 0 &&
                    <div style ={{margin : "5%"}}>
                        <h1>약 이름을 설정해 주세요!</h1>
                        <Input placeholder = "약이름을 입력해주세요" value = {pillname} onChange = {onPillNameHandler}/>
                    </div>   
                 }
                 {current === 1 &&
                    <div  style ={{margin : "5%"}}>
                       <TimePicker defaultValue={moment('12:08', "HH:mm")} format="HH:mm" onChange = {onPillTimeHandler} />
                    </div>   
                 }
                 {current === 2 &&
                    <div  style ={{margin : "5%"}}>
                       <DatePicker onSelectDateHandler = {onSelectDateHandler}/>
                    </div>   
                 }
                 
                 
                 
                 </div>
                 <div className="steps-action" style ={{marginLeft:"43%"}}>
                 {current < steps.length - 1 && (
                   <Button type="primary" onClick={() => next()}>
                       다음으로
                  </Button>
                 )}
                {current === steps.length - 1 && (
                      <Button type="primary" onClick={onSaveHandler}>
                       저장하기
                     </Button>
                 )}
                 {current > 0 && (
                      <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                       이전으로
                      </Button>
                )}
      </div>
            
        </div>
    )
}

export default Setalarm

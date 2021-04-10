import React,{useState} from 'react'

import { Steps, Button, message } from 'antd';
import DatePicker from './DatePicker'
const { Step } = Steps;


function Setalarm() {



    const [current, setCurrent] = useState(0)


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
                    </div>   
                 }
                 {current === 1 &&
                    <div  style ={{margin : "5%"}}>
                        asdfasdf
                    </div>   
                 }
                 {current === 2 &&
                    <div  style ={{margin : "5%"}}>
                       <DatePicker/>
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
                      <Button type="primary" onClick={() => message.success('Processing complete!')}>
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

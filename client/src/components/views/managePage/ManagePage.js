import React ,{useState,useEffect}from 'react'

import { withRouter } from 'react-router-dom';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Setalarm from "./Setalarm"
import CalenderInfo from "./CalenderInfo"
import { Card, Button,Tooltip,message }  from 'antd';
import { EditOutlined, InfoOutlined, BellOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import axios from 'axios';

const { Meta } = Card;

  

  function ManagePage() {

    const localUserInfo  = JSON.parse(localStorage.getItem("Auth"));
      
    const [ShowCalender, setShowCalender] = useState(true)
    const [Edit, setEdit] = useState(false)
    const [EditEveryday, setEditEveryday] = useState(false)
    const [everyDayId , seteveryDayId] = useState("")
    

    const onCalenderInfoHandler = ()=>{//기기 알람 정보
        setEditEveryday(false)
        setEdit(false)
        setShowCalender(!ShowCalender);
        
    }
    const onEditInfoHandler = ()=>{ //기기관리
        setEditEveryday(!EditEveryday)
        setShowCalender(false)
        setEdit(false);
    }
   
  
    
    const onSettingClickHandler = ()=>{//기기알람 설정
        setEditEveryday(false)
        setShowCalender(false)
        setEdit(!Edit);
    }

    useEffect(() => {
       axios.post('/api/everyDay/geteveryDay',{userId : localUserInfo.userId})  // 서버에서 id 에 등록된 매일이 아이디를 가져온다
       .then((res)=>{
           if(res.data.success){
            seteveryDayId(res.data.id)
           }
       
       })
    }, [])

    const [serialNum, setserialNum] = useState("")
    const [serialState, setserialState] = useState("")
    const [everyName, seteveryName] = useState("")
    const [everydescription, seteverydescription] = useState("")
    const [stable, setstable] = useState(false)
    const onClickSerialNumHandler = ()=>{
        axios.post('/api/everyDay/check',{serialNum:serialNum}).then((res)=>{
            console.log(res)
            if(res.data.success){
                setstable(true)
                setserialState ("success")
                message.success("유효한 시리얼 번호 입니다.")
                
            }
            else{
                setserialState("error")
                message.error("유효하지 않은 시리얼 번호입니다.")
            }
        })
    }
    const onserialInputChange=(e)=>{
        setserialNum(e.target.value)
    }
    const onChangeSerialNum=(e)=>{
        seteveryName(e.target.value)
    }
    const onChangedescription=(e)=>{
        seteverydescription(e.target.value)
    }
    const onClickSubmit = ()=>{
        if(everyName === "" ||everydescription===""){
            return message.error("설명과 세부사항을 입력해주세요.")
        }
    

        axios.post('/api/everyDay/save',{serialNum:serialNum,description:everydescription,owner:localUserInfo.userId}).then((res)=>{
            console.log(res)
            if(res.data.success){
                setserialState ("success")
                message.success("기기 등록 성공.")
                
            }
            else{
                setserialState("error")
                message.error("유효하지 않은 시리얼 번호입니다.")
            }
        })
    }

    return (
        <div className="site-layout-background" style={{marginTop: 64, padding: "15%",paddingTop: "5%", minHeight: 380 }}>
         

         <div style ={{display:"flex" }}>

            <div >

            
             <Card
            style={{ width: 300 }}
             cover={
                  <img
                   alt="example"
                  src={process.env.PUBLIC_URL+'/images/everyday_card.png'}
                    />
                 }
                 actions={[
                    <Tooltip title="알람설정 하기">
                         <BellOutlined key="setting"onClick ={onSettingClickHandler} />
                        </Tooltip>
                ,
                <Tooltip title="기기 설정 하기">
                 <EditOutlined key="edit" onClick ={onEditInfoHandler}  />
                 </Tooltip>,
                 <Tooltip title="알람 정보 보기">
                <InfoOutlined key="ellipsis" onClick ={onCalenderInfoHandler}/>
                </Tooltip>,
                 ]}
                 >
             <Meta
                 
                     title="내 매일이"
                 description="할머니네 집"
                 />
             </Card>
            </div >

             {Edit && 
             <div style ={{flexGrow:"1"}}>
                <Setalarm everyDayId={everyDayId} userId={localUserInfo.userId} />
             </div>
              } 
             {ShowCalender && 
                <div style ={{flexGrow:"1"}}>
                   <CalenderInfo everyDayId={everyDayId}/>
                </div>
             }
             {EditEveryday && 
                <div style ={{flexGrow:"1"}}>
                   <Form.Item label="시리얼 넘버" hasFeedback validateStatus={serialState}>
                       <Input onChange={onserialInputChange} value={serialNum} disabled={stable} placeholder="시리얼정보를 입력해주세요"  />
                     
                  </Form.Item>
                  <Button onClick ={onClickSerialNumHandler}>확인하기</Button>
                  <Form.Item label="매일이 이름"  >
                       <Input onChange={onChangeSerialNum} value={everyName} placeholder="이름을 입력해주세요"  />
                     
                  </Form.Item>
                  <Form.Item label="세부사항" >
                       <Input onChange={onChangedescription} value={everydescription} placeholder="설명을 입력해주세요"  />
                     
                  </Form.Item>
                  <Button onClick ={onClickSubmit}>등록하기</Button>
                </div>
             }
         </div>


             


      </div>
    )
}

export default withRouter(ManagePage)

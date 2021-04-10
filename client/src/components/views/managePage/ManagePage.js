import React ,{useState}from 'react'

import { withRouter } from 'react-router-dom';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Setalarm from "./Setalarm"
import CalenderInfo from "./CalenderInfo"
import { Card, Avatar,Tooltip }  from 'antd';
import { EditOutlined, InfoOutlined, BellOutlined } from '@ant-design/icons';


const { Meta } = Card;

  

  function ManagePage() {
      
    const [ShowCalender, setShowCalender] = useState(false)
    const [Edit, setEdit] = useState(false)
    
    const onCalenderInfoHandler = ()=>{
    
        setEdit(false)
        setShowCalender(!ShowCalender);
        
    }
   
  
    
    const onSettingClickHandler = ()=>{
        setShowCalender(false)
        setEdit(!Edit);
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
                 <EditOutlined key="edit"  />
                 </Tooltip>,
                 <Tooltip title="기기 정보 보기">
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
                <Setalarm />
             </div>
              } 
             {ShowCalender && 
                <div style ={{flexGrow:"1"}}>
                   <CalenderInfo />
                </div>
             }
         </div>


             


      </div>
    )
}

export default withRouter(ManagePage)

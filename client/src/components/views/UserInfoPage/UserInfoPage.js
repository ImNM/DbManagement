import React, { useEffect,useState } from 'react'
import { Descriptions, Badge, Tooltip } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined ,EditOutlined} from '@ant-design/icons';
import axios from 'axios';
import user_reducer from '../../../_reducers/user_reducer';


function UserInfoPage() {
    var localUserInfo  = JSON.parse(localStorage.getItem("Auth"));
    const [UserInfo, setUserInfo] = useState([]);
    const [Edit, setEdit] = useState(false)

    useEffect(() => {
        axios.post('/api/users/info',{localUserInfo})
        .then(res =>{
            if(res.data.success){
                console.log(res.data);
                setUserInfo(res.data.UserInfo);
            }
            else{
                alert("유저정보를 불러오는데 실패했습니다.");
            }
        })
    }, [])


    const onHandlerClick = ()=>{
        setEdit(!Edit)
    }

    return (
        <div style= {{marginTop: 64, padding : '15% ',paddingTop : '5%'}}>
               
              <Descriptions title="회원 정보" bordered>
            
                <Descriptions.Item label="닉네임" span={2}>{UserInfo.name}</Descriptions.Item>
                <Descriptions.Item label="가입 경로" span={1}>{UserInfo.provider ? "카카오" : "로컬"}</Descriptions.Item>
                <Descriptions.Item label="이메일" span={2} >{UserInfo.email}</Descriptions.Item>
                <Descriptions.Item label="아바타">
                {UserInfo.avatar ? 
                  <Avatar size="small"  src={UserInfo.avatar} />
                : <Avatar size="small"  icon={<UserOutlined />} />
                }
          </Descriptions.Item>
         
          
    <Descriptions.Item label="연결된 기기" span={5}><Badge status="error" text="연결된 기기없음"/></Descriptions.Item>
    <Descriptions.Item label={
        <div>
            의학정보 태그
            <Tooltip title ="태그 수정하기" >
             <EditOutlined onClick={onHandlerClick} />   
            </Tooltip>
        </div>}  span={5}>
   
   
   Data disk type: MongoDB
   <br />
   Database version: 3.4
   <br />
   Package: dds.mongo.mid
   <br />
   Storage space: 10 GB
   <br />
   Replication factor: 3
   <br />
   Region: East China 1<br />
 </Descriptions.Item>
    


  </Descriptions>
                    {Edit &&
                    
                    <div>정보수정</div>
                    }

        </div>
    )
}

export default UserInfoPage
/*
 

*/
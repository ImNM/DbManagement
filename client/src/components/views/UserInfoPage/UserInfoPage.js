import React, { useEffect,useState } from 'react'
import { Descriptions, Badge, Tooltip, Button ,Popconfirm} from 'antd';
import { Avatar } from 'antd';
import { UserOutlined ,EditOutlined} from '@ant-design/icons';
import axios from 'axios';


import { Tag } from 'antd';

const tagsData = ['치매', '당뇨병', '건강', 'Movies','Books','투','쓰리','포'];

const { CheckableTag } = Tag;



function UserInfoPage() {
    const localUserInfo  = JSON.parse(localStorage.getItem("Auth"));
    const [UserInfo, setUserInfo] = useState([]);
    const [Edit, setEdit] = useState(false)
    const [selectedTags, setselectedTags] = useState([])

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
  
    const showPopconfirm = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
      setConfirmLoading(true);
      console.log(selectedTags)
      axios.post('/api/users/tags',{localUserInfo:localUserInfo,selectedTags:selectedTags}).then((res)=>{
          if(res.data.success){
            setVisible(false);
            setConfirmLoading(false);
          }
          else{
              alert("태그정보 저장 실패")
              setConfirmLoading(false);
          }
      })
    };
  
    const handleCancel = () => {
      setVisible(false);
      setConfirmLoading(false);
    };


    useEffect(() => {
        axios.post('/api/users/info',{localUserInfo})
        .then(res =>{
            if(res.data.success){
                setUserInfo(res.data.UserInfo);
                setselectedTags( res.data.UserInfo.tag)
                console.log()


                
            }
            else{
                alert("유저정보를 불러오는데 실패했습니다.");
            }
        })

    
    
    }, [])

    const handleChange=(tag, checked)=> {
       
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setselectedTags(nextSelectedTags );
      }
    
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
       
        
      
      
   
            {Object.values(selectedTags).map((tag,index)=>(
                    <div key = {index}>{tag}
                    <br/></div>
                ))}

 </Descriptions.Item>
  </Descriptions>




                    {Edit &&
                    <div style={{padding:'5%'}}>
                                <span style={{ marginRight: 8 }}>의학정보 태그:</span>
                             {tagsData.map(tag => (
                               <CheckableTag
                                key={tag}
                               checked={selectedTags.indexOf(tag) > -1}
                               onChange={checked => handleChange(tag, checked)}
                                  >
                               {tag}
                             </CheckableTag>

                             
                    ))}
                     <Popconfirm
                          title="저장 확인"
                         visible={visible}
                          onConfirm={handleOk}
                         okButtonProps={{ loading: confirmLoading }}
                           onCancel={handleCancel}
                          >
                       <Button type="primary" onClick={showPopconfirm}>
                              저장하기
                         </Button>
                   </Popconfirm>
                   
                    </div>
                    }
        </div>
    )
}

export default UserInfoPage

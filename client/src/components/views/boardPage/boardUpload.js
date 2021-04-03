import React, { useState } from 'react'
import CKEditor from 'ckeditor4-react'
import { Layout} from 'antd';
import axios from 'axios';
import {withRouter} from'react-router-dom';
import { useSelector } from 'react-redux';

const { Content } = Layout;
function BoardUpload(props) {
    const userInfo= useSelector(state=> state.user.isAuth);
    

     const [content , setContent] = useState("");

     const onChangeEditHandler = (e) =>{
        setContent(
           e.editor.getData()
        )
        console.log(content)
    } 

    const OnClickSubmitBoard = () =>{
        const body = {
            writerId : userInfo._id,
            title : "제목임ㅋㅋ",
            content : content,
            writerName : userInfo.name
        }
        axios.post('/api/board/upload',{body})
        .then(response => {//오류코드 추가해야햄
            console.log(response);
              props.history.push('/board');
        });
    } 


    return (
        <div>
        <Layout>
        <Content className="site-layout" style={{ padding: '0 0px', marginTop: 64 }}>
        <CKEditor
            data = {content}
            onChange = {onChangeEditHandler}
        />
              <button onClick = {OnClickSubmitBoard}>글 올리기</button>
        </Content>
      </Layout>
  
        </div>
        
    )
}

export default withRouter(BoardUpload)

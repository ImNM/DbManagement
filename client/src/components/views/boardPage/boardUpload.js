import React, { useState } from 'react'
import CKEditor from 'ckeditor4-react'
import { Layout,Input,Button} from 'antd';
import axios from 'axios';
import {withRouter} from'react-router-dom';
import { useSelector } from 'react-redux';
import {tagNum} from '../../../utils/tagNum'
import { Tag } from 'antd';

const { CheckableTag } = Tag;
const tagsData = ['치매', '당뇨병', '건강', 'Movies','Books','투','쓰리','포'];


const { Content } = Layout;
function BoardUpload(props) {
    const userInfo= useSelector(state=> state.user.isAuth);
   
    

     const [content , setContent] = useState("");
     const [title , settitle] = useState("");
     const [selectedTags, setselectedTags] = useState([])


     const onChangeEditHandler = (e) =>{
        setContent(
           e.editor.getData()
        )
       // console.log(content)
    } 
    const onChangeTitleHandler = (e) =>{
        settitle(e.target.value);
    } 

    const OnClickSubmitBoard = () =>{
        if(title == '' || content == ''){
            return alert("제목과 내용 입력해 주세요.")
        }
        if(selectedTags ==''){
            return alert("태그를 입력해 주세요")
        }
        const body = {
            writerId : userInfo._id,
            title : title,
            content : content,
            writerName : userInfo.name,
            tag : selectedTags.toString()
        }
        axios.post('/api/board/upload',{body})
        .then(response => {//오류코드 추가해야햄
            console.log(response);
              props.history.push('/board');
        });
    } 

    const handleChange=(tag, checked)=> {
       
        const nextSelectedTags = checked ? [ tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setselectedTags(nextSelectedTags );
      }
    


    return (
        <div>
        <Layout>
        <Content className="site-layout" style={{ padding: '60px', marginTop: 64 }}>
        <Button onClick = {OnClickSubmitBoard}>글 올리기</Button>
        <Input 
            placeholder="제목을 입력해 주세요"
            onChange = {onChangeTitleHandler} 
        />
        <CKEditor
            data = {content}
            onChange = {onChangeEditHandler}
        />
        <p>태그를 선택해주세요</p>
        {tagNum.map(tag => (
                               <CheckableTag
                                key={tag._id}
                               checked={selectedTags.indexOf(tag.name) > -1}
                               onChange={checked => handleChange(tag.name, checked)}
                                  >
                               {tag.name}
                             </CheckableTag>
        ))}
              
        </Content>
      </Layout>
  
        </div>
        
    )
}

export default withRouter(BoardUpload)

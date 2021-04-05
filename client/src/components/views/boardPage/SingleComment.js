import React,{useState} from 'react'
import {Comment,Avatar,Button,Input} from 'antd';
import {withRouter} from'react-router-dom';
import user_reducer from '../../../_reducers/user_reducer';
import { useSelector } from 'react-redux';
import axios from 'axios';

const {TextArea} = Input;
function SingleComment(props) {
    console.log("single",props.comment)
    const user = useSelector(state => state.user.isAuth);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const onClickReplyOpen = () =>{
        setOpenReply(!OpenReply);
    }
    const onHandleChange = (event)=>{
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit =(event)=> {
        event.preventDefault();

        const variables = {
            content : CommentValue,
            writer: user._id,
            postId: props.boardId,
           responseTo: props.comment._id,
        }

        axios.post('/api/comment/saveComment',variables)
        .then(response =>{
            if(response.data.success){
                //console.log(response.data.result)
                props.refreshFunction(response.data.result)
               // setcommentValue("")
               setOpenReply(false);
            }
            else{
                alert('대댓글을 저장하지 못했습니다.')
            }
        })

    }

  

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">댓글 달기</span>
    ]


    return (
        <div>
            <Comment 
                actions={actions}
                author ={props.comment.writer.name}
                avatar = {<Avatar src={props.comment.writer.avatar} />}
                content = {<p>{props.comment.content}</p>}
                />
                {OpenReply &&   
                <form style={{display:'flex'}} onSubmit={onSubmit}>
                    <textarea
                    style={{width:'100%',borderRadius: '5px'}}
                    onChange = {onHandleChange} 
                    value = {CommentValue}
                    placeholder="댓글을 작성해 주세요"
                 />
                <br/>
                    <button style={{width:"20%",height:'52px'}} onClick={onSubmit}>submit</button>
                </form>
            }

            
        </div>
    )
}

export default withRouter(SingleComment)

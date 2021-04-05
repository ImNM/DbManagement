import React ,{useState}from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import axios from 'axios';
import {withRouter} from'react-router-dom';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';



function CommentComponent(props) {

    console.log("propscommentlist",props.commentLists)
    const user = useSelector(state => state.user.isAuth);
    const boardId = props.location.search.split("=")[1];

    const [commentValue, setcommentValue] = useState("");
    const handleClick= (event) => {
        setcommentValue(event.currentTarget.value);
    }
    const onSubmit = (event)=>{
        event.preventDefault();

        const variable = {
            content: commentValue,
            writer:user._id ,
            boardId: boardId,
        }
       // console.log(variable)


        axios.post('/api/comment/saveComment',variable)
        .then(response => {
            if(response.data.success){
                //console.log("test",response.data)
                props.refreshFunction(response.data.result)
                setcommentValue("")
            }else{
                alert('댓글을 전송하지 못했습니다.')
            }
        })
    }


    return (
       
        <div style = {{padding : '20px'}}>


        {props.commentLists && props.commentLists.map((comment, index)=>(
            <React.Fragment>
                 <SingleComment refreshFunction={props.refreshFunction} comment={comment} boardId = {boardId} key={comment._id}/>
                <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} boardId = {boardId} commentLists={props.commentLists} key={comment._id}/>

            </React.Fragment>
           
        ))}
        
     
        <form style={{display:'flex'}} onSubmit={onSubmit}>
            <textarea
                style={{width:'100%',borderRadius: '5px'}}
                onChange = {handleClick}
                value = {commentValue}
                placeholder="댓글을 작성해 주세요"
            />
            <br/>
            <button style={{width:"20%",height:'52px'}} onClick = {onSubmit}>submit</button>
        </form>

        </div>
    )
}

export default withRouter(CommentComponent)

import React,{useState, useEffect } from 'react'
import SingleComment from './SingleComment'
import {withRouter} from'react-router-dom';

//부모 댓글의 responseTo가 일치하는 댓글 밑에 생성이 되어야함
function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment)=>{
            if(comment.responseTo === props.parentCommentId){
                commentNumber++;
            } 
            setChildCommentNumber(commentNumber);
        })
    }, [props.commentLists])


    const renderReplyComment =(parentCommentId) =>

    props.commentLists.map((comment, index)=>(
        <React.Fragment>

            { comment.responseTo === parentCommentId &&
            <div style = {{width:"80%",marginLeft:'40px'}}>
                       <SingleComment refreshFunction={props.refreshFunction} comment={comment} boardId = {props.boardId} key={comment._id}/>
                      <ReplyComment  refreshFunction={props.refreshFunction}commentLists={props.commentLists} boardId = {props.boardId} parentCommentId={comment._id} key={comment._id}/>
            </div>
            }
           
        </React.Fragment>
    ))

    const onHandleChange = () =>{
        setOpenReplyComments(!OpenReplyComments);
    }


    return (
        <div>
            {ChildCommentNumber>0 &&
                     <p style={{fontSize:'14px',margin:0,color:'gray'}} onClick={onHandleChange}>대댓글 보기({ChildCommentNumber})</p>
                    
            }
            {OpenReplyComments&&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default withRouter(ReplyComment)

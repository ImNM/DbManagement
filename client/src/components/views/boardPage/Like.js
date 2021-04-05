import React, { useEffect,useState } from 'react'
import {Tooltip} from 'antd';
import { LikeOutlined , LikeFilled } from '@ant-design/icons';
import axios from 'axios';


function Like(props) {

    let variable = {};

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(false)

    variable = {boardId : props.boardId, userId: props.userId }
   
    useEffect(()=>{
            axios.post('/api/like/getLikes',variable)
            .then(res =>{
                if(res.data.success){
                    console.log(res.data.likes)

                    //얼마나 많은 좋아요를 받았는지,.,.,.,?
                    setLikes(res.data.likes.length);

                    res.data.likes.map(like =>{
                        if(like.userId === props.userId){
                            setLikeAction(true)

                        }
                    })
                    // 유저가 이미 좋아요를 눌렀는지.
                }else{
                    alert('좋아요 정보 가져오지 못함 ㅠ')
                }
            })

    },[])


    const onLike =() =>{

        if(LikeAction === false){
            axios.post('/api/like/upLike',variable)
            .then(res =>{
                if(res.data.success){
                    console.log("up",res.data.success)
                    setLikeAction(true)
                    setLikes(Likes+1)
                }else{
                    alert("좋아요 기능 오류")

                }

            })
        }
    }

    const onDisLike =() =>{

        if(LikeAction === true){
            axios.post('/api/like/disLike',variable)
            .then(res =>{
                if(res.data.success){
                    console.log("dislike",res.data.success)

                    setLikeAction(false)
                    setLikes(Likes-1)
                }else{
                    alert("좋아요 기능 오류")

                }

            })
        }
    }


    return (
        <div style={{paddingRight: " 8px"}}>
            <span key = "comment-basic-like">
                <Tooltip title ="Like">
                {
                    LikeAction ?  
                    <LikeFilled
                    onClick ={onDisLike}
                  />
                    
                    :
                    <LikeOutlined
                    onClick= {onLike}
                  />
                    
                }
                   
                </Tooltip>
                <span style={{paddingLeft: " 8px", cursor:"auto"}}>{Likes}</span>
            </span>
        </div>
    )
}

export default Like

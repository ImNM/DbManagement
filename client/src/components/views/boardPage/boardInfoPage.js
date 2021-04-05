import React ,{ useEffect, useState }from 'react'
import {withRouter} from'react-router-dom';
import axios from 'axios';
import { Layout ,Breadcrumb,Avatar} from 'antd';
import { Divider } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { UserOutlined,DeleteOutlined } from '@ant-design/icons';
import CommentComponent from './Comment'
import Like from './Like'
import { useSelector } from 'react-redux';


const { Content } = Layout;

function BoardInfoPage(props) {

    const boardId = props.location.search.split("=")[1];
    var userInfo  = JSON.parse(localStorage.getItem("Auth"));

    console.log("idididididid",userInfo.userId);
   
    
    const [board,setboard] = useState([]);
    const [avatar,setavatar] = useState("");
    const [boardDate,setboardDate] = useState([])
    const [Comments, setComments] = useState([])
    const [deleteOk,setdeleteOk] = useState(false);
    
  

    useEffect(() => {
      
    //  
     
        console.log(boardId)
        axios.get('/api/board/pageInfo?key='+boardId).then(res=>{
            console.log(res.data)
            setboard (res.data.boardList)
            if(res.data.boardList.writerId == userInfo.userId){
              setdeleteOk(true);
            }
            const date = new Date(res.data.boardList.createdAt);
            setavatar(res.data.avatar)
          return date;
        }).then((date)=>{
               var list =[]
              for(var i=3;i>=0 ; i--){
                   list.push(date.toString().split(' ')[i])
              }
             setboardDate (list);

              axios.post('/api/comment/getComments',{boardId})
                .then( res =>{
                    if(res.data){
                        setComments(res.data.comments)
                       // console.log(Comments)
                    }else{
                        alert("댓글 정보 불러오기 실패 하였습니다.")
                    }
         })
        })

       
    }, [])

    const refreshFunction = (newComment) =>{
      console.log("refreshFunction",Comments)
        setComments(Comments.concat(newComment))
    }

    const onHandlerDeleteBoard = ()=>{
      const localUserInfo = JSON.parse(localStorage.getItem("Auth"));

      if(window.confirm("게시글을 지우시겠습니까?")){
        axios.post('/api/board/delete?key='+boardId,{localUserInfo}).then(res =>{
          if(res.data.success){
            console.log("success to delet board")
            props.history.push("/board"); 
  
  
          }
          else{
            alert("게시글 지우기를 실패했습니다.")
          }
        })
      }
      


    }


    return (
        <Layout>
        <Content className="site-layout" style={{ padding: '30px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href = '/board'>의학정보 게시판</Breadcrumb.Item>
        
        <Breadcrumb.Item>{board.title}</Breadcrumb.Item>
      </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 0, minHeight: 380 }}>
         
             <div className="site-layout-background" style={{ display : "flex",flexDirection:"row" ,padding: '2%', alignItems : "center" }}>
             {(avatar === "") ?   
                <Avatar icon={<UserOutlined />}/>
              : <Avatar src={avatar} /> }

             <h1 style ={{marginBottom : "0" , marginLeft : "1%" }}>{board.writerName}</h1>
             <div style = {{  display : "flex",flexDirection:"row",marginLeft : "auto"}}>
             <Like   userId={userInfo.userId} boardId={boardId} />
             <a style={{cursor:"default"  , marginRight : "8px"}}> {boardDate[0]}.{boardDate[2]}.{boardDate[1]} </a> 
             {deleteOk &&
               <DeleteOutlined style = {{fontSize : "20px"}} onClick ={onHandlerDeleteBoard}/>
             }

           
             </div>
            
             
             </div>
             <div>
             <Divider style = {{margin : '0'}}></Divider>
                          <div className="site-layout-background" style={{ padding: '30px', minHeight: 380 }}>
                         <h1>{board.title}</h1>
                              <div className="site-layout-background" style={{ padding: '30px', minHeight: 380 }}>
                                     {ReactHtmlParser(board.content)}
                                </div>

                                <Divider style = {{margin : '0'}}>댓글</Divider>
                                  <CommentComponent refreshFunction={refreshFunction} commentLists = {Comments}/>

                         </div>
            </div>
            
         
          </div>
        </Content>
      </Layout>
    )
}

export default withRouter(BoardInfoPage)

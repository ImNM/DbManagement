import React ,{ useEffect, useState }from 'react'
import {withRouter} from'react-router-dom';
import axios from 'axios';
import { Layout ,Breadcrumb,Avatar} from 'antd';
import { Divider } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { UserOutlined } from '@ant-design/icons';
import CommentComponent from './Comment'
const { Content } = Layout;

function BoardInfoPage(props) {

    const boardId = props.location.search.split("=")[1];
    //console.log(queryId);
    const [board,setboard] = useState([]);
    const [avatar,setavatar] = useState("");
    const [boardDate,setboardDate] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {
        console.log(boardId)
        axios.get('/api/board/pageInfo?key='+boardId).then(res=>{
            console.log(res.data)
            setboard (res.data.boardList)
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
             <a style={{cursor:"default" , marginLeft : "auto"}}> {boardDate[0]}.{boardDate[2]}.{boardDate[1]} </a> 
             
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

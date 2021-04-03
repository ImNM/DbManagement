import React ,{ useEffect, useState }from 'react'
import {withRouter} from'react-router-dom';
import axios from 'axios';
import { Layout ,Breadcrumb} from 'antd';
import { Divider } from 'antd';
import ReactHtmlParser from 'react-html-parser';

const { Content } = Layout;

function BoardInfoPage(props) {

    const queryId = props.location.search.split("=")[1];
    console.log(queryId);
    const [board,setboard] = useState([]);


    useEffect(() => {
        axios.get('/api/board/pageInfo?key='+queryId).then(res=>{
            console.log(res.data.boardList[0])
            setboard (res.data.boardList[0])

        })



    }, [])


    return (
        <Layout>
        <Content className="site-layout" style={{ padding: '30px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href = '/board'>의학정보 게시판</Breadcrumb.Item>
        
        <Breadcrumb.Item>{board.title}</Breadcrumb.Item>
      </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 0, minHeight: 380 }}>
         
             <div className="site-layout-background" style={{ padding: '60px', minHeight: 380 }}>
             <h1>{board.writerName}</h1>


             <Divider></Divider>
                          <div className="site-layout-background" style={{ padding: '30px', minHeight: 380 }}>
                         <h1>{board.title}</h1>
                              <div className="site-layout-background" style={{ padding: '30px', minHeight: 380 }}>
                                     {ReactHtmlParser(board.content)}
                                </div>
                         </div>
            </div>
         
          </div>
        </Content>
      </Layout>
    )
}

export default withRouter(BoardInfoPage)

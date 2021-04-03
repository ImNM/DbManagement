import React, { useEffect, useState } from 'react'
import { Layout} from 'antd';
import {withRouter} from'react-router-dom';
import axios from 'axios';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined ,EyeOutlined } from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser';

const { Content } = Layout;



var listData = [];
const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );


function BoardPage(props) {
    const [pageCount, setPageCount] = useState(0);
    const [pageData , setPageData] = useState([]);
    useEffect(() => {
        axios.get('/api/board/page').then(res=>{
            //setPageCount(res.data);
            console.log("document : ", res.data.boardList)

            const boardList = res.data.boardList;
            //listData = boardList;
            
            for (let i = 0; i < boardList.length ; i++) {
                var contentString = ReactHtmlParser(boardList[i].content)
                console.log()
                listData.push({
                key : `${i}`,
                href: '/boardInfo?key='+boardList[i]._id,
                title: `${boardList[i].title}`,
                //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description:
                `${boardList[i].writerName}`,
                content:
                contentString[0].props.children[0].toString().substring(0,100),  //content 내용 잘라오기.
                like:
                `${boardList[i].like}`,
                views:
                `${boardList[i].views}`,
                comment:
                `${boardList[i].comment}`,
                });
            }
            setPageData(
                listData
            )
            listData =[];
            
        }).then(()=>{
            console.log("after then");
        })


    },[])
    const onClickboardUpload = () =>{
        props.history.push("/boardUpload"); 
    } 
    return (
        <Content className="site-layout" style={{ padding: '30 30px', marginTop: 64 }}>
            <div style={{ padding: '20%',paddingTop: '5%',paddingBottom: '10%', marginTop: 64 }}>

            <List 
        itemLayout="vertical"
        size="large"
            pagination={{
                   onChange: page => {
                    console.log(page);
                 },
                  pageSize: 5,
            }}
            dataSource={listData}
            footer={
                  <div>
                        <b>매일이 의학정보 게시판</b> 
                  </div>
             }
             renderItem={item => (
      <List.Item
        key={item.key}
        actions={[
          <IconText icon={EyeOutlined} text={item.views} key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text={item.comment} key="list-vertical-message" />,
        ]}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
            </div>
  
         <button onClick = {onClickboardUpload}>글올리기 </button>
        </Content>
    )
}

export default withRouter(BoardPage) 

import React, { useEffect, useState } from 'react'
import { Layout} from 'antd';
import {withRouter} from'react-router-dom';
import axios from 'axios';
import { List, Avatar, Space,Divider ,Button} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined ,EyeOutlined,TagOutlined } from '@ant-design/icons';
import ReactHtmlParser from 'react-html-parser';
import CheckBox from './CheckTagBox'
import {tagNum} from '../../../utils/tagNum'
const { Content } = Layout;


var userTagList = [];
var listData = [];
const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );


function BoardPage(props) {
  const localUserInfo  = JSON.parse(localStorage.getItem("Auth"));
    const [pageData , setPageData] = useState([]);
    const [savepageData , setsavePageData] = useState([]);
    const [Filters, setFilters] = useState([])

    useEffect(() => {
        axios.get('/api/board/page').then(res=>{
            //setPageCount(res.data);
            console.log("document : ", res.data)

            const boardList = res.data.boardList;
            //listData = boardList;
            
            for (let i = boardList.length -1; i >=0  ; i--) {

              //filters 정보에 따라서 걸러 주면 되는거임 여기서

                var contentString = ReactHtmlParser(boardList[i].content)
                console.log()
                listData.push({
                key : `${i}`,
                href: '/boardInfo?key='+boardList[i]._id,
                title: `${boardList[i].title}`,
                avatar: `${res.data.avatarList[i]}`,
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
                tag :
                `${boardList[i].tag}`
                });
            }

            setPageData(listData)
            setsavePageData(listData)
            console.log(listData)
          
            
        }).then(()=>{
            console.log("after then");

            axios.post('/api/users/Info',{localUserInfo}).then((res)=>{
              if(res.data.success){
                const userTag = res.data.UserInfo.tag;
                console.log(userTag)
              
                for(var i=0;i<userTag.length;i++){
                  userTagList.push(tagNum.find(tag=>tag.name===userTag[i])._id) 
                } 
                console.log("현재 필터 상태",Filters)
                //setFilters(userTagList);
                handleFilters(userTagList)
                
              }
            })
        })


    },[])


    const onClickboardUpload = () =>{
        props.history.push("/boardUpload"); 
    } 
    
    const handleFilters = (filters)=>{
      console.log(filters)
        var newFilters ={...Filters}
        newFilters = filters;
        setFilters(newFilters);
        showFilteredResults(newFilters);
        console.log("현재 필터 상태",Filters)
    }

    const showFilteredResults = (newFilters)=>{
        var newfirstBoardList = [];
        var newLastBoardList = [];
        if(newFilters.length === 0){
          console.log("0")
          return setPageData(listData)
        }
        console.log(pageData)
        listData.map((board,index)=>{
            var state = false;
            for(var i=0;i<newFilters.length;i++){
              const findtag = tagNum.find(tag=>tag.name===board.tag);

              if(newFilters[i]===findtag["_id"]){
                state =true;
               return newfirstBoardList.push(board);
              }
            }
            if(!state)
            return newLastBoardList.push(board);
        })
           const newarray = newfirstBoardList.concat(newLastBoardList);
          console.log(newarray)
          setPageData(newarray);

    }

    return (
        <Content className="site-layout" style={{ padding: '30 30px', marginTop: 64 }}>
            <div style={{ padding: '20%',paddingTop: '5%',paddingBottom: '10%', marginTop: 64 }}>
            <Button onClick = {onClickboardUpload}>글 작성하기 </Button>
            <Divider>의학 정보 게시판</Divider>
            <CheckBox 
              handleFilters = {filters => handleFilters(filters)}
              filter = {userTagList}
            />
            <List 
        itemLayout="vertical"
        size="large"
            pagination={{
                   onChange: page => {
                    console.log(page);
                 },
                  pageSize: 5,
            }}
            dataSource={pageData}
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
          <IconText icon={TagOutlined} text={item.tag} key="list-vertical-TagOutlined" />,
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
  
        
        </Content>
    )
}

export default withRouter(BoardPage) 

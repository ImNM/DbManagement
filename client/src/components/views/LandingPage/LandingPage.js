import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';



import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;



//router dom써야 props 사용가능?
function LandingPage(props) {
    const userInfo= useSelector(state=> state.user.isAuth);
    console.log(userInfo);
    var isAuth ;
    if(!userInfo){
        isAuth =false;
    }else{
        isAuth = userInfo.isAuth;
    }

    const onClicklogoutHandler = () =>{
        const localUserInfo = JSON.parse(localStorage.getItem("Auth"));
        axios.post('/api/users/logout',{localUserInfo})
        .then(res => {
            if(res.data.success){
                window.location.reload(false);
            }
            else{
                alert('로그아웃 실패다.');
            }
        })
        localStorage.removeItem("Auth");
        isAuth=false;

    }
    const onClickloginHandler = () =>{
        props.history.push("/login"); 
    }
    const onClickregisterHandler = () =>{
        props.history.push("/register"); 
    } 
    return (
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <a style = {{display:'flex',float:'left'}}>똑똑한, 투약 도우미 매일이</a>
                <div style={{ display:'flex', float:'right' }}>

                <div>
                    {isAuth ? 
                    <div style={{display:'flex'}}>
                     <a > {userInfo.name}님! 안녕하세요</a>
                   <Menu theme="dark" mode="horizontal">
                      <Menu.Item key="1" onClick = {onClicklogoutHandler}>로그아웃</Menu.Item>
                  </Menu>
                </div>
                     : <div>
                     <Menu theme="dark" mode="horizontal">
                     <Menu.Item key="1" onClick = {onClickloginHandler}>로그인</Menu.Item>
                     <Menu.Item key="2" onClick = {onClickregisterHandler}>회원가입</Menu.Item>
                     <Menu.Item key="3">about us</Menu.Item>
                     </Menu>
                      </div>
                   }
                </div>
                </div>
        </Header>

    <Content className="site-layout" style={{ padding: '0 0px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 0, minHeight: 380 }}>

            <div style = {{display:'flex',justifyContent:'center'}}>
                <img  src={process.env.PUBLIC_URL+'/images/매일이2.jpeg' } />
            </div>
      
      </div>
    </Content>

    <Footer style={{  textAlign: 'center' }}>매일이 ©2021 Created by 아리아리</Footer>

  </Layout>
    )
}

export default withRouter(LandingPage);

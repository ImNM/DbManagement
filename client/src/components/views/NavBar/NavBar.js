import React from 'react'
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import axios from 'axios'
import {withRouter} from'react-router-dom';

const { Header } = Layout;


function NavBar(props) {

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
    const onClickHomeHandler = () =>{
        props.history.push("/"); 
    } 
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <a style = {{display:'flex',float:'left'}} onClick={onClickHomeHandler}>똑똑한, 투약 도우미 매일이</a>
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
        </Layout>
    )
}

export default withRouter(NavBar)

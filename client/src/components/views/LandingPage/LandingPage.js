import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


//router dom써야 props 사용가능?
function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {console.log(response.data)})
    }, []);

    const onClicklogoutHandler = () =>{
        const localUserInfo = JSON.parse(localStorage.getItem("Auth"));
        axios.post('/api/users/logout',{localUserInfo})
        .then(res => {
            if(res.data.success){
                props.history.push("/login");
            }
            else{
                alert('로그아웃 실패다.');
            }
        })
        localStorage.removeItem("Auth");


    }
    const onClickloginHandler = () =>{
        props.history.push("/login"); 
    }
    const onClickregisterHandler = () =>{
        props.history.push("/register"); 
    }
    const onClickkakaologinHandler = () =>{
        axios.get('/api/users/oauth/kakao')
        .then(res =>{
            console.log(res);
        })
    }  
    const onclickevent= () =>{
        console.log("hihi");
    }

    return (
        <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <div style={{ display:'flex', float:'right' }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1" onClick = {onclickevent}>로그인</Menu.Item>
        <Menu.Item key="2">회원가입</Menu.Item>
        <Menu.Item key="3">about us</Menu.Item>
      </Menu>
      </div>
    </Header>

    <Content className="site-layout" style={{ padding: '0 0px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <img src={process.env.PUBLIC_URL+'/images/매일이.jpeg' } />
      </div>
    </Content>

    <Footer style={{ textAlign: 'center' }}>매일이 ©2021 Created by 아리아리</Footer>
  </Layout>
  //mountNode,
  /*
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh'
        }}>




            <h2> 시작 페이지 </h2>
            <button onClick={onClicklogoutHandler}>
                logout
            </button>
            <button onClick={onClickloginHandler}>
                login
            </button>
            <button onClick={onClickregisterHandler}>
                register
            </button>
        </div>*/
    )
}

export default withRouter(LandingPage);

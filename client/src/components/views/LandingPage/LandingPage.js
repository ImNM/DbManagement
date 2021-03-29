import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from'react-router-dom';
import { useSelector } from 'react-redux';



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
   
   // console.log(isAuth);
    useEffect(() => {
       
    }, []);

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
    const onClickkakaologinHandler = () =>{
        axios.get('/api/users/oauth/kakao')
        .then(res =>{
            console.log(res);
        })
    }  
    const onclickevent= () =>{
        console.log("hihi");
    }
    console.log("isaut?",isAuth);
    return (
        <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <a style = {{display:'flex'}}>매일이</a>
    <div style={{ display:'flex', float:'right' }}>

      <div>
      {isAuth
      
        ? <div>
            <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" onClick = {onClicklogoutHandler}>로그아웃</Menu.Item>
            </Menu>
         </div>
       
        :   <div>
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

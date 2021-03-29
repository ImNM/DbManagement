import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from'react-router-dom';

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
   
    return (
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
        </div>
    )
}

export default withRouter(LandingPage);

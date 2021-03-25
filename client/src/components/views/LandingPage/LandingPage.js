import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from'react-router-dom';
//router dom써야 props 사용가능?
function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => {console.log(response.data)})
    }, []);

    const onClickHandler = () =>{
        axios.get('/api/users/logout')
        .then(res => {
            if(res.data.success){
                props.history.push("/login");
            }
            else{
                alert('로그아웃 실패다.');
            }
        })
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh'
        }}>
            <h2> 시작 페이지 </h2>
            <button onClick={onClickHandler}>
                logout
            </button>
        </div>
    )
}

export default withRouter(LandingPage);

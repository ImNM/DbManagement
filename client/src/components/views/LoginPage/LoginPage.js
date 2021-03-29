import axios from 'axios';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action.js';
import {withRouter} from'react-router-dom';
import KakaoLogin from 'react-kakao-login';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(res => {
            console.log(res.payload);
            console.log(res.payload.loginSucces);
            if(res.payload.loginSucces){
                props.history.push('/');
            }else{
                alert('ERROR');
            }
        })
    }
    const javatoken = '39fc87a51dc30c1623a74a70104112da'; 
    const onkakaoLoginSuccesshandler = (data)=>{
        console.log(data.response.access_token);
        axios.post('/api/users/oauth/kakao/login',{accessToken : data.response.access_token})
        .then(response => {//오류코드 추가해야햄
            console.log();
            localStorage.setItem(
                "Auth",
                JSON.stringify({ token : response.data.token , name : response.data.name })
              );
              props.history.push('/');
        });
    }
  

    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh' , flexDirection: 'column'
        }}>

            
            <form style = {{display:'flex',flexDirection:'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value = {Email} onChange = {onEmailHandler} />
                <label>Password</label>
                <input type = "password" value ={Password} onChange = {onPasswordHandler}/>
                <br />
                <button>
                    Login
                </button>
                <br/>
            </form>

            <KakaoLogin
            token={javatoken}
           onSuccess={onkakaoLoginSuccesshandler}
             onFail={console.error}
           onLogout={console.info}
           useLoginForm
             />
        </div>
    )
}

export default withRouter(LoginPage);




//--------------------------------------------------------------------------------
// 추가할것 formik & yup  make your system dynamic
// 2021-03-24 20시
//--------------------------------------------------------------------------------
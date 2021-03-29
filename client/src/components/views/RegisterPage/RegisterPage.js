import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action.js';
import {withRouter} from'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [PasswordCheck, setPasswordCheck] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordCheckHandler = (event) => {
        setPasswordCheck(event.currentTarget.value);
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !==PasswordCheck){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        let body = {
            email: Email,
            password: Password,
            name:Name
        }

        dispatch(registerUser(body))
            .then(res => {
            if(res.payload.success){
                props.history.push('/login');
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
            ,width:'100%',height:'100vh',flexDirection:'column'
        }}>
            <form style = {{display:'flex',flexDirection:'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type = "email" value = {Email} onChange = {onEmailHandler} />
                <label>name</label>
                <input type = "text" value ={Name} onChange = {onNameHandler}/>
                <label>Password</label>
                <input type = "Password" value = {Password} onChange = {onPasswordHandler} />
                <label>PasswordCheck</label>
                <input type = "Password" value = {PasswordCheck} onChange = {onPasswordCheckHandler} />
                <br />
                <button>
                    Register
                </button>
                <br/>
               
            </form>

            <KakaoLogin
            token={javatoken}
           onSuccess={onkakaoLoginSuccesshandler}
             onFail={console.error}
           onLogout={console.info}
           useLoginForm>
                 <div >카카오톡으로 회원가입하기</div>
           </KakaoLogin>
          
             
        </div>
    )
}

export default withRouter(RegisterPage);

import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action.js';
import {withRouter} from'react-router-dom';


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

    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh'
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
            </form>
        </div>
    )
}

export default withRouter(RegisterPage);

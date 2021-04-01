import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action.js';
import {withRouter} from'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,MailOutlined} from '@ant-design/icons';
import  '../../../loginpage.css';





function RegisterPage(props) {
    const dispatch = useDispatch();

    const onSubmitHandler = (value) => {
        if(value.Password !==value.Passwordcheck){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        let body = {
            email: value.Email,
            password: value.Password,
            name:value.username
        }

        dispatch(registerUser(body))
            .then(res => {
            if(res.payload.success){
                alert('회원가입 완료')
                props.history.push('/login');
            }else{
                alert('회원가입 오류');
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

        <Form style ={{width : '18%'}}
            name="normal_login"
            className="login-form"
            initialValues={{
            remember: true,}}
            onFinish={onSubmitHandler}
        >

            <h2>매일이 회원가입</h2>

        <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
        >
        <Input prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="email" />
        </Form.Item>

        <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        >
        <Input prefix={<UserOutlined  className="site-form-item-icon" />} placeholder="username" />
        </Form.Item>


        <Form.Item
        name="Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
        </Form.Item>

        <Form.Item
        name="Passwordcheck"
        rules={[
          {
            required: true,
            message: 'Please input your Passwordcheck!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Passwordcheck"
        />
        </Form.Item>


        

      <Form.Item>
        <Button style = {{float : 'right'}}type="primary" htmlType="submit" className="login-form-button">
          회원가입
        </Button>
        
        
      </Form.Item>

      <KakaoLogin 
            token={javatoken}
           onSuccess={onkakaoLoginSuccesshandler}
             onFail={console.error}
           onLogout={console.info}
           useLoginForm
           
          render={({ onClick }) => {
           return (
               <Button type="primary" htmlType="submit"  className = 'kakao-login-form' onClick={(e) => {
                    e.preventDefault();
                     onClick();
                 }}>카카오톡으로 회원가입하기</Button>
                );
                 }}
             />
             <br/>
 
    </Form>
        </div>
       
    )
}

export default withRouter(RegisterPage);

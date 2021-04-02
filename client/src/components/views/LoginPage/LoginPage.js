import axios from 'axios';
import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action.js';
import {withRouter} from'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import  '../../../loginpage.css';


//const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

function LoginPage(props) {
    const dispatch = useDispatch();
    const onSubmitHandler = (values) => {
       // event.preventDefault();
        let body = {
            email: values.email,
            password: values.password
        }

        dispatch(loginUser(body))
            .then(res => {
            console.log(res.payload);
            console.log(res.payload.loginSucces);
            if(res.payload.loginSucces){
                props.history.push('/');
            }else{
                alert(res.payload.message);
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

        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
            remember: true,}}
            onFinish={onSubmitHandler}
        >
            <h2>매일이 로그인</h2>
        <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
        </Form.Item>
        <Form.Item
        name="password"
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
        <Form.Item>

        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button style = {{float : 'right'}}type="primary" htmlType="submit" className="login-form-button">
          Log in
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
                 }}>카카오톡으로 로그인하기</Button>
                );
                 }}
             />
             <br/>
 <a href="/register" style = {{float : 'right'}}>회원가입하기</a>
    </Form>
    </div>

      
    )
}

export default withRouter(LoginPage);




//--------------------------------------------------------------------------------
// 추가할것 formik & yup  make your system dynamic
// 2021-03-24 20시
//--------------------------------------------------------------------------------
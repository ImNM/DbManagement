import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action.js';
import {withRouter} from'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,MailOutlined} from '@ant-design/icons';
import {Formik}  from "formik";
import * as Yup from "yup";
import  '../../../loginpage.css';


const formSchema = Yup.object().shape({
    email: Yup.string().required().email("이메일 형식에 맞추어 입력해주세요"),
    username : Yup.string().required(),
    password : Yup.string().required().min(6,"비밀번호는 6자리 이상이어야합니다."),
    passwordcheck : Yup.string().required().min(6,"비밀번호는 6자리 이상이어야합니다.")
})

var allStatecheck =false;
function RegisterPage(props) {
    const dispatch = useDispatch();
 
    const onSubmitHandler = (value) => {
        if(value.password !==value.passwordcheck){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
       else if(allStatecheck){
            let body = {
                email: value.email,
                password: value.password,
                name:value.username
            }
    
            dispatch(registerUser(body))
                .then(res => {
                if(res.payload.success){
                    alert('회원가입 완료')
                    props.history.push('/login');
                }else{
                    alert('이미 있는 회원 입니다.');
                }
            })
        }
        else{
            alert("올바르게 입력해 주세요.")
        }
       
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


//if isSubmitting is true we can loading pages while ansyc background work.. 4.02 friday --chanjin
        
             <div style={{
            display:'flex', justifyContent:'center',alignItems:'center'
            ,width:'100%',height:'100vh' , flexDirection: 'column'
        }}>
        
        <Formik  style ={{width : '18%'}}
            initialValues = {{
                email:"",
                password:""
            }}
            validationSchema = {formSchema}
            onSubmit = {(data)=>console.log(data)}
        >
            {//props 에 이벤트 핸들링할 값들 저장할 수있음
                ({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors
                }) => {
                    if(!(errors.email || errors.username || errors.password)){
                        allStatecheck = true;
                    }
                    else{
                        allStatecheck =false;
                    }
                    console.log(errors)
                    console.log(allStatecheck)
                    //const emailErrorM = errors.email;
                    return(

                        <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                        remember: true,}}
                        onFinish={onSubmitHandler}
                    >
            
                        <h2>매일이 회원가입</h2>
            
                    <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                    validateStatus={errors.email && touched.email && "error"}
                    help={errors.email && touched.email && errors.email}
                    >
                    <Input prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="email" 
                    name = "email" value={values.email} onBlur={handleBlur} onChange = {handleChange}/>
                    </Form.Item>
                       
                    <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Username!',
                      },
                    ]}
                    validateStatus={errors.username && touched.username && "error"}
                    help={errors.username && touched.username && errors.username}
                    >
                    <Input prefix={<UserOutlined  className="site-form-item-icon" />} placeholder="username" 
                    name = "username" value={values.username} onBlur={handleBlur} onChange = {handleChange}/>
                    </Form.Item>
            
            
                    <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ]}
                    validateStatus={errors.password && touched.password && "error"}
                    help={errors.password && touched.password && errors.password}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      name = "password"
                      type="password"
                      placeholder="Password"
                      value={values.password} onBlur={handleBlur} onChange = {handleChange}
                    />
                    </Form.Item>
            
                    <Form.Item
                    name="passwordcheck"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Passwordcheck!',
                      },
                    ]}
                    validateStatus={errors.passwordcheck && touched.passwordcheck && "error"}
                    help={errors.passwordcheck && touched.passwordcheck && errors.passwordcheck}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Passwordcheck"
                      name = "passwordcheck" value={values.passwordcheck} onBlur={handleBlur} onChange = {handleChange}
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
                    )
                }
            }
        </Formik>
        </div>
       
    )
}

export default withRouter(RegisterPage);

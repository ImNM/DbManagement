import axios from 'axios';

export  function  loginUser(dataToSubmit){


    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
    //console.log(request);

    
    
    return {
        type:"LOGIN_USER",
        payload: request
    }
}


export  function  registerUser(dataToSubmit){


    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data);
    //console.log(request);
    
    return {
        type:"REGISTER_USER",
        payload: request
    }
}


export  function  auth(){
    const localUserInfo = JSON.parse(localStorage.getItem("Auth"));
    
    //get method 니깐 body 부분 필요없겟져?>
    const request = axios.post('/api/users/auth',{localUserInfo})
        .then(response => response.data);
    console.log(request);
    
    return {
        type:"AUTH_USER",
        payload: request
    }
}
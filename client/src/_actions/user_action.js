import axios from 'axios';

export  function  loginUser(dataToSubmit){


    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data);
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

    //get method 니깐 body 부분 필요없겟져?>
    const request = axios.get('/api/users/auth', )
        .then(response => response.data);
    //console.log(request);
    
    return {
        type:"AUTH_USER",
        payload: request
    }
}
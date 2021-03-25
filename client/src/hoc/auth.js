import axios from 'axios';
import react,{useEffect} from 'react';
import {auth} from '../_actions/user_action';
import {useDispatch} from 'react-redux';

export default function(SpecificComponent,option,adminRoute = null){

    //null 아무나 출입
    //true 로그인한 유저만 출입
    //false 로그인한 유저는 출입 불가능한 페이지
    //adminroute true 면 어디민만출입가능.
    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        useEffect(() => {


            dispatch(auth()).then(res =>{
                if(!res.payload.isAuth){//로그인 하지 않은 상태
                    if(option){
                        props.history.push('/login');
                        alert("로그인 해");
                    }
                }else{//로그인 한 상태
                    if(adminRoute && !res.payload.isAdmin){//--------------------------------------------db에 어드민 안넣었다..
                        props.history.push('/'); //어드민아닌 로그인 한 유저가 어디민 페이지로 갈때
                    }else{
                        if(option===false)//어드민 아닌 유저가 로그인한 유저는 출입 불가인 페이지에 접근할때.
                            props.history.push('/');
                    }
                }

                //console.log(res);
            })

         }, [])
         return (
             <SpecificComponent/>
         )

}


    return AuthenticationCheck;
}
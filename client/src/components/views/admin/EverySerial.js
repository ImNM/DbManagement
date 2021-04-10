
import axios from 'axios'
import React,{useState} from 'react'
import { combineReducers } from 'redux';

function EverySerial() {
    const [value, setvalue] = useState("")
    const localUserInfo  = JSON.parse(localStorage.getItem("Auth"));

    const onChangeHandler = (e)=>{
        setvalue(e.target.value)
    }
    const onClickEvent = ()=>{
        //console.log(value)
        console.log("asdf")
        axios.post('/api/everyDay/enroll',{localUserInfo,serialNum:value}).then((res)=>{
            console.log(res)
            
        })
        setvalue("")
    }
    return (
        <div>
            <h2>기기 등록을 위한 시리얼 정보를 입력해 주세요.</h2>
            <input style={{width:"50%"}} value={value} onChange={onChangeHandler} type="text"></input>
            <button onClick={onClickEvent}>시리얼 db 저장</button>
        </div>
    )
}

export default EverySerial

import React ,{ useEffect, useState }from 'react'
import {withRouter} from'react-router-dom';
import axios from 'axios';

function BoardInfoPage(props) {

    const queryId = props.location.search.split("=")[1];
    console.log(queryId);
    var content ;


    useEffect(() => {
        axios.get('/api/board/pageInfo?key='+queryId).then(res=>{
            console.log(res.data.boardList[0])
            

        })



    }, [])


    return (
        <div>
            
        </div>
    )
}

export default withRouter(BoardInfoPage)

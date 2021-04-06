import React , {useState} from 'react'
import {Checkbox , Collapse} from 'antd';
const {Panel} = Collapse




const tags = [
    {
        "_id":1,
        "name":"치매"
    },
    {
        "_id":2,
        "name":"당뇨병"
    },
    {
        "_id":3,
        "name":"건강"
    },
    {
        "_id":4,
        "name":"4"
    },
    {
        "_id":5,
        "name":"5"
    },
    {
        "_id":6,
        "name":"6"
    },
    {
        "_id":7,
        "name":"7"
    }
]



function CheckTagBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) =>{
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if(currentIndex === -1){
            newChecked.push(value)
        }
        else{
            newChecked.splice(currentIndex,1)
        }
        setChecked(newChecked);
        props.handleFilters(newChecked)

    }

    return (
        <div>
            <Collapse defaultActiveKey = {['0']}>
                <Panel header key ='1'>
                    {tags.map((value,index)=>(
                        <React.Fragment key={index}>
                            <Checkbox
                                onChange = {()=>handleToggle(value._id)}
                                typee = "checkbox"
                                checked = {Checked.indexOf(value._id)=== -1?false:true}
                            />
                            <span>{value.name}</span>

                        </React.Fragment>
                    ))}
                </Panel>
            </Collapse>
            
        </div>
    )
}

export default CheckTagBox

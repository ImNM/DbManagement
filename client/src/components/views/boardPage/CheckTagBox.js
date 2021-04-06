import React , {useState,useEffect} from 'react'
import {Checkbox , Collapse} from 'antd';
import {tagNum} from '../../../utils/tagNum'
import axios from 'axios';
const {Panel} = Collapse
function CheckTagBox(props) {
    const [Checked, setChecked] = useState(props.filter)



    const handleToggle = (value) =>{
        console.log("value",value)
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if(currentIndex === -1){
            newChecked.push(value)
        }
        else{
            newChecked.splice(currentIndex,1)
        }
        console.log("newchecked",newChecked)
        setChecked(newChecked);
        props.handleFilters(newChecked)
    }
    
    

    return (
        <div>
            <Collapse defaultActiveKey = {['0']}>
                <Panel  header="태그 검색하기" key ='1'>
                    {tagNum.map((value,index)=>(
                        <React.Fragment key={index}>
                            <Checkbox
                                onChange = {()=>handleToggle(value._id)}
                                typee = "checkbox"
                                checked = {Checked.indexOf(value._id)=== -1?false:true}
                            />
                            <span style={{paddingLeft:"5px",paddingRight:"5px"}}>{value.name}</span>

                        </React.Fragment>
                    ))}
                </Panel>
            </Collapse>
            
        </div>
    )
}

export default CheckTagBox

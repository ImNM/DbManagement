import React from 'react'
import {useState} from 'react'
import { ko } from 'date-fns/locale'
import { DateRange } from 'react-date-range';
function DatePicker(props) {
 // console.log("pro",props.onSelectDateHandler)
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
      
        const onChangeHandler = (item) =>{
         setState([item.selection])
          
          const date = {
           endDate: item.selection.endDate,
           startDate : item.selection.startDate
          }
          props.onSelectDateHandler(date)
        }
     
    return (
        <div>
            <DateRange
            locale = {ko}
            editableDateInputs={true}
            onChange={onChangeHandler}
            moveRangeOnFirstSelection={false}
            ranges={state}
/>
        </div>
    )
}

export default DatePicker

import React from 'react'
import {useState} from 'react'
import { ko } from 'date-fns/locale'
import { DateRange } from 'react-date-range';
function DatePicker() {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
      
         
    
    return (
        <div>
            <DateRange
            locale = {ko}
            editableDateInputs={true}
            onChange={item => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
/>
        </div>
    )
}

export default DatePicker

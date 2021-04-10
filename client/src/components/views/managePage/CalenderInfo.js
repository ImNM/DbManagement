import React from 'react'
import { Calendar, Badge } from 'antd';
import { LeftOutlined, RightOutlined, BellOutlined } from '@ant-design/icons';
import '../../../CalenderInfo.scss'

function CalenderInfo() {
    return (
        <div>
          <div className="Calendar">
           <div className="head">
               <button><LeftOutlined /></button>
                <span className="title">December 2016</span>
                <button><RightOutlined /></button>
           </div>
           <div className="body">
             Body
           </div>
          </div>
        </div>
    )
}

export default CalenderInfo




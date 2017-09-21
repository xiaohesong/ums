import React from 'react';
import { Alert } from 'antd';


class Unpermission extends React.Component{
     constructor(props){
         super(props)
     }

    render() {
         return(
             <Alert
                 message="无权限访问该页!"
                 description="请联系管理员添加该页访问权限!"
                 type="warning"
                 showIcon
             />
         )
     }
}

export default Unpermission
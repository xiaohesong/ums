import {Spin} from 'antd'
import React from 'react'

class PageLoading extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            size: this.props.loadingSize || ""
        }
    }

    render() {
        console.log('to render spin')
        return(
            <div className="pageloading">
                <Spin size='large' tip="玩命加载中..."/>
            </div>
        )
    }
}

export default PageLoading
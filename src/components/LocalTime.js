import React, {Component} from 'react'
import {Button} from 'antd'

export default class LocalTime extends Component {
  state = {
    time: new Date().toLocaleTimeString()
  }

  render() {
    return(
      <div className="sub-content-main">
        <span className='time'>{this.state.time}</span>
        <span className='logout'>
          <Button type='danger' onClick={this.toLogout} style={{marginLeft: '25px'}}> 登出</Button>
        </span>
      </div>
    )
  }

  componentDidMount() {
    setInterval(this.resetState, 1000);
  }

  resetState = () => {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }

  // setInterval(resetState, 1000);
}

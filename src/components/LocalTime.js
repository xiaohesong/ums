import React, {Component} from 'react'
import {Button, Icon} from 'antd'
import {Link} from "react-router-dom"
import '../stylesheets/Header.css'

export default class LocalTime extends Component {
  state = {
    time: new Date().toLocaleTimeString()
  }

  render() {
    return(
      <div className="sub-content-main">
        <Link to='/' className="skio-logo-link"><img src="skio-logo.png" alt="主页" /></Link>
        <span className='time'>{this.state.time}</span>
        <span className='logout'>
          <Button type='danger' onClick={this.toLogout} style={{marginLeft: '125px', marginTop: '15px'}}> 登出</Button>
        </span>
        <span style={{float: 'right'}}>
          <ul className="">
              <li className="skio-dropdown-user-info">
                  <a className="skio-dropdown-toggle" style={{cursor: 'pointer'}} >
                      Hi，<span className="skio-username">朱士松</span>
                    <span className="skio-down-icon"><Icon type="down" /></span>
                  </a>
                  <ul className="dropdown-menu" style={{display: 'none'}}>
                      <h3 className="ng-binding">朱士松</h3>
                      <p className="company ng-binding">杭州小车东汽车服务有限公司</p>
                      <hr style={{margin: "15 0"}} />
                      <p className="phone">手机号<span className="ng-binding">15088614450</span></p>
                      <p className="manage-user">管理员<span className="ng-binding">范其濛</span></p>
                      <a className="user-btn" style={{marginBottom: '10px'}} >修改手机号</a>
                      <a className="user-btn">退出</a>
                  </ul>
              </li>
          </ul>
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

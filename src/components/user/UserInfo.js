import React from 'react';
import {Button, Icon} from 'antd';

export default class UserInfo extends React.Component {
  state = {
    display: false
  }

  toggleUserInfo = (e) => {
    e.stopPropagation()
    this.setState({
      display: !this.state.display
    })
  }

  componentDidMount() {
    console.log("user-info componentDidmount");
    let select = document.getElementById("skio-dropdown-toggle")
    select.addEventListener("click", this.toggleUserInfo);
    document.addEventListener("click", this.toggleUserInfoListener);
  }

  toggleUserInfoListener = () => {
    this.setState({
      display: false
    })
  }


  render() {
    return(
      <ul className="skio-user-info">
          <li className="skio-dropdown-user-info">
              <div className='skio-dropdown-toggle'>
                <a className="skio-dropdown-toggle" id="skio-dropdown-toggle" style={{cursor: 'pointer'}} onClick={this.toggleUserInfo} >
                    Hi，<span className="skio-username">管理员</span>
                  <span className="skio-down-icon"><Icon type="down" /></span>
                </a>
              </div>
              <ul className="dropdown-menu" style={{display: this.state.display ? "block" : "none"}}>
                  <h3 className="ng-binding">管理员</h3>
                  <p className="company ng-binding">杭州市西湖区北山大厦</p>
                  <hr style={{margin: "15 0"}} />
                  <p className="phone">手机号<span className="ng-binding">15088614450</span></p>
                  <p className="manage-user">管理员<span className="ng-binding">xiaofan</span></p>
                  <a className="skio-user-btn edit" style={{marginBottom: '10px'}} >修改手机号</a>
                  <a className="skio-user-btn logout">退出</a>
              </ul>
          </li>
      </ul>
    )
  }
}

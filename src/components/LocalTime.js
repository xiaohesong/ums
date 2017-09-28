import React, {Component} from 'react';
import SkioLogo from "./logo/SkioLogo";
import UserInfo from './user/UserInfo';
import '../stylesheets/Header.css';

export default class LocalTime extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  }

  render() {
    return(
      <div>
        <div className="sub-content-main">
          <div className="skio-logo-link">
            <SkioLogo/>
          </div>
          <div className='time'>
            {this.state.time}
          </div>
        </div>
        <div className="skio-header-list">
          <UserInfo/>
          <ul>
            <li>

            </li>
          </ul>

        </div>
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

}

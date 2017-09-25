import React, {Component} from 'react'

export default class LocalTime extends Component {
  state = {
    time: new Date().toLocaleTimeString()
  }

  render() {
    return(
      <div>
        <h1>当前时间:</h1>
        <h2>{this.state.time}</h2>
      </div>
    )
  }

  componentDidMount() {
    let self = this
    setInterval(self.resetState, 1000);
  }

  resetState = () => {
    this.setState({
      time: new Date().toLocaleTimeString()
    })
  }

  // setInterval(resetState, 1000);
}

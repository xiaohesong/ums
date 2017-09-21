import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import Hello from '../Hello'
import App from '../App'
import Customer from '../Customer'

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Customer} />
                    <Route path="../customers" component={Customer} />
                    {/*<Route path="/register" component={Register} />*/}
                    <Route path="../hello" component={Hello}/>
                </div>
            </Router>
        )
    }
}
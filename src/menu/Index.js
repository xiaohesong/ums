import AntMenu from './AntMenu'
import React from 'react';
import '../stylesheets/Menu.css';
import About from '../About'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Hello from '../Hello'
import asyncComponent from "../components/AsyncComponent";

const AsyncCustomer = asyncComponent(() => import("../Customer"));
const AsyncTool = asyncComponent(() => import("../Tool"));

class Sider extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="main-menu">
                        <div>
                            <AntMenu successLogout={this.successLogout} />
                        </div>
                    </div>
                    <div className="main-content">
                        <div>
                            <Route exact path="/" component={Hello}/>
                            <Route path="/customers" component={AsyncCustomer}/>
                            <Route path="/hello" component={Hello}/>
                            <Route path="/tool" component={AsyncTool}/>
                            <Route path="/about" component={About}/>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }

}

export default Sider
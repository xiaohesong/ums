import AntMenu from './AntMenu'
import React from 'react';
import '../stylesheets/Menu.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Hello from '../Hello'
import asyncComponent from "../components/AsyncComponent";
import LocalTime from '../components/LocalTime'
import Until from '../until/Store'

import { Layout, Icon } from 'antd'
const { Header, Sider, Content } = Layout;

const AsyncCustomer = asyncComponent(() => import("../Customer"));
const AsyncTool = asyncComponent(() => import("../Tool"));
const AsyncAbout = asyncComponent(() => import("../About"));

class MainMenu extends React.Component {
  state = {
      collapsed: JSON.parse(Until.store("menuCollapsed"))  || false,
    };

    toggle = () => {
      Until.store("menuCollapsed", String(!this.state.collapsed))
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }

    render() {
        return (
            <Router>
                <div>
                    <div className="sub-content">
                      <LocalTime />
                    </div>
                    <Layout>
                      <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        width={240}
                      >
                        <div className="logo" />
                        <AntMenu toggle={this.toggle} collapsed={this.state.collapsed} />
                      </Sider>
                      <Layout>
                        <Content>
                          <div>
                              <Route exact path="/" component={Hello}/>
                              <Route path="/customers" component={AsyncCustomer}/>
                              <Route path="/hello" component={Hello}/>
                              <Route path="/tool" component={AsyncTool}/>
                              <Route path="/about" component={AsyncAbout}/>
                          </div>
                        </Content>
                      </Layout>
                    </Layout>
                </div>
            </Router>
        )
    }

}

export default MainMenu

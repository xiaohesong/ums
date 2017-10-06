import React from 'react';
import { Menu, Icon, Switch, message, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import Action from './PermissionIndex'
import Until from '../until/Store'
const {SubMenu} = Menu;


class AntMenu extends React.Component {
    constructor(props) {
        super(props)
        console.log(Until.store("menuCollapsed"));
    }

    state = {
        mode: Until.store("menuMode") || 'inline',
        theme: Until.store("menuTheme") || 'light',
        selectedKeys: ['hello'],
        openKeys: []
    }

    changeMode = (value) => {
        let name = value ? 'vertical' : 'inline'
        Until.store("menuMode", name)
        this.setState({
            mode: name,
        });
    }
    changeTheme = (value) => {
        let name = value ? 'dark' : 'light'
        Until.store("menuTheme", name)
        this.setState({
            theme: name
        });
    }

    toCustomer = (e) => {
        e.preventDefault();
        if (!Action.customerIndexable()) {
            return message.warning("无权限查看！")
        }
        this.props.history.push('/customers')
    }

    toRole = (e) => {
        e.preventDefault();
        if (!Action.roleIndexable()) {
            return message.warning("无权限查看！")
        }
        this.props.history.push('/tool')
    }

    render() {
        let key = window.location.pathname.split('/')[1] || 'hello'
        let collapsedClass = this.props.collapsed ? "" : "menu-collapsed"
        let displayable = this.props.collapsed ? 'none' : 'inline-block'
        return (
            <div style={{
                            width: 240
                        }}>
                <br />
                <Button type="primary" className="trigger" onClick={this.toggleCollapsed} style={{
                                                                                                    marginBottom: 16
                                                                                                }}>
                  <Icon  type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <div style={{
                display: displayable
            }}>
                  <span className="ant-divider" style={{
                margin: '0 1em'
            }} />
                  <Switch onChange={this.changeTheme} defaultChecked={this.state.theme === 'dark'}/> 主题
                </div>
                <br />
                <Menu
            className={collapsedClass}
            defaultSelectedKeys={this.state.selectedKeys}
            defaultOpenKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            selectedKeys={[key]}
            mode={this.state.mode}
            theme={this.state.theme}
            >
                    <Menu.Item key="customers" to='/customers' activeClassName='active'>
                        <Icon type="contacts" />
                        <Link to="/customers" onClick={this.toCustomer}>用户管理</Link>
                    </Menu.Item>

                    <Menu.Item key="tool" activeClassName='active'>
                        <Icon type="mail" />
                        <Link to="/tool" onClick={this.toRole}>角色管理</Link>
                    </Menu.Item>

                    <Menu.Item key="hello">
                        <Icon type="calendar" />
                        <Link to='/hello'>Hello Word</Link>
                    </Menu.Item>

                    <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Navigation Three</span></span>}>
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key='about'>
                            <Link to='/about'>About this side</Link>
                        </Menu.Item>
                        <SubMenu key="sub2" title="Submenu">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                        </SubMenu>
                    </SubMenu>

                </Menu>
                <span className="ant-divider" style={{
                margin: '0 1em'
            }} />
            </div>
        )
    }

    toggleCollapsed = () => {
        this.props.toggle()
    }

    onOpenChange = (openKeys) => {
        this.setState({
            openKeys: openKeys.slice(-1)
        })
    }
}

export default withRouter(AntMenu)

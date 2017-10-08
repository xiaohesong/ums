import React from 'react';
import { Select, Alert, Button } from 'antd';
import Fetch from '../until/MyFetch'
import '../stylesheets/Customer.css'

const Option = Select.Option;

class ConfigPermission extends React.Component{

    constructor(props){
        super(props)
        this.state = {
             customer: this.props.customer,
             roles: [],
             defaultRoleIds: this.props.customer.roleIds,
             displayable: 'none'
        }
    }

    componentDidMount() {
        Fetch.all("roles").then(data => {
            this.setState({
                roles: data
            })
        })
    }

    render() {
        const children = [];
        this.state.roles.map(item => {
            children.push(<Option key={item.id}>{item.name}</Option>);
            return children
        })

        return(
            <div className="permission-content">
                <div className="customer-permission">
                    <p>{this.state.customer.name}</p>
                </div>
                <div className="customer-permission">
                    <Select
                        mode="multiple"
                        style={{ width: '20%' }}
                        placeholder="Please select"
                        defaultValue={this.state.defaultRoleIds}
                        onChange={this.handleChange}
                    >
                        {children}
                    </Select>
                    <Alert message="请选择角色" type="error" style={{ width: '20%', marginLeft: '38px', display: this.state.displayable }} />

                </div>
                <div className="customer-permission">
                    <Button onClick={this.doSmt} type='primary'>
                        更新权限
                    </Button>
                </div>
            </div>
        )
    }

    handleChange = (value) => {
        this.setState({
            selectIds: value,
            displayable: value.length > 0 ? 'none' : 'block'
        })
    }

    doSmt = (e) => {
      var id = this.state.customer.id;
      var values = {roleIds: this.state.selectIds}
      Fetch.put(values, `customers/${id}`).then(data => {
          this.props.successConfigPermission()
      })
    }
}

export default ConfigPermission

import React from 'react';
import { Select, Alert, Button } from 'antd';
import Fetch from '../until/MyFetch'

const Option = Select.Option;

class ConfigPermission extends React.Component{

    constructor(props){
        super(props)
        console.log(this.props.customer)
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
            <div className="customer-permission">
                <span>请选择</span>
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
                <Button onClick={this.doSmt} type='primary'>
                    更新权限
                </Button>
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
      console.log(e.target);
      var id = this.state.customer.id;
      var values = {roleIds: this.state.selectIds}
      Fetch.put(values, `customers/${id}`).then(data => {
          this.props.successConfigPermission()
      })
    }
}

export default ConfigPermission

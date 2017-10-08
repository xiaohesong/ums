import React from 'react';
import {Checkbox, Form} from 'antd';
import Fetch from '../until/MyFetch'

const CheckboxGroup = Checkbox.Group

const plainOptions = {
    'data': [
        {
            'type': 'roles',
            'desc': '角色管理',
            'actions': [
                'role-create',
                'role-index',
                'role-edit',
                'role-update'
            ]
        },
        {
            'type': 'users',
            'desc': '用户管理',
            'actions': [
                'user-create',
                'user-index',
                'user-edit',
                'user-update'
            ]
        }
    ]
};
const defaultCheckedList = [];

class Permission extends React.Component {
    onChange = (checkedList) => {
        var options = []
        plainOptions.data.map((item) => {
            options.push(item.actions)
            return options
        })
        options = Array.prototype.concat(...options)
        var checkRow = plainOptions.data.map((item) => {
            return item.actions.map(action => {
                return checkedList.indexOf(action) >= 0
            })
        })
        checkRow = checkRow.map(item => {
            item.filter((v, i, a) => a.indexOf(v) === i);
            if (item.length === 1) {
                return item[0]
            } else {
                return false
            }
        })

        this.setState({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < options.length),
            checkAll: checkedList.length === options.length,
            checkedRow: checkRow
        });
    }

    onCheckAllChange = (e) => {
        var isChecked = e.target.checked
        var options = []
        var rowLength = plainOptions.data.length
        plainOptions.data.map((item) => {
            options.push(item.actions)
            return options
        })
        options = Array.prototype.concat(...options)
        var checkRow = this.state.checkedRow
        if (checkRow.length === 0) {
            checkRow = new Array(rowLength).fill(isChecked)
        } else {
            checkRow.fill(isChecked)
        }
        this.setState({
            checkedList: isChecked ? options : [],
            indeterminate: false,
            checkAll: isChecked,
            checkedRow: checkRow
        });
    }

    onCheckRow = (e) => {
        var options = []
        plainOptions.data.map((item) => {
            options.push(item.actions)
            return options
        })
        options = Array.prototype.concat(...options)
        let index = e.target.value
        var checked = e.target.checked
        var original = this.state.checkedList
        var checkRow = this.state.checkedRow
        var pending = plainOptions.data[index].actions

        if (checked) {
            // Add Array to another array, Link to https://stackoverflow.com/questions/351409/how-to-append-something-to-an-array
            original = original.concat(pending)
        } else {
            original = original.filter(item => !pending.includes(item))
        }
        checkRow[index] = checked
        this.setState({
            checkedList: original,
            indeterminate: !!original.length && (original.length < options.length),
            checkAll: original.length === options.length,
            checkedRow: checkRow
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var id = this.state.role.id;
        var values = {permission: this.state.checkedList};
        Fetch.put(values, `roles/${id}`)
        this.props.successHandleSubmit()
    }

    constructor(props) {
        super(props)
        this.state = {
            role: this.props.role,
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            checkedRow: [] // array of state for row level
        };
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="">
                    <div style={{borderBottom: '1px solid #E9E9E9'}}>
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            Check all
                        </Checkbox>
                    </div>
                    <br/>
                    {
                        plainOptions.data.map((obj, key) => {
                            return (
                                <div key={key}>
                                    <div className="checkbox-menu">
                                        <Checkbox onChange={this.onCheckRow} value={key}
                                                  checked={this.state.checkedRow[key]}>
                                            {obj.desc}
                                        </Checkbox>
                                    </div>
                                    <div className="checkbox-body">
                                        <CheckboxGroup options={obj.actions} value={this.state.checkedList}
                                                       onChange={this.onChange}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button className="login-form-button">更新配置</button>
                </form>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            checkedList: this.state.role.permission,
        });
    }


}

const WrappePermissionForm = Form.create()(Permission)
export default WrappePermissionForm

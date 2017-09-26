import React, {Component} from 'react';
import {Button, message, Modal, Table} from 'antd';
import Form from './customers/NewForm';
import Fetch from './until/MyFetch';
import EditForm from './customers/EditForm';
import ConfigPermission from './customers/ConfigPermission';
import Action from "./permissions/Customer";
import './stylesheets/PageLoading.css';

const confirm = Modal.confirm;

class Customer extends Component {
    state = {
        type: 'index',
        pageLoading: true,
        customers: [],
        customer: {},
        permissionable: {
            indexable: Action.indexable(),
            editable: Action.editable(),
            createable: Action.createable()
        }
    }
    toNew = () => {
        if (!this.state.permissionable.createable) {
            return message.warning("无权限操作！")
        }
        this.setState({
            type: 'new'
        })
    }

    handleAdd = () => {
        Fetch.all("customers").then(data => {
            this.setState({type: 'index', customers: data})
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        var self = this
        var id = e.target.id
        var name = e.target.name;
        if (!this.state.permissionable.editable) {
            return message.warning("无权限操作！")
        } else {
            confirm({
                title: `确认删除${name}吗`,
                content: '删除后不可恢复!',
                okType: 'danger',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    Fetch.del(id).then(data => {
                        Fetch.all("customers").then(data => {
                            self.setState({type: 'index', customers: data, pageLoading: false});
                        })
                    })
                },
                onCancel() {
                    console.log('cancel delete id is', id)
                },
            });
        }
    }

    handleClickEdit = (e) => {
        if (!this.state.permissionable.editable) {
            return message.warning("无权限操作！")
        }
        e.preventDefault();
        var id = e.target.id;
        let record = this.state.customers.filter(item => item.id.toString() === id).pop()
        this.setState({type: 'edit', customer: record})

    }
    handleUpdate = () => {
        Fetch.all("customers").then(data => {
            this.setState({type: 'index', customers: data})
        })
    }
    handleHeaderChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    toConfigPermission = (e) => {
        e.preventDefault();
        if (!this.state.permissionable.editable) {
            return message.warning("无权限操作！")
        }
        var id = e.target.id;
        let record = this.state.customers.filter(item =>
            item.id.toString() === id
        ).pop()
        this.setState({
            customer: record,
            type: 'config-permission'
        })
    }

    successConfigPermission = () => {
        Fetch.all("customers").then(data => {
            this.setState({
                type: 'index',
                customers: data
            })
        })
    }

    render() {
        switch (this.state.type) {
            case 'index':
                return this.renderIndex()
            case "new":
                return this.renderNew()
            case "edit":
                return this.renderEdit()
            case 'config-permission':
                return this.renderConfigPermission()
            default:
                return this.renderIndex()
        }

    }

    componentDidMount() {
        console.log('customer componentDidMount')
        let self = this
        Fetch.all('customers').then(data => {
            self.setState({type: 'index', customers: data, pageLoading: false});
        })
    }

    renderIndex() {
        const columns = [
            {
                title: '姓名',// 列表头部显示的文字
                dataIndex: 'name',
                sorter: (a, b) => a.name - b.name
                // key: 'title'
            },
            {
                title: '出生年月',
                dataIndex: 'birth'
                // key: 'content'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a onClick={this.handleClickEdit} id={record.id}>编辑</a>
                      <span className="ant-divider"/>
                      <a href="#to_del" onClick={this.handleDelete} name={record.name} id={record.id}>删除</a>
                      <span className="ant-divider"/>
                        <a href="#to_config" onClick={this.toConfigPermission} id={record.id}>配置权限</a>
                      <span className="ant-divider"/>
                    </span>
                ),
            }
        ];
        return (
            <div>
                <div className="new-button">
                    <div>
                        <Button onClick={this.toNew}>添加用户</Button>
                    </div>
                    <div>
                        <Table columns={columns}
                               rowKey={record => record.id} onChange={this.handleHeaderChange}
                               dataSource={this.state.customers}/>
                    </div>
                </div>
            </div>
        );
    }

    renderEdit() {
        return (
            <div className="edit-form">
                <EditForm handleUpdate={this.handleUpdate} record={this.state.customer}/>
            </div>
        )
    }

    renderNew() {
        return (
            <div className="new-form">
                <Form handleAdd={this.handleAdd}/>
            </div>
        )
    }

    renderConfigPermission() {
        return (
            <ConfigPermission customer={this.state.customer} successConfigPermission={this.successConfigPermission}/>
        )
    }
}

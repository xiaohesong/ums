import React, {Component} from 'react';
import {Button, message, Modal, Table} from 'antd';
import Form from './customers/NewForm';
import Fetch from './until/MyFetch';
import EditForm from './customers/EditForm';
import ConfigPermission from './customers/ConfigPermission';
import Action from "./permissions/Customer";
import SearchForm from "./customers/SearchForm"
import './stylesheets/PageLoading.css';
import './stylesheets/TableTh.css';
import './stylesheets/Customer.css';

const confirm = Modal.confirm;

export default class Customer extends Component {
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
            console.log(data)
            self.setState({type: 'index', customers: data.customers, pageLoading: false});
        })
    }

    renderIndex() {
        const columns = [
            {
                title: '姓名',// 列表头部显示的文字
                dataIndex: 'name',
                className: 'skio-tabel-th',
                fixed: 'left',
                width: 100,
                sorter: (a, b) => a.name - b.name
                // key: 'title'
            },
            {
                title: '出生年月',
                dataIndex: 'birth',
                className: 'skio-tabel-th',
                // key: 'content'
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '手机号1',
                dataIndex: 'phone1',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '手机号2',
                dataIndex: 'phone2',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '手机号3',
                dataIndex: 'phone3',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '手机号4',
                dataIndex: 'phone4',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '手机号5',
                dataIndex: 'phone5',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '手机号6',
                dataIndex: 'phone6',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '手机号7',
                dataIndex: 'phone7',
                className: 'skio-tabel-th',
                sorter: (a, b) => a.phone - b.phone
            },
            {
                title: '地址',
                className: 'skio-tabel-th',
                dataIndex: 'address'
            },
            {
                title: 'Action',
                key: 'action',
                className: 'skio-tabel-th',
                fixed: 'right',
                width: 180,
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
                    <SearchForm toNew={this.toNew} search={this.search}/>
                    <div>
                        <Table columns={columns}
                               rowKey={record => record.id} onChange={this.handleHeaderChange}
                               scroll={{ x: 1600 }}
                               bordered
                               title={() => "用户列表"}
                               dataSource={this.state.customers}/>
                    </div>
                </div>
            </div>
        );
    }

    search = (data) => {
        this.setState({
            customers: data
        })
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

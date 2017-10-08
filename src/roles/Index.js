import React from 'react';
import { Button, Table, Spin, message} from 'antd';
import Action from '../permissions/Role'
import Fetch from '../until/MyFetch'
import "../stylesheets/PageLoading.css"
import "../stylesheets/TableTh.css"

class Index extends React.Component {
    constructor(props){
        super(props)
        this.state = ({
            roles: [],
            pageLoading: true,
            permissionable: {
              editable: Action.editable(),
              createable: Action.createable()
            }
        })
    }

    render() {
        const columns = [
            {
                title: '名称',// 列表头部显示的文字
                dataIndex: 'name',
                className: 'skio-tabel-th'
            },
            {
                title: 'Action',
                key: 'action',
                className: 'skio-tabel-th',
                render: (text, record) => (
                    <span>
                        <a onClick={this.toEdit} id={record.id}>编辑</a>
                      <span className="ant-divider"/>
                      <a id={record.id} onClick={this.toConfigPermission}>权限配置</a>
                      <span className="ant-divider"/>
                    </span>
                ),
            }
        ];

        if(this.state.pageLoading){
            return(
                <div className="pageloading">
                    <Spin size='large' tip="玩命加载中..."/>
                </div>
            )
        }
        return(
            <div>
                <div className="tool-header">
                    <Button type="primary" onClick={this.toNew}>添加角色</Button>
                </div>
                <div>
                    <Table columns={columns} rowKey={record => record.id} dataSource={this.state.roles}/>
                </div>
            </div>
        )
    }

    toNew = () => {
        if(!this.state.permissionable.createable){
          return message.warning("无权限操作！")
        }
        this.props.toNew()
    }

    componentDidMount() {
        Fetch.all("roles").then(data => {
            this.setState({
                roles: data,
                type: 'index',
                pageLoading: false
            })
        })
    }

    toEdit = (e) => {
      if(!this.state.permissionable.editable){
        return message.warning("无权限操作！")
      }
      var id = e.target.id;
        let record = this.state.roles.filter(item =>
            item.id.toString() === id
        ).pop()
        this.props.toEdit(record)
    }

    toConfigPermission = (e) => {
        if(!this.state.permissionable.editable){
          return message.warning("无权限操作！")
        }
        let id = e.target.id;
        let record = this.state.roles.filter(item =>
            item.id.toString() === id
        ).pop()
        this.props.toConfigPermission(record)
    }

}

export default Index

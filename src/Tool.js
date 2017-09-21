import React from 'react';
import RoleIndex from './roles/Index'
import RoleForm from './roles/RoleForm'

import './stylesheets/Tool.css'
import Permission from "./roles/Permission";

export default class Tool extends React.Component {
    state = {
        type: 'index',
        record: {}
    }

    render() {
        switch(this.state.type) {
            case 'index':
                return this.renderIndex()
            case 'new':
                return this.renderNew()
            case 'edit':
                return this.renderEdit()
            case 'config':
                return this.renderConfig()
            default:
                return this.render()
        }
    }

    toNew = () => {
        this.setState({
            type: 'new'
        })
    }

    toEdit = (record) => {
      this.setState({
        type: 'edit',
        record: record
      })
    }

    toConfigPermission = (record) => {
        this.setState({
            type: 'config',
            role: record
        })
    }

    successHandleSubmit = () => {
        this.setState({
            type: 'index'
        })
    }

    renderIndex() {
        return(
            <RoleIndex toNew={this.toNew} toEdit={this.toEdit} toConfigPermission={this.toConfigPermission}/>
        )
    }

    renderNew() {
        return(
            <div className="tool-new-form">
                <RoleForm handleSubmit={this.handleSubmit} type={this.state.type} cancelToCreate={this.cancelToCreate}/>
            </div>
        )
    }

    renderEdit() {
      return(
        <div className="tool-new-form">
            <RoleForm handleSubmit={this.handleSubmit} type={this.state.type} record={this.state.record} cancelToCreate={this.cancelToCreate} />
        </div>
      )
    }

    renderConfig() {
        return(
            <div className="tool-permission">
                <Permission role={this.state.role} successHandleSubmit={this.successHandleSubmit}/>
            </div>
        )
    }

    handleSubmit = () => {
        this.setState({
            type: 'index'
        })
    }

    cancelToCreate = () => {
        this.setState({
            type: 'index'
        })
    }


}

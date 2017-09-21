import React from 'react';
import '../stylesheets/Login.css';
import {Alert, Button, Checkbox, Form, Icon, Input} from 'antd';
import Methods from '../until/Store.js';

const API_URL = process.env.REACT_APP_DEV_API_URL
const FormItem = Form.Item;

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let _self = this
        this.setState({
            loading: true
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                fetch(`${API_URL}/customers`,{
                    headers: new Headers({
                        "Cache-Control": "no-cache"
                    })
                })
                    .then((resp) => resp.json())
                    .then(function (data) {
                        let resultData = data.filter(item =>
                            item.phone === values.phone
                        )
                        console.log('datashi', data, 'zuihou de shu zu shi ', resultData)
                        if (resultData.length >= 1) {
                            let result = resultData.pop()
                            if (result.password === values.password) {
                                Methods.store("user_id", result.id)
                                _self.setState({
                                    code: 1,
                                    message: "恭喜你登录成功!",
                                    loading: false
                                })
                                permission(result.roleIds)
                                // location.href = '/'
                                // setTimeout(function(){} , 1000);
                            } else {
                                _self.setState({
                                    code: 2,
                                    message: "请确认用户名或者密码!",
                                    loading: false
                                })
                            }
                        } else {
                            _self.setState({
                                code: 2,
                                message: "请确认用户名或者密码!",
                                loading: false
                            })
                        }
                        console.log("current data was:", resultData, "zhuangtaishi:", _self.state)
                    })
            }
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            code: 0,
            message: "默认不显示",
            loading: false
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const code = this.state.code
        let showtype;
        if (code === 1) {
            showtype = <Alert message="Successful To Login!" type="success" showIcon/>
        } else if (code === 2) {
            showtype = <Alert message={this.state.message} type="error" showIcon/>
        }

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Please input your phone to login!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Phone"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                {showtype}
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="/register">register now!</a>
                </FormItem>
            </Form>
        );
    }

};
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;



const permission = (roleIds) => {
    fetch(`${API_URL}/roles`,{
        headers: new Headers({
            'Cache-Control': 'no-cache'
        })
    })
        .then(resp => resp.json())
        .then(data => {
            var permissions = []
            data.forEach((role, index) => {
                if(roleIds.includes(String(role.id))){
                    permissions = permissions.concat(role.permission)

                }
            })
            permissions = new Set(permissions)
            permissions = [...permissions]
            console.log(permissions)
            Methods.store("permissions",  permissions)
            window.location.href="/"
        })
}

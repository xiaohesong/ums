import React from 'react'
import {Button, Form, Input} from 'antd';
import Fetch from '../until/MyFetch';

const FormItem = Form.Item;


class RoleForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                this.setState({
                    loading: true
                })
                if (this.state.type === 'new') {
                    Fetch.post(values, 'roles').then(data => this.props.handleSubmit())
                } else if (this.state.type === 'edit') {
                    Fetch.put(values, `roles/${this.state.record.id}`).then(data => {
                        this.props.handleSubmit()
                    })
                }
            }
        });
    }
    cancelCreate = (e) => {
        e.preventDefault();
        this.props.cancelToCreate()
    }

    constructor(props) {
        super(props)
        this.state = {
            record: this.props.record || {},
            type: this.props.type,
            loading: false
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="角色名称"
                >
                    {getFieldDecorator('name', {
                        initialValue: this.state.record.name,
                        rules: [{required: true, message: 'Please input your Role Name!'}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" loading={this.state.loading} htmlType="submit">Create</Button>
                    <span className="ant-divider" style={{margin: '0 1em'}}/>
                    <Button onClick={this.cancelCreate}>取消</Button>
                </FormItem>
            </Form>
        )
    }

}

const WrapNewFrom = Form.create()(RoleForm);
export default WrapNewFrom

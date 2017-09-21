import {Button, Form, Icon, Input, Tooltip} from 'antd';
import React from 'react';
import Fetch from '../until/MyFetch';
import '../until/TimeFormat'

const FormItem = Form.Item;
// const apiRoute = 'http(s)://58e72bae79739c1200ed3cef.mockapi.io/xiaozhu'
// const API_URL = process.env.REACT_APP_DEV_API_URL

class NewForm extends React.Component {
    state = {
        confirmDirty: false,
        loading: false
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                console.log('Received values of form: ', values);
                Fetch.post(values, 'customers').then(data => {
                    this.props.handleAdd()
                })
            }
        });
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
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Nickname&nbsp;
                            <Tooltip title="What do you want other to call you?">
                                <Icon type="question-circle-o"/>
                              </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Address"
                >
                    {getFieldDecorator('address', {
                        rules: [{required: true, message: 'Please input your Address'}],
                    })(
                        <Input/>
                    )}
                </FormItem>

                {/*<FormItem*/}
                    {/*{...formItemLayout}*/}
                    {/*label="Birth"*/}
                {/*>*/}
                    {/*{getFieldDecorator('birth', {*/}
                        {/*rules: [{required: true, message: 'Please select your Birth'}],*/}
                    {/*})(*/}
                        {/*<DatePicker/>*/}
                    {/*)}*/}

                {/*</FormItem>*/}


                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" loading={this.state.loading} htmlType="submit">Create</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(NewForm);

export default WrappedRegistrationForm;
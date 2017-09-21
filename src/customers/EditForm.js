import {Button, Form, Icon, Input, Tooltip} from 'antd';
import React from 'react';
import Fetch from '../until/MyFetch';
import '../until/TimeFormat'

const FormItem = Form.Item;

class EditForm extends React.Component {
    state = {
        confirmDirty: false,
        record: this.props.record,
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
                Fetch.put(values, `customers/${this.state.record.id}`).then(data => {
                    this.props.handleUpdate()
                })
            }
        });
    }
    
    constructor(props) {
        super(props)
        console.log("edit form 的 props--" + JSON.stringify(this.props))
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
                        initialValue: this.state.record.phone,
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
                        initialValue: this.state.record.name,
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
                        initialValue: this.state.record.address,
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
                    <Button type="primary" loading={this.state.loading} htmlType="submit">Update</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedEditForm = Form.create()(EditForm);

export default WrappedEditForm;
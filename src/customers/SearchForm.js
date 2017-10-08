import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import "../stylesheets/SearchForm.css";
import '../stylesheets/Button.css';
import Myfetch from '../until/MyFetch'
const FormItem = Form.Item;


class SearchForm extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = []
            Object.keys(values).forEach(key => {
                params.push(`q[${key}]=${values[key]}`)
            })
            let result = params.join('&')
            console.log('Received values of form: ',JSON.stringify(values), params, result);
            Myfetch.all(`customers?${result}`).then(data => {
            console.log(data)

                this.props.search(data, result)
            })
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const {expand} = this.state;
        this.setState({
            expand: !expand
        });
    }

    toNew = () => {
        this.props.toNew()
    }

    render() {
        return (
            <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
            >
                    <Row gutter={20}>{this.getFields()}</Row>
                    <Row>
                      <Col span={24} style={{
                                                textAlign: 'right'
                                            }}>
                        <Button icon="search" type="primary" htmlType="submit">搜索</Button>
                        <Button icon='edit' style={{
                                            marginLeft: 8
                                        }} onClick={this.handleReset}>
                          清除
                        </Button>
                        <Button type="dashed" icon='export' style={{marginLeft: 8}}>导出</Button>

                        <Button className='skio-button-creator' onClick={this.toNew} style={{marginLeft: 8}} icon="plus">添加</Button>

                        <a style={{
                                        marginLeft: 8,
                                        fontSize: 12
                                    }} onClick={this.toggle}>
                          {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                      </Col>
                    </Row>
                  </Form>
        )
    }


    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const {getFieldDecorator} = this.props.form;
        const searchFields = [{key: "name_cont", value: '姓名'}, {key: 'phone_eq', value: '手机号'}]
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            },
        };
        const children = [];
        searchFields.forEach((item, i) => {
            children.push(
                <Col span={8} key={i}>
                  <FormItem {...formItemLayout} label={item['value']}>
                    {getFieldDecorator(item['key'], {
                        initialValue: ""
                    })(
                        <Input placeholder="请输入查找的内容" />
                    )}
                  </FormItem>
            </Col>
            );
        })
        
        return children;
    }
}


const WrappedAdvancedSearchForm = Form.create()(SearchForm);
export default WrappedAdvancedSearchForm;
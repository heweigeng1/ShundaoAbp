import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Advance,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Upload,
} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
  advance: state.advance,
}))
@Form.create()
export default class AdvanceModel extends PureComponent {
  constructor() {
    super();
  }
  componentDidMount() { }

  isOk = () => {
    const { data: { Name }, isAdd } = this.props.advance.modal;
    const { dispatch, form, headerSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      const entity = {
        ...fieldsValue,
        Id: fieldsValue.key,
      };
      if (err) return;
      if (isAdd) {
        dispatch({
          type: 'advance/add',
          payload: { entity, headerSearch },
        });
      } else {
        dispatch({
          type: 'advance/update',
          payload: { entity, headerSearch },
        });
      }
    });
  };
  initFormItem = (isAdd, form, data) => {
    if (!isAdd) {
      return form.getFieldDecorator('key', {
        initialValue: data.key,
      })(<input type="hidden" />);
    }
  };
  render() {
    const _this = this;
    const { onCancel, form } = this.props;
    const { modal: { title, data, isAdd, modalVisible, confirmLoading } } = this.props.advance;
    console.log(data)
    return (
      <Modal
        title={title}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        onOk={this.isOk}
        onCancel={onCancel}
        destroyOnClose={true}
      >
        {this.initFormItem(isAdd, form, data)}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名称">
          {form.getFieldDecorator('UserId', {
            initialValue: data.UserId,
            //defaultValue:data.UserName,
            rules: [{ required: true, message: '请选择用户名称' }],
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              {
                this.props.advance.userList && this.props.advance.userList.map(function (item) {
                  return (<Select.Option key={item.key} value={item.key}>{item.UserName}</Select.Option>)
                })
              }
            </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="商品名称">
          {form.getFieldDecorator('ProductId', {
            initialValue: data.ProductId,
            //defaultValue:data.ProductName,
            rules: [{ required: true, message: '请选择商品名称' }],
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              {
                this.props.advance.proList && this.props.advance.proList.map(function (item) {
                  return (<Select.Option key={item.key} value={item.key}>{item.Name}</Select.Option>)
                })
              }
            </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="奖励金额">
          {form.getFieldDecorator('Amount', {
            initialValue: data.Amount,
            rules: [{ required: true, message: '请输入奖励金额' }],
          })(<InputNumber min={0}
            max={100}
            style={{ 'width': '100%' }} placeholder="请输入奖励金额" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="奖励类型">
          {form.getFieldDecorator('AdvanceKind', {
            initialValue: data.AdvanceKindStr,
            rules: [{ required: true, message: '请选择奖励类型' }],
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              {
                this.props.advance.selectList && this.props.advance.selectList.map(function (item) {
                  return (<Select.Option key={item.key} value={item.key}>{item.AdvanceKindStr}</Select.Option>)
                })
              }
            </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="奖励点数">
          {form.getFieldDecorator('AdvanceProportion', {
            initialValue: data.AdvanceProportion,
            rules: [{ required: true, message: '请输入奖励点数' }],
          })(<InputNumber min={0}
            max={100}
            style={{ 'width': '100%' }} placeholder="请输入奖励点数" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="奖励描述">
          {form.getFieldDecorator('Describe', {
            initialValue: data.Describe,
            rules: [{ required: true, message: '请输入奖励描述' }],
          })(<TextArea rows={4} placeholder="请输入奖励描述" />)}
        </FormItem>
      </Modal>
    );
  }
}

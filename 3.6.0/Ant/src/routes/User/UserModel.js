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
  User,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Upload,
} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
  user: state.user,
}))
@Form.create()
export default class UserModel extends PureComponent {
  constructor() {
    super();
  }
  componentDidMount() { }

  isOk = () => {
    const { data: { Name }, isAdd } = this.props.user.modal;
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
          type: 'user/add',
          payload: { entity, headerSearch },
        });
      } else {
        dispatch({
          type: 'user/update',
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
    const { modal: { title, data, isAdd, modalVisible, confirmLoading } } = this.props.user;
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
          {form.getFieldDecorator('UserName', {
            initialValue: data.UserName,
            rules: [{ required: true, message: '请输入用户名' }],
          })(<Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
          {form.getFieldDecorator('PhoneNum', {
            initialValue: data.PhoneNum,
            rules: [{ required: true, message: '请输入手机号' }],
          })(<Input placeholder="请输入手机号" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
          {form.getFieldDecorator('Password', {
            initialValue: data.Password,
            rules: [{ required: true, message: '请输入密码' }],
          })(<Input placeholder="请输入密码" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="昵称">
          {form.getFieldDecorator('NickName', {
            initialValue: data.NickName,
            rules: [{ required: true, message: '请输入昵称' }],
          })(<Input placeholder="请输入昵称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户角色">
        {form.getFieldDecorator('RoleId', {
            initialValue: data.RoleId,
            rules: [{ required: true, message: '请选择用户角色' }],
          })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            {
              this.props.user.selectList && this.props.user.selectList.map(function (item) {
                return (<Select.Option key={item.key} value={item.key}>{item.Name}</Select.Option>)})
            }
          </Select>)}
        </FormItem>
      </Modal>
    );
  }
}

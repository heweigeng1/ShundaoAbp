import React, { PureComponent } from "react";
import { connect } from "dva";
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
  SyStemInfo,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Upload
} from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
  systeminfo: state.systeminfo
}))
@Form.create()
export default class SyStemInfoModel extends PureComponent {
  state = {
    Keys:[]
}
  componentDidMount() {
  }

  isOk = () => {
    const { data: { Name }, isAdd } = this.props.systeminfo.modal;
    const { dispatch, form, headerSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      this.NickName = this.state.Keys;
      const entity = {
        ...fieldsValue,
        Id: fieldsValue.key
      };
      if (err) return;
      console.log(fieldsValue);
      if (isAdd) {
        dispatch({
          type: "systeminfo/add",
          payload: { entity, headerSearch }
        });
      } else {
        dispatch({
          type: "systeminfo/update",
          payload: { entity, headerSearch }
        });
      }
    });
  };
  initFormItem = (isAdd, form, data) => {
    if (!isAdd) {
      return form.getFieldDecorator("key", {
        initialValue: data.key
      })(<input type="hidden" />);
    }
  };
  hashuser = (key) => {
    this.setState({ Keys :key })
    console.log({key});
  };
  render() {
    const _this = this;
    const { onCancel, form } = this.props;
    const {
      modal: { title, data, isAdd, modalVisible, confirmLoading }
    } = this.props.systeminfo;
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户昵称" >
        {form.getFieldDecorator('UserId', {
            initialValue: data.UserId,
            rules: [{ required: true, message: '请选择用户昵称' }],
          })(
          <Select mode="multiple" onChange={this.hashuser} placeholder="请选择" style={{ width: '100%' }}>
            {
              this.props.systeminfo.selectList && this.props.systeminfo.selectList.map(function (item) {
                return (<Select.Option key={item.key} value={item.key}>{item.NickName}</Select.Option>)})
            }
            
          </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="消息类型">
        {form.getFieldDecorator('SysInfoType', {
            initialValue: data.SysInfoType,
            rules: [{ required: true, message: '请选择消息类型' }],
          })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
          <Select.Option value="0" >注册成功</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="消息内容">
          {form.getFieldDecorator('Content', {
            initialValue: data.Content,
            rules: [{ required: true, message: '请输入内容' }],
          })(<Input placeholder="请输入内容" />)}
        </FormItem>
      </Modal>
    );
  }
}

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
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Upload
} from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
  role: state.role
}))
@Form.create()
export default class RoleModel extends PureComponent {
  constructor() {
    super();
  }
  componentDidMount() { }

  isOk = () => {
    const { data: { Name }, isAdd } = this.props.role.modal;
    const { dispatch, form, headerSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      const entity = {
        ...fieldsValue,
        Id: fieldsValue.key
      };
      if (err) return;
      if (isAdd) {
        dispatch({
          type: "role/add",
          payload: { entity, headerSearch }
        });
      } else {
        dispatch({
          type: "role/update",
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
  render() {
    const _this = this;
    const { onCancel, form } = this.props;
    const {
      modal: { title, data, isAdd, modalVisible, confirmLoading }
    } = this.props.role;
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
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="角色名"
        >
          {form.getFieldDecorator("Name", {
            initialValue: data.Name,
            rules: [{ required: true, message: "请输入角色名称" }]
          })(<Input placeholder="请输入角色名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator("Remark", {
            initialValue: data.Remark,
            rules: [{ required: true, message: "请输入备注" }]
          })(<Input placeholder="请输入备注" />)}
        </FormItem>
      </Modal>
    );
  }
}

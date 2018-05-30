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
  menu: state.menu
}))
@Form.create()
export default class MenuModel extends PureComponent {
  constructor() {
    super();
  }
  componentDidMount() {}

  isOk = () => {
    const { data: { Name }, isAdd } = this.props.menu.modal;
    const { dispatch, form, headerSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      const entity = {
        ...fieldsValue,
        Id: fieldsValue.key
      };
      if (err) return;
      if (isAdd) {
        dispatch({
          type: "menu/add",
          payload: { entity, headerSearch }
        });
      } else {
        dispatch({
          type: "menu/update",
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
    } = this.props.menu;
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
          label="父菜单名"
        >
          {form.getFieldDecorator("Pid", {
            initialValue: data.Pid,
            rules: [{ required: true, message: "请输入菜单名" }]
          })(
            <Select placeholder="请选择" 
            style={{ width: '100%' }}
        >
           {
           this.props.menu.selectList && this.props.menu.selectList.map(function(item){
                         return (<Select.Option key={item.key} value={item.key}>{item.title}</Select.Option>)})
    }
        </Select>
        )
          }
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="菜单名"
        >
          {form.getFieldDecorator("Name", {
            initialValue: data.Name,
            rules: [{ required: true, message: "请输入菜单名" }]
          })(<Input placeholder="请输入菜单名" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图标">
          {form.getFieldDecorator("Icon", {
            initialValue: data.Icon,
            rules: [{ required: true, message: "请输入图标" }]
          })(<Input placeholder="请输入图标" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="路径">
          {form.getFieldDecorator("Path", {
            initialValue: data.Path,
            rules: [{ required: true, message: "请输入路径" }]
          })(<Input placeholder="请输入路径" />)}
        </FormItem>
      </Modal>
    );
  }
}

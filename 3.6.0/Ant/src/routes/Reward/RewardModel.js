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
import { withLatestFrom } from "rxjs/operators";
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
  reward: state.reward
}))
@Form.create()
export default class MenuModel extends PureComponent {
  constructor() {
    super();
  }
  componentDidMount() { }

  isOk = () => {
    const { data: { Name }, isAdd } = this.props.reward.modal;
    const { dispatch, form, headerSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      const entity = {
        ...fieldsValue,
        Id: fieldsValue.key
      };
      if (err) return;
      if (isAdd) {
        dispatch({
          type: "reward/add",
          payload: { entity, headerSearch }
        });
      } else {
        dispatch({
          type: "reward/update",
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
    } = this.props.reward;
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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          label="等级名称"
        >
          {form.getFieldDecorator("Name", {
            initialValue: data.Name,
            rules: [{ required: true, message: "请输入等级名称" }]
          })(<Input placeholder="请输入等级名称" />)}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          label="初始等级"
        >
          {form.getFieldDecorator("UserLevel", {
            initialValue: data.UserLevel,
            rules: [{ required: true, message: "请输入初始等级" }]
          })(
            <InputNumber
              min={1}
              max={10}
              style={{ 'width': '100%' }}
              placeholder="请输入初始等级"
            />
          )
          }
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          label="一级奖励比例"
        >
          {form.getFieldDecorator("OneLevelSpokesman", {
            initialValue: data.OneLevelSpokesman,
            rules: [{ required: true, message: "比例为0~100之间" }]
          })(
            <InputNumber
              min={0}
              max={100}
              style={{ 'width': '100%' }}
              placeholder="请输入一级奖励比例"
            />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15, width: 150 }}
          label="二级奖励比例"
        >
          {form.getFieldDecorator("TwoLevelSpokesman", {
            initialValue: data.TwoLevelSpokesman,
            rules: [{ required: true, message: "比例为0~100之间" }]
          })(
            <InputNumber
              min={0}
              max={100}
              style={{ 'width': '100%' }}
              placeholder="请输入二级奖励比例"
            />
          )}
        </FormItem>

        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          label="三级奖励比例"
        >
          {form.getFieldDecorator("ThereLevelSpokesman", {
            initialValue: data.ThereLevelSpokesman,
            rules: [{ required: true, message: "比例为0~100之间" }]
          })(
            <InputNumber
              min={0}
              max={100}
              style={{ 'width': '100%' }}
              placeholder="请输入三级奖励比例"
            />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          label="等级备注"
        >
          {form.getFieldDecorator("Remarks", {
            initialValue: data.Remarks,
            rules: [{ required: true, message: "等级备注" }]
          })(<TextArea rows={4} placeholder="等级备注" />)}
        </FormItem>
      </Modal>
    );
  }
}

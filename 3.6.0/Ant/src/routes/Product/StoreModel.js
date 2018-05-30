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
    Store,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Upload
} from "antd";
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(state => ({
    store: state.store
}))
@Form.create()
export default class StoreModel extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() { }

    isOk = () => {
        const { data: { Name }, isAdd } = this.props.store.modal;
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
                    type: "store/add",
                    payload: { entity, headerSearch }
                });
            } else {
                dispatch({
                    type: "store/update",
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
        } = this.props.store;
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
                    label="商品名称"
                >
                    {form.getFieldDecorator("ProductId", {
                        initialValue: data.ProductId,
                    })(
                        <Select placeholder="请选择"
                            style={{ width: '100%' }}
                        >
                            {
                                this.props.store.selectList && this.props.store.selectList.map(function (item) {
                                    return (<Select.Option key={item.key} value={item.key}>{item.Name}</Select.Option>)
                                })
                            }
                        </Select>
                    )
                    }
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="进货数量"
                >
                    {form.getFieldDecorator("Amount", {
                        initialValue: data.Amount,
                        rules: [{ required: true, message: "请输入进货数量" }]
                    })(<InputNumber min={0}
                        max={100}
                        style={{ 'width': '100%' }} placeholder="请输入进货数量" />)}
                </FormItem>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="进货单价">
                    {form.getFieldDecorator("Price", {
                        initialValue: data.Price,
                        rules: [{ required: true, message: "请输入进货单价" }]
                    })(<InputNumber min={0}
                        max={100}
                        style={{ 'width': '100%' }} placeholder="请输入进货单价" />)}
                </FormItem>
            </Modal>
        );
    }
}

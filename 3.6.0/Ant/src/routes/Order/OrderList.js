import React, { PureComponent } from "react";
import { connect } from "dva";
import moment from "moment";
import {
    Popconfirm,
    Table,
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    TreeSelect,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Divider
} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "../List/TableList.less";
import style from "../Order/OrderList.less";
const FormItem = Form.Item;

@connect(state => ({
    order: state.order
}))
@Form.create()
export default class OrderList extends PureComponent {
    state = {
        selectedRows: [],
        formValues: {},
        value: ''
    };
    //初始化时加载表格数据.
    componentDidMount() {
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue
            };
            this.setState({
                formValues: values
            });
            dispatch({
                type: "order/GetState"
            });
            dispatch({
                type: "order/getTree"
            });
            dispatch({
                type: "order/search",
                payload: {
                    ...values,
                    pagination: {}
                }
            });
        });
    }
    onChange = (value) => {
        this.setState({ value });
    }
    //跳转页面
    changeVisible = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: "order/orderdetail",
            payload: {
                data: record
            }
        });
    };

    ExportExcel = () => {
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue
            };
            dispatch({
                type: "order/ExportExcel",
                payload: {
                    ...values,
                    pagination: {}
                }
            });
        });
    }
    tableChanger = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        //查询选项
        const { formValues } = this.state;

        dispatch({
            type: "order/search",
            payload: {
                ...formValues,
                pagination: {
                    ...pagination,
                    sorter: sorter.field,
                    order: sorter.order
                }
            }
        });
    };
    //搜索按钮
    search = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue
            };
            this.setState({
                formValues: values
            });
            dispatch({
                type: "order/search",
                payload: {
                    ...values,
                    pagination: {}
                }
            });
        });
    };
    // 事件 传参方法
    changeDelflag = record => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        dispatch({
            type: "order/changeDelflag",
            payload: { record, formValues }
        });
    };
    render() {
        const {
            data: { list, pagination },
            loading,
            ListTree,
            modal: { modalVisible }
        } = this.props.order;
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;
        const { Option } = Select;
        const { formValues } = this.state;
        const paginationProps = {
            //显示每页显示多少条数据
            showSizeChanger: true,
            //快速跳转到第几页
            showQuickJumper: false,
            ...pagination
        };
        const columns = [
            {
                sorter: true,
                title: "订单编号",
                dataIndex: "OrderNum"
            },
            {
                title: "联系人",
                dataIndex: "LinkMan"
            },
            {
                title: "联系人电话",
                dataIndex: "LinkPhone"
            },
            {
                title: "联系人地址",
                dataIndex: "LinkAddress"
            },
            {
                title: "订单状态",
                dataIndex: "OrderStatusStr",
            },
            {
                title: "操作",
                dataIndex: "action",
                render: (text, record) => (
                    <span className={style.editBtn}>
                        <Popconfirm
                            title={"确定删除?"}
                            okText="Yes"
                            onConfirm={() => this.changeDelflag(record)}
                            cancelText="No"
                        >
                            <a>删除</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a onClick={() => this.changeVisible(record)}>订单详情</a>
                    </span>
                )
            }
        ];
        return (
            //标头
            <PageHeaderLayout title="订单管理">
                {/* 包裹table的白底块 */}
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Form onSubmit={this.search}>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={6} sm={6}>

                                    <FormItem
                                        label="奖励类型"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator('OrderStatus')(
                                            <Select placeholder="请选择">
                                                {
                                                    this.props.order.selectList && this.props.order.selectList.map(function (item) {
                                                        return (<Select.Option key={item.OrderStatus} value={item.OrderStatus}>{item.OrderStatusStr}</Select.Option>)
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>

                                <Col md={6} sm={6}>
                                    <FormItem
                                        label="省市"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator("AreaCode")
                                            (<TreeSelect
                                                setFieldsValue={this.state.value}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeData={ListTree}
                                                placeholder="请选择"
                                            />)
                                        }
                                    </FormItem>
                                </Col>
                                <Col md={6} sm={6}>
                                    <FormItem
                                        label="订单编号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator("OrderNum")(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>

                                <Col md={6} sm={6}>
                                    <FormItem
                                        label="联系人"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator("LinkMan")(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={6} sm={6}>
                                    <FormItem
                                        label="联系电话"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator("LinkPhone")(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col offset={2} md={6} sm={6}>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit">
                                            查询
                                        </Button>
                                        <Button
                                            className={style.addUser}
                                            icon="file-excel"
                                            type="primary"
                                            style={{ marginLeft: 40 }}
                                            onClick={() => this.ExportExcel()}
                                        >
                                            导出Excel
                                        </Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <Table
                            bordered={true}
                            loading={loading}
                            dataSource={list}
                            pagination={paginationProps}
                            columns={columns}
                            onChange={this.tableChanger}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}

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
    Icon,
    Button,
    Dropdown,
    Refund,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Divider
} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "../List/TableList.less";
import style from "../List/FeedBackList.less";
const FormItem = Form.Item;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(",");

@connect(state => ({
    refund: state.refund
}))
@Form.create()
export default class FeedBackList extends PureComponent {
    state = {
        selectedRows: [],
        formValues: {}
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
                type: "refund/search",
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
            type: "refund/search",
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
                type: "refund/search",
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
        console.log('00')
        dispatch({
            type: "refund/changeDelflag",
            payload: { record, formValues }
        });
    };
    //显示添加模态框
    hideModal = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "refund/hideVisible"
        });
    };
    selectBox = value => { };
    render() {
        const {
            data: { list, pagination },
            loading,
            modal: { modalVisible }
        } = this.props.refund;
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
                title: "退款单号",
                dataIndex: "RefundNo"
            },
            {
                sorter: true,
                title: "退款金额",
                dataIndex: "RefundFee"
            },
            {
                title: "退款原因",
                dataIndex: "Reason"
            },

            {
                title: "退款状态",
                dataIndex: "RefundStatusStr"
            },
            {
                sorter: true,
                title: "退款时间",
                dataIndex: "CreatedTime",
                render: val => <span>{moment(val).format("YYYY-MM-DD")}</span>
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
                    </span>
                )
            }
        ];
        return (
            //标头
            <PageHeaderLayout title="退款记录">
                {/* 包裹table的白底块 */}
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Form onSubmit={this.search}>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={6} sm={6}>
                                    <FormItem
                                        label="退款单号"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator("RefundNo")(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col md={6} sm={6}>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit">
                                            查询
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
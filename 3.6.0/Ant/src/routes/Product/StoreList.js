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
    Store,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Divider
} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "../List/TableList.less";
import style from "../Menu/AdminList.less";
import StoreModel from "./StoreModel";
const FormItem = Form.Item;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(",");

@connect(state => ({
    store: state.store
}))
@Form.create()
export default class MenuList extends PureComponent {
    state = {
        selectedRows: [],
        formValues: {}
    };
    //初始化时加载表格数据.
    componentDidMount() {
        const CourseId = this.props.location.search.substring(4, 40);
        console.log(this.props)
        const { dispatch, form } = this.props;
        dispatch({
            type: "store/getproduct",
            payload: { key: CourseId }
        });
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue
            };
            this.setState({
                formValues: values
            });
           
        });
        
        if (CourseId != '') {
            dispatch({
                type: 'store/search',
                payload: { ProductId: CourseId },
                pagination: {}
            });
        }
        
    }
    tableChanger = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        //查询选项
        const { formValues } = this.state;

        dispatch({
            type: "store/search",
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
                type: "store/search",
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
            type: "store/changeDelflag",
            payload: { record, formValues }
        });
    };
    //显示添加模态框
    changeVisible = (record, formValues) => {
        const { dispatch } = this.props;
        if (record != undefined) {
            dispatch({
                type: "store/changeModalVisible",
                payload: {
                    title: "编辑-" + record.Name,
                    data: record,
                    isAdd: false,
                    formValues: formValues
                }
            });
        } else {
            dispatch({
                type: "store/changeModalVisible",
                payload: {
                    title: "新增",
                    data: {},
                    isAdd: true,
                    formValues: formValues
                }
            });
        }
    };
    hideModal = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "store/hideVisible"
        });
    };
    selectBox = value => { };
    render() {
        const {
            data: { list, pagination },
            loading,
            modal: { modalVisible }
        } = this.props.store;
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
                title: "商品名称",
                dataIndex: "ProductName"
            },
            {
                title: "进货数量",
                dataIndex: "Amount"
            },
            {
                title: "进货单价",
                dataIndex: "Price"
            },
            {
                sorter: true,
                title: "进货时间",
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
                        <Divider type="vertical" />
                        <a onClick={() => this.changeVisible(record, formValues)}>编辑</a>
                    </span>
                )
            }
        ];
        return (
            //标头
            <PageHeaderLayout title="进货记录">
                {/* 包裹table的白底块 */}
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Form onSubmit={this.search}>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={6} sm={6}>
                                    <FormItem
                                        label="商品名称"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator('ProductName')
                                        (
                                            <Input/>
                                        )}
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
                        <Button
                            className={style.addUser}
                            icon="plus"
                            type="primary"
                            onClick={() => this.changeVisible()}
                        >
                            新增
            </Button>
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
                <StoreModel
                    headerSearch={formValues}
                    onCancel={() => this.hideModal()}
                />
            </PageHeaderLayout>
        );
    }
}

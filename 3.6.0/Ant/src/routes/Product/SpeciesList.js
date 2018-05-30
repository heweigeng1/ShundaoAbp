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
    Species,
    InputNumber,
    DatePicker,
    TreeSelect,
    Modal,
    message,
    Divider
} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "../List/TableList.less";
import style from "../Product/ProductList.less";
const FormItem = Form.Item;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(",");

@connect(state => ({
    species: state.species
}))
@Form.create()
export default class SpeciesList extends PureComponent {
    state = {
        formValues: {}
    };
    //初始化时加载表格数据.
    componentDidMount() {
        const { dispatch, form } = this.props;
        dispatch({
            type: "species/getlist"
        });
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue
            };
            this.setState({
                formValues: values
            });
            dispatch({
                type: "species/search",
                payload: {
                    ...values,
                    pagination: {}
                }
            });
        });
    }
    componentDidUpdate() {

    }
    tableChanger = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        //查询选项
        const { formValues } = this.state;

        dispatch({
            type: "species/search",
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
                type: "species/search",
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
            type: "species/changeDelflag",
            payload: { record, formValues }
        });
    };
    //显示添加模态框
    changeVisible = (record, formValues) => {
        const { dispatch } = this.props;
        if (record != undefined) {
            dispatch({
                type: "species/changespecies",
                payload: {
                    data: record
                }
            });
        } else {
            dispatch({
                type: "species/changespecies",
                payload: {
                    data: { key: '' },
                }
            });
        }
    };
    handleTap = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: "species/changespecies",
            payload: {
                data: record
            }
        });
    }
    hideModal = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "species/hideVisible"
        });
    };
    // selectBox = value => {};
    render() {
        const {
            data: { list, pagination },
            loading,
            treedata,
            modal: { modalVisible }
        } = this.props.species;
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;
        //const { Option } = Select;
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
                title: "类型名称",
                dataIndex: "Name"
            },
            {
                sorter: true,
                title: "添加时间",
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
                        <a onClick={() => this.handleTap(record, formValues)}>编辑</a>
                    </span>
                )
            }
        ];
        return (
            //标头
            <PageHeaderLayout title="商品类型">
                {/* 包裹table的白底块 */}
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Form onSubmit={this.search}>
                            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                                <Col md={6} sm={6}>
                                    <FormItem
                                        label="类型名称"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {getFieldDecorator("SpeName")(<Input placeholder="请输入" />)}
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
                        {
                            list &&
                            <Table
                                bordered={true}
                                loading={loading}
                                dataSource={list}
                                pagination={paginationProps}
                                columns={columns}
                                onChange={this.tableChanger}
                            />
                        }
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
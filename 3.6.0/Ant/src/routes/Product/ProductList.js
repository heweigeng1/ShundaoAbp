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
  Product,
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
  product: state.product
}))
@Form.create()
export default class ProductList extends PureComponent {
  state = {
    formValues: {}
  };
  //初始化时加载表格数据.
  componentDidMount() {
    const { dispatch, form } = this.props;
        dispatch({
            type: "product/getlist"
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
        type: "product/search",
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
      type: "product/search",
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
        type: "product/search",
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
      type: "product/changeDelflag",
      payload: { record, formValues }
    });
  };
  //显示添加模态框
  changeVisible = (record, formValues) => {
    const { dispatch } = this.props;
    if (record != undefined) {
      dispatch({
        type: "product/changeproduct",
        payload: {
          data: record
        }
      });
    } else {
      dispatch({
        type: "product/changeproduct",
        payload: {
          data: { key: '' },
        }
      });
    }
  };
  handleTap = (record) => {
    const { dispatch } = this.props;
    console.log(this.props.product)
    dispatch({
      type: "product/changeproduct",
      payload: {
        data: record
      }
    });
    console.log(this.props.product)
  }
  StorePage = (record) => {
    console.log(record)
    const { dispatch } = this.props;
    console.log(this.props.product)
    dispatch({
      type: "product/showstorepage",
      payload: {
        data: record
      }
    });
  }
  hideModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "product/hideVisible"
    });
  };
  // selectBox = value => {};
  render() {
    const {
      data: { list, pagination },
      loading,
      treedata,
      modal: { modalVisible }
    } = this.props.product;
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
        title: "商品名称",
        dataIndex: "Name"
      },
      {
        title: "商品型号",
        dataIndex: "Type"
      },
      {
        title: "商品类型",
        dataIndex: "SpciesName"
      },
      {
        title: "商品原价",
        dataIndex: "Price"
      },
      {
        title: "商品售价",
        dataIndex: "Sales"
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
            <Divider type="vertical" />
            <a onClick={() => this.StorePage(record, formValues)}>查看进货记录</a>
          </span>
        )
      }
    ];
    return (
      //标头
      <PageHeaderLayout title="商品管理">
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
                    {getFieldDecorator('SpeciesId')(
                      <TreeSelect
                        style={{ width: 150 }}
                        setFieldsValue={this.state.value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treedata}
                        placeholder="请选择"
                        treeDefaultExpandAll
                        onChange={this.onChange}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col md={6} sm={6}>
                  <FormItem
                    label="商品名称"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                  >
                    {getFieldDecorator("Name")(<Input placeholder="请输入" />)}
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

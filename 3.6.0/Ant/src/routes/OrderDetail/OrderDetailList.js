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
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Divider
} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "../List/TableList.less";
import style from "../OrderDetail/OrderDetailList.less";
const FormItem = Form.Item;

@connect(state => ({
  orderdetail: state.orderdetail
}))
@Form.create()
export default class OrderDetailList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {}
  };
  //初始化时加载表格数据.
  componentDidMount() {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const OrderId = this.props.location.search.substring(9, 45);
      dispatch({
        type: "orderdetail/search",
        payload: {
          key:OrderId,
          pagination: {}
        }
      });
    });
  }

  tableChanger = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const OrderId = this.props.location.search.substring(9, 45);

    dispatch({
      type: "orderdetail/search",
      payload: {
        pagination: {
          ...pagination,
          key:OrderId,
          sorter: sorter.field,
          orderdetail: sorter.orderdetail
        }
      }
    });
  };
  // 事件 传参方法
  changeDelflag = record => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: "orderdetail/changeDelflag",
      payload: { record, formValues }
    });
  };
  render() {

    const {
      data: { list, pagination },
      loading,
      modal: { modalVisible }
    } = this.props.orderdetail;
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
        title: "商品名",
        dataIndex: "ProductName"
      },
      {
        title: "商品图",
        dataIndex: "ProductUrl"
      },
      {
        title: "购买数量",
        dataIndex: "Amount",
      },
      {
        title: "原价",
        dataIndex: "Price",
      },
      {
        title: "购买价",
        dataIndex: "Sales",
      },
    ];
    return (
      //标头
      <PageHeaderLayout title="订单详情">
        {/* 包裹table的白底块 */}
        <Card bordered={false}>
          <div className={styles.tableList}>
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

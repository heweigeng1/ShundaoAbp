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
import style from "../Reward/RewardList.less";
import RewardModel from "./RewardModel";
const FormItem = Form.Item;

@connect(state => ({
  reward: state.reward
}))
@Form.create()
export default class RewardList extends PureComponent {
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
        type: "reward/search",
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
      type: "reward/search",
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
        type: "reward/search",
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
      type: "reward/changeDelflag",
      payload: { record, formValues }
    });
  };
  //显示添加模态框
  changeVisible = (record, formValues) => {
    const { dispatch } = this.props;
    if (record != undefined) {
      dispatch({
        type: "reward/changeModalVisible",
        payload: {
          title: "编辑-" + record.Name,
          data: record,
          isAdd: false,
          formValues: formValues
        }
      });
    } else {
      dispatch({
        type: "reward/changeModalVisible",
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
      type: "reward/hideVisible"
    });
  };
  selectBox = value => { };
  render() {

    const {
      data: { list, pagination },
      loading,
      modal: { modalVisible }
    } = this.props.reward;

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
        title: "等级名称",
        dataIndex: "Name"
      },
      {
        title: "起始等级",
        dataIndex: "UserLevel"
      },
      {
        title: "一级奖励比例",
        dataIndex: "OneLevelSpokesman",
        render: val => <span>{val + '%'}</span>
      },
      {
        title: "二级奖励比例",
        dataIndex: "TwoLevelSpokesman",
        render: val => <span>{val + '%'}</span>
      },
      {
        title: "三级奖励比例",
        dataIndex: "ThereLevelSpokesman",
        render: val => <span>{val + '%'}</span>
      },
      {
        title: "等级备注",
        dataIndex: "Remarks"
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
            <a onClick={() => this.changeVisible(record, formValues)}>编辑</a>
          </span>
        )
      }
    ];
    return (
      //标头
      <PageHeaderLayout title="奖励管理">
        {/* 包裹table的白底块 */}
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Form onSubmit={this.search}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={6}>
                  <FormItem
                    label="等级名称"
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
        <RewardModel
          headerSearch={formValues}
          onCancel={() => this.hideModal()}
        />
      </PageHeaderLayout>
    );
  }
}

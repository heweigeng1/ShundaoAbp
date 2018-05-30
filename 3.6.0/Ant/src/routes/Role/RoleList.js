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
  Divider,
  Tree 
} from "antd";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "../List/TableList.less";
import style from "../Role/RoleList.less";
import RoleModel from "./RoleModel";
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(",");

@connect(state => ({
  role: state.role
}))
@Form.create()
export default class RoleList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    visible: false ,
    autoExpandParent: true,
    selectedKeys: [],
    checkedKeys: [],
    roleId: '',
    loading:false
  };
  //初始化时加载表格数据.
  componentDidMount() {
    
    const { dispatch, form } = this.props;
    dispatch({
      type: "role/getTree",
      payload: {key:''}
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
        type: "role/search",
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
      type: "role/search",
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
        type: "role/search",
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
      type: "role/changeDelflag",
      payload: { record, formValues }
    });
  };
  //显示添加模态框
  changeVisible = (record, formValues) => {
    const { dispatch } = this.props;
    if (record != undefined) {
      dispatch({
        type: "role/changeModalVisible",
        payload: {
          title: "编辑-" + record.Name,
          data: record,
          isAdd: false,
          formValues: formValues
        }
      });
    } else {
      dispatch({
        type: "role/changeModalVisible",
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
      type: "role/hideVisible"
    });
  };
  selectBox = value => {};
   // 模态框弹出开始
  showModal = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: "role/getmenu",
      payload: { key:record.key }
    });
    setTimeout(()=>{
      this.setState({
        visible: true,
        roleId: record.key,
        checkedKeys: this.props.role.keyList ? this.props.role.keyList : []
      });
    },300)
    
  
  }
  handleOk = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: "role/savemenu",
      payload: { RoleId:this.state.roleId, TargetKeys:this.state.checkedKeys}
    });
    this.setState({
      visible: false,
    });
    // console.log(this.state.checkedKeys);
    // console.log(this.state.roleId);
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 模态框弹出结束

  // 树结构开始
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  }
  renderTreeNodes = (data) => {
    if (data) {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
      });
    }
  }
   // 树结构结束
  render() {
    const {
      data: { list, pagination },
      loading,
      modal: { modalVisible }
    } = this.props.role;
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
        title: "角色名",
        dataIndex: "Name"
      },
      {
        title: "备注",
        dataIndex: "Remark"
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
            <Divider type="vertical" />
            <a onClick={() => this.showModal (record)}>配置</a>
          </span>
        )
      }
    ];
    const treeData = this.props.role ? this.props.role.treeList : ''
    return (
      //标头
      <PageHeaderLayout title="角色管理">
        {/* 包裹table的白底块 */}
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Form onSubmit={this.search}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={6}>
                  <FormItem
                    label="角色名"
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
        <RoleModel
          headerSearch={formValues}
          onCancel={() => this.hideModal()}
        />
        <Modal
          title="角色管理"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            selectedKeys={this.state.checkedKeys}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
        </Modal>
      </PageHeaderLayout>
    );
  }
}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, span, Button, Row, Col, Card, InputNumber, Radio, Icon, TreeSelect, Tooltip, Upload, message, Modal, Switch
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { host } from '../../utils/utils';
import { searchToObj } from '../../utils/queryString';
import styles from '../Forms/style.less';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import UploadStyles from './Upload.less';
import { ARRAY_TYPE } from 'gl-matrix/src/gl-matrix/common';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  species: state.species,
}))
@Form.create()
export default class SpeciesModel extends PureComponent {
  state = {
    loading: false,
    contentHtml: null,
    previewVisible: false,
    previewImage: "",
    file: '',
    Img: '',
    count: 0,
    value: undefined,
  }
  //加载控件前
  componentWillMount() {
    const { dispatch, form } = this.props;
    dispatch({
      type: "species/getlist"
    });
  }
  //加载控件后
  componentDidMount() {
    const { dispatch, form } = this.props;
    const CourseId = this.props.location.search.substring(4, 40);
    if (CourseId == '') { } else {
      dispatch({
        type: 'species/getspecies',
        payload: { key: CourseId }
      }).then((data) => {
        var attchUrl = this.props.species.data.specieslist.IconPath
        this.setState({
          file: attchUrl
        });
      });
    }
  }
  handlePreview = (file) => {
  }
  handleSubmit = (e) => {
    const { location, species: { info } } = this.props;
    const CourseId = this.props.location.search.substring(4, 40);
    const list = this.props.species.data.list;
    e.preventDefault();
    var obj = searchToObj(location.search);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (CourseId == '') {
          this.props.dispatch({
            type: 'species/add',
            payload: {
              ...values,
              IconPath: this.state.file,
              Status: values.Status ? 1 : 0,
            },
          });
        } else {
          console.log(CourseId)
          this.props.dispatch({
            type: 'species/update',
            payload: {
              ...values,
              IconPath: this.state.file,
              Status: values.Status ? 1 : 0,
              Id: CourseId
            },
          });
        }
      }
    });
  }
  onChange = (value) => {
    this.setState({ value });
  };
  handleChange = (info) => {
    const xhr = new XMLHttpRequest
    const fd = new FormData()
    const successFn = (response) => {
      this.setState({ file: JSON.parse(response.target.response).Value })
    }

    const progressFn = (event) => {
      console.log('progressFn')
    }

    const errorFn = (response) => {
      console.log('errorFn')
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)
    fd.append('file', info.file.originFileObj)
    xhr.open('POST', host + '/api/attach/uploadAttach', true)
    xhr.send(fd)
  };
  onRemove = (info) => {

  }

  brafthandleChange = (content) => {
  }
  brafthandleHTMLChange = (contentHtml) => {
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const list = this.props.species && this.props.species.data.specieslist;
    const { submitting, species } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const mediaProps = {
      allowPasteImage: true,
      image: true,
      uploadFn: this.uploadFn,
      onChange: console.log,
      onRemove: console.log
    }
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    };
    const editorProps = {
      height: 500,
      initialContent: "",
      onChange: this.brafthandleChange,
      onHTMLChange: this.brafthandleHTMLChange,
      contentFormat: 'html'
    }
    function beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 6;
      // console.log(isLt2M)
      // if (!isLt2M) {
      //     message.error('Image must smaller than 6M!');
      // }
      // return isJPG && isLt2M;
      return true;
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">类型图标</div>
      </div>
    );
    return (
      <PageHeaderLayout title="商品类型">
        {
          <Form layout="vertical" hideRequiredMark >
            <Card className={styles.card} bordered={false}>
              <Row>
                <FormItem label="类型名称"
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 22 }}>
                  {getFieldDecorator('Name', {
                    initialValue: list == null ? "" : list.Name,
                  })(
                    <Input />
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem label="上级类型"
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 22 }}>

                  {getFieldDecorator('Pid', {
                    initialValue: list == null ? "" : list.Pid,
                  })(
                    <TreeSelect
                      setFieldsValue={this.state.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={this.props.species.treedata}
                      placeholder="请选择"
                      onChange={this.onChange}
                    />
                  )}
                </FormItem>
              </Row>
              <Row gutter={16}>
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onRemove={this.onRemove}
                    onChange={this.handleChange}>
                    {this.state.file != '' ? <img style={{ 'width': '102px', 'height': '102px' }} src={host + this.state.file} alt="" /> : uploadButton}
                  </Upload>
              </Row>
            </Card>
            <Card bordered={false}>
              <Row gutter={16}>
                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
              </Row>
            </Card>

          </Form>
        }

      </PageHeaderLayout>

    );
  }
}

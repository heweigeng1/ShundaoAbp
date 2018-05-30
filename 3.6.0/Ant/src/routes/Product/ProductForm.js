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
    product: state.product,
}))
@Form.create()
export default class ProductForm extends PureComponent {
    state = {
        loading: false,
        contentHtml: null,
        previewVisible: false,
        previewImage: "",
        file: '',
        Img: '',
        count: 0,
        ImageList: [],
        value: undefined,
    }
    //加载控件前
    componentWillMount() {
        const { dispatch, form } = this.props;
        dispatch({
            type: "product/getlist"
        });
    }
    //加载控件后
    componentDidMount() {
        const { dispatch, form } = this.props;
        const CourseId = this.props.location.search.substring(4, 40);
        if (CourseId == '') { } else {
            dispatch({
                type: 'product/getproduct',
                payload: { key: CourseId }
            }).then((data) => {
                this.editorInstance.setContent(data, "html");
                var attchUrl = this.props.product.data.productlist.AttachUrl
                for (var i = 0; i < attchUrl.length; i++) {
                    var now = new Date().getTime() + 's';
                    var o = {
                        uid: now,
                        name: now,
                        status: 'done',
                        url: host + attchUrl[i].AttachUrl
                    };
                    this.setState({
                        ImageList: [...this.state.ImageList, o]
                    })
                }
                this.setState({
                    count: attchUrl.length
                })
                // this.setState({ fileList: this.props.product.data.productlist.AttachUrl })
            });
        }
    }
    handlePreview = (file) => {
    }
    handleSubmit = (e) => {
        const { location, product: { info } } = this.props;
        const CourseId = this.props.location.search.substring(4, 40);
        const list = this.props.product.data.list;
        e.preventDefault();
        var obj = searchToObj(location.search);
        var url = new Array()
        for (var i = 0; i < this.state.ImageList.length; i++) {
            console.log(this.state.ImageList[i].url)
            url[i] = this.state.ImageList[i].url.replace(host, '')
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (CourseId == '') {
                    console.log(values);
                    this.props.dispatch({
                        type: 'product/add',
                        payload: {
                            ...values,
                            AttachUrl: url,
                            Status: values.Status ? 1 : 0,
                            NameDes: this.editorInstance.getContent('html')
                        },
                    });
                } else {
                    this.props.dispatch({
                        type: 'product/update',
                        payload: {
                            ...values,
                            AttachUrl: url,
                            Status: values.Status ? 1 : 0,
                            NameDes: this.editorInstance.getContent('html'),
                            Id: CourseId
                        },
                    });
                }
            }
        });
    }
    onChange = (value) => {
        console.log(value);
        this.setState({ value });
    };
    handleChange = (info) => {
        this.setState({ ImageList: info.fileList })
        if (info.fileList.length - this.state.count === 1) {
            this.setState({
                count: info.fileList.length
            })
            const xhr = new XMLHttpRequest
            const fd = new FormData()
            const successFn = (response) => {
                var o = this.state.ImageList
                var now = new Date().getTime() + 's';
                o[this.state.ImageList.length - 1] = {
                    uid: now,
                    name: now,
                    status: 'done',
                    url: host + JSON.parse(response.target.response).Value
                };
                this.setState({
                    ImageList: o
                })
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
        }
    };
    onRemove = (info) => {

    }

    brafthandleChange = (content) => {
    }
    brafthandleHTMLChange = (contentHtml) => {
    }
    uploadFn = (param) => {
        const xhr = new XMLHttpRequest
        const fd = new FormData()
        const mediaLibrary = this.editorInstance.getMediaLibraryInstance()

        const successFn = (response) => {
            param.success(
                host + JSON.parse(response.target.response).Value
            )
            this.editorInstance.insertMedias([
                {
                    type: 'IMAGE',
                    name: 'New Photo',
                    url: host + JSON.parse(response.target.response).Value
                }
            ])
            mediaLibrary.items.splice(0, mediaLibrary.items.length);
        }

        const progressFn = (event) => {
            param.progress(event.loaded / event.total * 100)
        }

        const errorFn = (response) => {
            param.error({
                msg: 'unable to upload.'
            })
        }

        xhr.upload.addEventListener("progress", progressFn, false)
        xhr.addEventListener("load", successFn, false)
        xhr.addEventListener("error", errorFn, false)
        xhr.addEventListener("abort", errorFn, false)
        fd.append('file', param.file)
        xhr.open('POST', host + '/api/attach/uploadAttach', true)
        xhr.send(fd)

    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const list = this.props.product && this.props.product.data.productlist;
        const { submitting, product } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const mediaProps = {
            allowPasteImage: true,
            image: true,
            uploadFn: this.uploadFn,
            onChange: console.log,
            onRemove: console.log
        }
        console.log(list);
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
        console.log(this.props.product.treedata );
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
                <Icon type='plus' />
                <div className="ant-upload-text">商品图片</div>
            </div>
        );
        return (
            <PageHeaderLayout title="商品">
                {
                    <Form layout="vertical" hideRequiredMark >
                        <Card className={styles.card} bordered={false}>
                            <Row>
                                <FormItem label="商品名称"
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 22 }}>
                                    {getFieldDecorator('Name', {
                                        initialValue: list == null ? "" : list.Name,
                                        rules: [{
                                            required: true, message: '请输入商品名称',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="商品型号"
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 22 }}>
                                    {getFieldDecorator('Type', {
                                        initialValue: list == null ? "" : list.Type,
                                        rules: [{
                                            required: true, message: '请输入商品型号',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="商品类型"
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 22 }}>
                                    
                                    {getFieldDecorator('SpciesId', {
                                        initialValue:list == null ? "" : list.SpciesId,
                                    })(
                                        <TreeSelect
                                            setFieldsValue={this.state.value}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={this.props.product.treedata}
                                            placeholder="请选择"
                                            onChange={this.onChange}
                                        />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="商品原价"
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 22 }}>
                                    {getFieldDecorator('Price', {
                                        initialValue: list == null ? "" : list.Price,
                                        rules: [{
                                            required: true, message: '请输入商品原价',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="商品售价"
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 22 }}>
                                    {getFieldDecorator('Sales', {
                                        initialValue: list == null ? "" : list.Sales,
                                        rules: [{
                                            required: true, message: '请输入商品售价',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                            </Row>
                            <Row gutter={16}>
                                <div className="clearfix">
                                    {/* {this.state.fileList && this.state.fileList.map(function (item) {
                                        return (
                                            <img key={item} style={{ 'width': '102px', 'height': '102px', 'margin': '0px 20px 20px 0px' }} src={host + item} onClick={this.oncc.bind(this, item)} />
                                        )
                                    }, this) }*/
                                    }
                                    <Upload
                                        name="file"
                                        listType="picture-card"
                                        className="picture-card"
                                        showUploadList={true}
                                        beforeUpload={beforeUpload}
                                        fileList={this.state.ImageList}
                                        // onPreview={this.handlePreview}
                                        //action={host + "/api/attach/uploadAttach"}

                                        onRemove={this.onRemove}
                                        onChange={this.handleChange}>

                                        {uploadButton}
                                    </Upload>
                                </div>
                            </Row>
                        </Card>
                        <Card bordered={false}>
                            <BraftEditor media={mediaProps} ref={instance => this.editorInstance = instance} {...editorProps} />
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

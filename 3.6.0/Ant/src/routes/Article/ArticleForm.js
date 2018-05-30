import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Row, Col, Card, InputNumber, Radio, Icon, Tooltip, Upload, message, Modal, Switch
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { host } from '../../utils/utils';
import { searchToObj } from '../../utils/queryString';
import styles from '../Forms/style.less';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import UploadStyles from './Upload.less';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
    article: state.article,
}))
@Form.create()
export default class UpdateArticleForm extends PureComponent {
    state = {
        Img: '',
        loading: false,
        contentHtml: null,
        file: ''
    }
    //加载控件前
    componentWillMount() {

    }
    //加载控件后
    componentDidMount() {
        const { dispatch, form } = this.props;
        const CourseId = this.props.location.search.substring(4, 40);
        if (CourseId != ''){
            dispatch({
                type: 'article/getarticle',
                payload: { key: CourseId }
            }).then((data) => {
                this.editorInstance.setContent(data, "html");
                this.setState({ file: this.props.article.data.articlelist.Img })
            });
        }
    }

    handleSubmit = (e) => {
        const { location, article: { info } } = this.props;
        const CourseId = this.props.location.search.substring(4, 40);
        const list = this.props.article.data.list;
        e.preventDefault();
        var obj = searchToObj(location.search);
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (CourseId == '') {
                    this.props.dispatch({
                        type: 'article/add',
                        payload: {
                            ...values,
                            Img: this.state.file,
                            Status: values.Status ? 1 : 0,
                            Content: this.editorInstance.getContent('html')
                        },
                    });
                } else {
                    this.props.dispatch({
                        type: 'article/update',
                        payload: {
                            ...values,
                            Img: this.state.file,
                            Status: values.Status ? 1 : 0,
                            Content: this.editorInstance.getContent('html'),
                            Id: CourseId
                        },
                    });
                }
            }
        });
    }
    handleChange = (info) => {
        const xhr = new XMLHttpRequest
        const fd = new FormData()
        const successFn = (response) => {
            console.log(JSON.parse(response.target.response).Value)
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
        console.log(info.file.originFileObj)
        fd.append('file', info.file.originFileObj)
        xhr.open('POST', host + '/api/attach/uploadAttach', true)
        xhr.send(fd)

    };

    brafthandleChange = (content) => {
    }
    brafthandleHTMLChange = (contentHtml) => {
    }
    uploadFn = (param) => {
        console.log(param.file)
        const xhr = new XMLHttpRequest
        const fd = new FormData()
        const mediaLibrary = this.editorInstance.getMediaLibraryInstance()

        const successFn = (response) => {
            // console.log(JSON.parse(response.target.response).Value)
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

        // const list = this.state.file;
        // console.log(list)

        const list = this.props.article && this.props.article.data.articlelist;
        const { submitting, article } = this.props;
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
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">文章图片</div>
            </div>
        );

        function beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            // if (!isJPG) {
            //     message.error('You can only upload JPG file!');
            // }
            const isLt2M = file.size / 1024 / 1024 < 0.6;
            if (!isLt2M) {
                message.error('Image must smaller than 600kb!');
            }
            return isJPG && isLt2M;
        }
        return (
            <PageHeaderLayout title="文章">
                {
                    <Form layout="vertical" hideRequiredMark >
                        <Card className={styles.card} bordered={false}>
                            <Row>
                                <FormItem label="标题"
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 22 }}>
                                    {getFieldDecorator('Title', {
                                        initialValue: list == null ? "" : list.Title,
                                        rules: [{
                                            required: true, message: '请输入标题',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                                <FormItem label="概述"
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 22 }}>
                                    {getFieldDecorator('Summary', {
                                        initialValue: list == null ? "" : list.Summary,
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Row>
                            <Row>
                            </Row>
                            <Row gutter={16}>
                                <Upload
                                    name="file"
                                    listType="picture-card"
                                    className='avatar-uploader'
                                    showUploadList={true}
                                    action={host + "management/upload/uploadPic"}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}>
                                    {this.state.file != '' ? <img style={{ 'width': '102px', 'height': '102px' }} src={host + this.state.file} alt="" /> : uploadButton}
                                </Upload>
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

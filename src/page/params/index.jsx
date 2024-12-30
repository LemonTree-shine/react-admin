import BasePage from '@/components/basePage/index';
import moment from 'moment';
import { useState, useEffect, useRef, useId } from 'react';
import { queryParams, deleteParams, updateParams } from "@/api/index";
import UTILS from "@/utils/index";
import { Button, Modal, message, Form, Input } from 'antd';
import JsonSchema from "@/components/jsonSchema/index";




import Tucky from 'tucky';

export default function () {

    const data = [
        {
            label: '编码',
            name: 'code',
            type: 'input',
            initialValue: '',
            placeholder: "",
            rules: []
        }
    ];

    const [currenctData, setCurrenctData] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState(data);
    const baseRef = useRef();
    const jsonRef = useRef();

    const [refForm] = Form.useForm();

    const { state, dispatch } = Tucky.useTucky();

    const [jsonString, setJsonString] = useState('');



    const columns = [
        {
            title: '操作',
            key: 'id',
            render(text, item) {
                return <>
                    <Button type='link' onClick={() => {
                        refForm.setFieldsValue({
                            name: item.name || '',
                            code: item.code || '',
                            description: item.description || '',
                        })
                        setCurrenctData(item);
                        setJsonString(item.jsonStr);
                        setShowModal(true)
                    }}>编辑</Button>
                    <Button type='link' onClick={() => {
                        Modal.confirm({
                            title: '确认要删除吗？',
                            onOk: () => {
                                deleteParams({
                                    id: item.id
                                }).then(() => {
                                    message.success('操作成功！')
                                    baseRef.current.form.submit()
                                })

                            }
                        })
                    }}>删除</Button>
                </>
            }
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Json',
            dataIndex: 'jsonStr',
            key: 'jsonStr',
            render(text, item) {
                return <div className='w_600'>
                    {text}
                </div>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
        },

    ];




    useEffect(() => { }, [])

    const handleSubmit = (value) => {
        jsonRef.current.validate().then((res) => {
            console.log(res)
            if (res.length) {
                message.error('JSON格式有错误!')
            } else {
                let params = {
                    name: value.name || '',
                    code: value.code || '',
                    description: value.description || '',
                    jsonStr: jsonRef.current.getValue(),
                }
                if (currenctData.id) {
                    params.id = currenctData.id;
                }
                updateParams({
                    ...params
                }).then((res) => {
                    message.success('操作成功！')
                    setShowModal(false);
                    baseRef.current.form.submit()
                })
            }
        })


    }

    return <div>
        <BasePage
            ref={baseRef}
            formData={formData}
            initLoad={true}  //是否默认加载数据，默认是false
            showReset={false} //是否显示reset按钮，默认是false
            extraBtns={[
                {
                    name: '添加',
                    onClick: () => {
                        refForm.setFieldsValue({
                            name: '',
                            code: '',
                            description: '',
                        })
                        setCurrenctData({});
                        setJsonString('{}');
                        setShowModal(true);
                    }
                }
            ]}
            onSubmit={(values, callback) => {  //请求接口获取数据，把数据给到组件内部做数据重新渲染
                console.log(values);
                queryParams({
                    ...values
                }).then((res) => {
                    //正常业务流程
                    callback({
                        dataSource: res?.data?.list || [],
                        total: res?.data?.total || 0
                    });
                }).catch((res) => {
                    //异常处理
                    callback({
                        dataSource: [],
                        total: 0
                    });
                })
            }}
            onFormChanges={(value, values) => {
                //console.log(value,values);
            }}

            tableData={{
                columns,
            }}
        />
        {showModal ? <Modal
            visible={showModal}
            title={`${currenctData.id ? '编辑自定义参数' : '添加自定义参数'}`}
            width={1200}
            onCancel={() => {
                setShowModal(false);
            }}
            onOk={() => {
                refForm.submit();
            }}
        >
            <Form
                form={refForm}
                labelCol={{
                    xs: { span: 24 },
                    sm: { span: 4 },
                }}
                wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 18 },
                }}
                onFinish={handleSubmit}
            >
                <Form.Item label="名称" name="name">
                    <Input style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item label="编码" name="code">
                    <Input disabled={currenctData.id} style={{ width: '300px' }} />
                </Form.Item>

                <Form.Item label="描述" name="description">
                    <Input style={{ width: '300px' }} />
                </Form.Item>
                <Form.Item label="Schema" name="description">
                    <JsonSchema jsonString={jsonString} ref={jsonRef} />
                </Form.Item>

            </Form>
        </Modal> : ''}

    </div>

}
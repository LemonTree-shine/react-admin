import BasePage from '@/components/basePage/index';
import moment from 'moment';
import { useState, useEffect, useRef, useId } from 'react';
import { queryProtocol, deleteProtocol, updateProtocol } from "@/api/index";
import UTILS from "@/utils/index";
import { Button, Modal, message, Form, Input } from 'antd';
import Dialog from "./components/dialog";




import Tucky from 'tucky';

export default function () {

    const data = [
        {
            label: '协议名称',
            name: 'name',
            type: 'input',
            initialValue: '',
            placeholder: "",
            rules: []
        },
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
                        setShowModal(true)
                    }}>编辑</Button>
                    <Button type='link' onClick={() => {
                        Modal.confirm({
                            title: '确认要删除吗？',
                            onOk: () => {
                                deleteProtocol({
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
            title: '协议内容',
            dataIndex: 'protocolContent',
            key: 'protocolContent',
            render(text, item) {
                return <div className='w_600'>
                    {text}
                </div>
            }
        },

    ];


    useEffect(() => { }, [])

    const handleSubmit = (value) => {
        let params = {
            name: value.name || '',
            code: value.code || '',
            description: value.description || '',
            protocolContent: value.protocolContent || '',
        }
        if (currenctData.id) {
            params.id = currenctData.id;
        }
        updateProtocol({
            ...params
        }).then((res) => {
            message.success('操作成功！')
            setShowModal(false);
            baseRef.current.form.submit()
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
                        setShowModal(true);
                    }
                }
            ]}
            onSubmit={(values, callback) => {  //请求接口获取数据，把数据给到组件内部做数据重新渲染
                console.log(values);
                queryProtocol({
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
        {showModal ? <Dialog
            currenctData={currenctData}
            handleSubmit={handleSubmit}
            onCancel={() => {
                setShowModal(false);
            }}
        /> : ''}

    </div>

}
import BasePage from '@/components/basePage/index';
import moment from 'moment';
import {useState,useEffect,useRef} from 'react';
import {queryBaseInfo,deleteBaseInfo,updateBaseInfo} from "@/api/index";
import UTILS from "@/utils/index";
import { Button,Modal,message,Form,Input } from 'antd';

const countryMap = {
    CN:'中国',
    US:'美国'
}

export default function(){
    const [currenctData,setCurrenctData] = useState({});
    const [showModal,setShowModal] = useState(false);

    const [refForm] = Form.useForm();

    const data = [
        {
            label:'业务域',
            name:'scope',
            type:'input',
            initialValue:'',
            placeholder:"",
            rules:[]
        }
        // {
        //     label:'userName',
        //     name:'userName',
        //     type:'input',
        //     initialValue:'',
        //     placeholder:"请输入userName",
        //     rules:[]
        // },{
        //     label:'country',
        //     name:'country',
        //     type:'select',
        //     initialValue:'',
        //     showSearch:true,
        //     showAll:true,
        //     //mode:'multiple',
        //     rules:[],
        //     options:UTILS.formatOptions(countryMap,'key','name')
        // },{
        //     label:'Application Time',
        //     name:'startTime',
        //     type:'datePick',
        //     initialValue:moment().startOf('day'),
        //     //showTime:true,
        //     rules:[]
        // },{
        //     label:'Application Time',
        //     name:'rangeTime',
        //     type:'rangePick',
        //     //showTime:true,
        //     initialValue:[moment().startOf('day'),moment().endOf('day')],
        //     rules:[]
        // }
    ];

    const columns = [
        {
            title: '操作',
            key:'id',
            render(text,item){
                return <>
                    <Button type='link' onClick={()=>{
                        refForm.setFieldsValue({
                            content:item.content || '',
                            description:item.description || '',
                            logo:item.logo || '',
                            meta:item.meta || '',
                            scope:item.scope || '',
                            title:item.title || '',
                        })
                        setCurrenctData(item);
                        setShowModal(true)
                    }}>编辑</Button>
                    <Button type='link' onClick={()=>{
                        Modal.confirm({
                            title:'确认要删除吗？',
                            onOk:()=>{
                                deleteBaseInfo({
                                    id:item.id
                                }).then(()=>{
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
            title: '单号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '业务域',
            dataIndex: 'scope',
            key: 'scope',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '图标',
            dataIndex: 'logo',
            key: 'logo',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'meta',
            dataIndex: 'meta',
            key: 'meta',
        },
        
    ];


    const [formData,setFormData] = useState(data);
    const baseRef = useRef();

    useEffect(()=>{},[])

    const handleSubmit = (value)=>{
        let params = {
            content:value.content || '',
            description:value.description || '',
            logo:value.logo || '',
            meta:value.meta || '',
            scope:value.scope || '',
            title:value.title || '',
        }
        if(currenctData.id){
            params.id =  currenctData.id;   
        }
        updateBaseInfo({
            ...params
        }).then((res)=>{
            message.success('操作成功！')
            setShowModal(false);
            baseRef.current.form.submit()
        })
    }

    return <div>
        <BasePage 
            ref = {baseRef}
            formData={formData}
            initLoad={true}  //是否默认加载数据，默认是false
            showReset={false} //是否显示reset按钮，默认是false
            extraBtns={[
                {
                    name:'添加',
                    onClick:()=>{
                        refForm.setFieldsValue({
                            content:'',
                            description:'',
                            logo:'',
                            meta:'',
                            scope:'',
                            title:'',
                        })
                        setCurrenctData({});
                        setShowModal(true);
                    }
                }
            ]}
            onSubmit={(values,callback)=>{  //请求接口获取数据，把数据给到组件内部做数据重新渲染
                console.log(values);
                queryBaseInfo({
                    ...values
                }).then((res)=>{
                    //正常业务流程
                    callback({
                        dataSource:res?.data?.list || [],
                        total:res?.data?.list.length || 0
                    });
                }).catch((res)=>{
                    //异常处理
                    callback({
                        dataSource:[],
                        total:0
                    });
                })
            }}
            onFormChanges = {(value,values)=>{
                //console.log(value,values);
            }}

            tableData = {{
                columns,
            }}
        />
        {showModal?<Modal
            visible={showModal}
            title={`${currenctData.id?'编辑基本信息':'添加基本信息'}`}
            width={600}
            onCancel={()=>{
                setShowModal(false);
            }}
            onOk={()=>{
                refForm.submit();
            }}
        >
            <Form
                form={refForm}
                labelCol = {{
                    xs: { span: 24 },
                    sm: { span: 4 },
                }}
                wrapperCol = {{
                    xs: { span: 24 },
                    sm: { span: 18 },
                }}
                onFinish = {handleSubmit}
            >
                <Form.Item label="业务域" name="scope">
                    <Input disabled={currenctData.id}/>
                </Form.Item>
                <Form.Item label="标题" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="图标" name="logo">
                    <Input />
                </Form.Item>
                <Form.Item label="描述" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="内容" name="content">
                    <Input />
                </Form.Item>
                <Form.Item label="Meta" name="meta">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>:''}
        
    </div>
    
}
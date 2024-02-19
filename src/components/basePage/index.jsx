import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Form, Button, Input, Row, Col, Select, DatePicker, Table,Pagination } from 'antd';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import "./index.scss";

const { RangePicker } = DatePicker;

function BasePage(props, ref) {
    const {
        formData = [],
        onSubmit,
        onFormChanges,
        tableData={},
        initLoad=false,
        showReset=false,
        extraBtns = []
    } = props;

    const [form] = Form.useForm();
    const [total,setTotal] = useState(0);
    const [loading,setLoading] = useState(false);
    const [dataSource,setDataSource] = useState([]);
    const [pageInitLoad,setPageInitLoad] = useState(false);
    const [formParams,setFormParams] = useState({
        current:1,
        pageSize:10
    });

    useEffect(()=>{
        
        if(!pageInitLoad){
            setPageInitLoad(true)
            return;
        }

        setLoading(true);
        onSubmit && onSubmit({
            ...formParams,
        },resetTableData);
    },[formParams]);

    useEffect(()=>{
        if(initLoad){
            form.submit();
        }
    },[])

    //父组件能获取到的子组件方法
    useImperativeHandle(ref, () => {
        return {
            form: form
        }
    })

    //根据类型加载不同的表单
    const renderForm = () => {
        return formData.map((item) => {
            let DOM = '';
            switch (item.type) {
                case 'input':
                    DOM = <Input placeholder={item.placeholder} />;
                    break;
                case 'select':
                    DOM = <Select 
                        // {...item}
                        mode={item.mode || ''} 
                        placeholder={item.placeholder} 
                        showSearch={item.showSearch || false}
                        optionFilterProp="children"
                    >
                        {item.showAll?<Select.Option value=''>全部</Select.Option>:""}
                        {item.options && item.options.map((sl) => {
                            return <Select.Option key={sl.value} value={sl.value}>{sl.label}</Select.Option>
                        })}
                    </Select>
                    break;
                case 'datePick':
                    DOM = <DatePicker style={{ width: '100%' }} showTime={item.showTime} placeholder={item.placeholder} />;
                    break;
                case 'rangePick':
                    DOM = <RangePicker style={{ width: '100%' }} showTime={item.showTime} placeholder={item.placeholder} />;
                    break;
                default:
                    DOM = item.render && item.render(item);
                    break;
            }
            return <Col className='form-col-item' span={6} key={item.name}>
                <Form.Item
                    label={item.label}
                    name={item.name}
                    initialValue={item.initialValue}
                    rules={item.rules || []}
                    colon={false}
                >
                    {DOM}
                </Form.Item>
            </Col>

        });
    }

    //提交表单的时候
    const onFinish = (values) => {
        setFormParams({
            ...formParams,
            ...values,
            current:1
        });
    }

    //表单数据发生变化时
    const onValuesChange = (value, values) => {
        onFormChanges && onFormChanges(value, values);
    }

    //重新设置相关数据
    const resetTableData = (data={})=>{
        setLoading(false);
        setDataSource(data.dataSource || []);
        setTotal(data.total || 0);
    }

    const reset = ()=>{
        form.resetFields();
    }

    return <div className='base-page-template-wrap'>
        <div className='base-form-wrap'>
            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                <Row>
                    {renderForm()}
                </Row>
                <div style={{ textAlign: 'left' }}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    {showReset?<Button className="ml_6" type="primary" onClick={reset}>重置</Button>:""}
                    {extraBtns.map((item)=>{
                        return <Button className="ml_6" type="primary" key={item.name} onClick={item.onClick}>{item.name}</Button>
                    })}
                </div>
            </Form>
        </div>
        <div className='base-table-wrap'>
            <Table 
                {...tableData} 
                bordered={true} 
                pagination={false}
                dataSource={dataSource}
                loading={loading}
            />
            <Pagination
                style={{
                    textAlign:'right',
                    marginTop:'10px'
                }}
                total={total}
                showTotal={total => `Total ${total} items`}
                pageSize={formParams.pageSize}
                current={formParams.current}
                onChange={(current,pageSize)=>{
                    setFormParams({
                        ...formParams,
                        current,
                        pageSize
                    })
                }}
            />
        </div>
    </div>
}

export default forwardRef(BasePage);
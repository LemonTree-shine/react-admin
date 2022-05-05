import React, { useState,useRef } from 'react';
import { Modal, Button,Form } from 'antd';

export default function BaseModal(props){

    const [formRef] = Form.useForm();

    const onFinish = (values)=>{
        props.onOk && props.onOk(values)
    }

    return <Modal 
        width={600}
        {...props}
        onOk={()=>{
            formRef.current.submit();
        }}
    >
        <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            ref={formRef}
            onFinish={onFinish}
        >
            {props.children}
        </Form>
    </Modal>
}
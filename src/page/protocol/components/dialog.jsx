
import { Button, Modal, message, Form, Input } from 'antd';
import { useState, useEffect, useRef, useId } from 'react';

import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

export default function Dialog(props) {

    const {
        currenctData,
        handleSubmit,
        onCancel
    } = props;

    const [dialogForm] = Form.useForm();
    const [editor, setEditor] = useState(null)
    const [html, setHtml] = useState('')

    useEffect(() => {
        dialogForm.setFieldsValue({
            name: currenctData.name || '',
            code: currenctData.code || '',
            description: currenctData.description || '',
        })
        setHtml(currenctData.protocolContent)
    }, []);

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    const onFinish = (values) => {
        handleSubmit({
            ...values,
            protocolContent: html
        })
    }

    return <Modal
        visible={true}
        title={`${currenctData.id ? '编辑协议' : '添加协议'}`}
        width={1450}
        onCancel={() => {
            onCancel && onCancel();

        }}
        onOk={() => {
            dialogForm.submit();
        }}
    >
        <Form
            form={dialogForm}
            // layout="inline"
            labelCol={{
                xs: { span: 24 },
                sm: { span: 2 },
            }}
            wrapperCol={{
                xs: { span: 24 },
                sm: { span: 10 },
            }}
            onFinish={onFinish}
        >
            <Form.Item
                label="名称"
                name="name"
                rules={[{
                    required: true,
                    message: '名称必填'
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="编码" name="code" rules={[{
                required: true,
                message: '编码必填'
            }]} >
                <Input disabled={currenctData.id} />
            </Form.Item>

            <Form.Item label="描述" name="description">
                <Input />
            </Form.Item>

        </Form>
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    </Modal>
}
import BasePage from '@/components/basePage/index';
import moment from 'moment';
import {useState,useEffect,useRef} from 'react';

const columns = [
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render(text,item){
            return JSON.stringify(item)
        }
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];

export default function(){
    const data = [{
        label:'userName',
        name:'userName',
        type:'input',
        initialValue:'123',
        placeholder:"请输入userName",
        rules:[]
    },{
        label:'country',
        name:'country',
        type:'select',
        initialValue:'',
        //mode:'multiple',
        rules:[],
        options:[]
    },{
        label:'Application Time',
        name:'startTime',
        type:'datePick',
        initialValue:moment().startOf('day'),
        showTime:true,
        rules:[]
    },{
        label:'Application Time',
        name:'rangeTime',
        type:'rangePick',
        showTime:true,
        initialValue:[moment().startOf('day'),moment().endOf('day')],
        rules:[]
    }];


    const [formData,setFormData] = useState(data);
    const baseRef = useRef();

    useEffect(()=>{
        //加载页面请求数据
        baseRef.current.form.submit();
        setTimeout(() => {
            setFormData(formData.map((item)=>{
                if(item.name==='country'){
                    item.options = [{
                        label:'All',
                        value:''
                    },{
                        label:'China',
                        value:'CN'
                    }]
                }
                return item;
            }));
        }, 0);
    },[])

    return <BasePage 
        ref = {baseRef}
        formData={formData}
        onSubmit={(values,callback)=>{
            setTimeout(() => {
                callback({
                    dataSource:[{
                        key: '1',
                        name: '胡彦斌',
                        age: 32,
                        address: '西湖区湖底公园1号',
                    },
                    {
                        key: '2',
                        name: '胡彦祖',
                        age: 42,
                        address: '西湖区湖底公园1号',
                    }],
                    total:500
                });
            }, 1000);
            console.log(values);
        }}
        onFormChanges = {(value,values)=>{
            console.log(value,values);
        }}

        tableData = {{
            columns,
        }}
    />
}
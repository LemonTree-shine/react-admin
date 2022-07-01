import BasePage from '@/components/basePage/index';
import moment from 'moment';
import {useState,useEffect,useRef} from 'react';
import {testApi} from "@/api/index";
import UTILS from "@/utils/index";

const countryMap = {
    CN:'中国',
    US:'美国'
}

export default function(){
    const data = [{
        label:'userName',
        name:'userName',
        type:'input',
        initialValue:'',
        placeholder:"请输入userName",
        rules:[]
    },{
        label:'country',
        name:'country',
        type:'select',
        initialValue:'',
        showSearch:true,
        showAll:true,
        //mode:'multiple',
        rules:[],
        options:UTILS.formatOptions(countryMap,'key','name')
    },{
        label:'Application Time',
        name:'startTime',
        type:'datePick',
        initialValue:moment().startOf('day'),
        //showTime:true,
        rules:[]
    },{
        label:'Application Time',
        name:'rangeTime',
        type:'rangePick',
        //showTime:true,
        initialValue:[moment().startOf('day'),moment().endOf('day')],
        rules:[]
    }];

    useEffect(()=>{
        testApi({}).then((res)=>{
            //正常业务流程
        }).catch((res)=>{
            //异常处理
        })
    },[])

    const columns = [
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


    const [formData,setFormData] = useState(data);
    const baseRef = useRef();

    useEffect(()=>{},[])

    return <div>
        <BasePage 
            ref = {baseRef}
            formData={formData}
            initLoad={true}  //是否默认加载数据，默认是false
            showReset={false} //是否显示reset按钮，默认是false
            onSubmit={(values,callback)=>{  //请求接口获取数据，把数据给到组件内部做数据重新渲染
                console.log(values);
                testApi({
                    ...values
                }).then((res)=>{
                    //正常业务流程
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
                        total:1000
                    });
                }).catch((res)=>{
                    //异常处理
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
                        total:1000
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
    </div>
    
}
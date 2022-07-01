import BasePage from '@/components/basePage/index';
import moment from 'moment';
import {useState,useEffect,useRef} from 'react';

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
        showSearch:true,
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

    useEffect(()=>{
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

    return <div>
        <BasePage 
            ref = {baseRef}
            formData={formData}
            initLoad={false}  //是否默认加载数据，默认是false
            showReset={false} //是否显示reset按钮，默认是false
            onSubmit={(values,callback)=>{  //请求接口获取数据，把数据给到组件内部做数据重新渲染
                console.log(values);
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
                        total:1000
                    });
                }, 1000);
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
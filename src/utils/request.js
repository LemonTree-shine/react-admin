import axios from "axios";
import { message } from "antd";
import {showLoading,closeLoading} from "@/components/loading/loading";
const baseUrl = "";

//请求拦截
axios.interceptors.request.use((config)=>{
    //设置请求头
    config.headers.post['Content-Type'] = 'application/json';
    //config.headers.post['appCode'] = '9d535bbe-f55c-44b1-96a8-86aa426ee14a';
    //config.headers.post['appId'] = '1103';

    return config;
},(error)=>{
    Promise.reject(error);
})

const request = {
    post(options={}){
        if(options.loading){
            showLoading();
        }
        return new Promise((resolve,reject)=>{
            let url = baseUrl + options.url;
            let params = options.data;
            axios.post(
                url,
                params
            ).then((res)=>{
                closeLoading();
                if(res.status===200 && res.data.code==='000000'){
                    resolve(res.data);
                }else{
                    if(!options.jumpError){
                        message.error(res?.data?.message)
                    }
                    reject(res.data)
                }
            })
        });
        
    }
}

export default request;
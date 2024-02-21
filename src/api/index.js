import request from '@/utils/request';

export function login(params={}){
    return request.post({
        url:'/cms/login',
        data:params,
        loading:true
    })
}

export function queryBaseInfo(params={}){
    return request.post({
        url:'/cms/queryBaseInfo',
        data:params,
        //jumpError:true,
        //loading:true
    })
}

export function deleteBaseInfo(params={}){
    return request.post({
        url:'/cms/deleteBaseInfo',
        data:params,
        //jumpError:true,
        loading:true
    })
}

export function updateBaseInfo(params={}){
    return request.post({
        url:'/cms/updateBaseInfo',
        data:params,
        //jumpError:true,
        loading:true
    })
}


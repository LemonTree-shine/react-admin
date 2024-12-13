import request from '@/utils/request';

export function login(params = {}) {
    return request.post({
        url: '/cms/login',
        data: params,
        loading: true
    })
}

export function queryBaseInfo(params = {}) {
    return request.post({
        url: '/cms/queryBaseInfo',
        data: params,
        //jumpError:true,
        //loading:true
    })
}

export function deleteBaseInfo(params = {}) {
    return request.post({
        url: '/cms/deleteBaseInfo',
        data: params,
        //jumpError:true,
        loading: true
    })
}

export function updateBaseInfo(params = {}) {
    return request.post({
        url: '/cms/updateBaseInfo',
        data: params,
        //jumpError:true,
        loading: true
    })
}

//查询自定义参数
export function queryParams(params = {}) {
    return request.post({
        url: '/cms/queryParams',
        data: params,
        //jumpError:true,
        //loading:true
    })
}

//删除自定义参数
export function deleteParams(params = {}) {
    return request.post({
        url: '/cms/deleteParams',
        data: params,
        //jumpError:true,
        loading: true
    })
}

//更新自定义参数
export function updateParams(params = {}) {
    return request.post({
        url: '/cms/updateParams',
        data: params,
        //jumpError:true,
        loading: true
    })
}


//查询协议列表
export function queryProtocol(params = {}) {
    return request.post({
        url: '/cms/queryProtocol',
        data: params,
        //jumpError:true,
        //loading:true
    })
}

//删除协议
export function deleteProtocol(params = {}) {
    return request.post({
        url: '/cms/deleteProtocol',
        data: params,
        //jumpError:true,
        loading: true
    })
}

//更新协议
export function updateProtocol(params = {}) {
    return request.post({
        url: '/cms/updateProtocol',
        data: params,
        //jumpError:true,
        loading: true
    })
}


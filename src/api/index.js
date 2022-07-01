import request from '@/utils/request';

export function testApi(params={}){
    return request.post({
        url:'/cb-ew-tariff/ttt',
        data:params,
        //jumpError:true,
        //loading:true
    })
}
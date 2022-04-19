export default {
    module:'userInfo',
    data:{
        name:'chenze',
        address:'hangzhou',
        age:18,
        email:'18815288453@163.com'
    },
    reduce:{
        USERINFO:function(redurceData,storeData){
            debugger
            storeData.userInfo = redurceData;
            return storeData;
        }
    }
}
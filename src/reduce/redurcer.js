const reduceFile = require.context('./modules',false,/\.js$/);
const reduceModules = {
    data:{},
    reduce:{}
};

reduceFile.keys().forEach((key)=>{
    let module = reduceFile(key).default;
    reduceModules.data[module.module] = module.data;
    Object.keys(module?.reduce).forEach((action)=>{
        reduceModules.reduce[action] = module.reduce[action]
    })
});

function redurce(action,redurceData,storeData){
    if(action && reduceModules.reduce[action]){
        return reduceModules.reduce[action](redurceData,storeData)
    }else{
        return {
            ...storeData,
            ...redurceData
        };
    }
}

export default {
    data:reduceModules.data,
    redurce
};
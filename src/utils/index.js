const UTILS = {
    formatOptions:(data={},valueKey='value',labelKey='label')=>{
        let option = [];
        if(Array.isArray(data)){
            data.forEach((item)=>{
                option.push({
                    ...item,
                    value:item[valueKey],
                    label:item[labelKey],
                })
            })
        }else{
            Object.keys(data).forEach((key)=>{
                option.push({
                    value:key,
                    label:data[key]
                })
            })
        }

        return option;
    }
}

export default UTILS;
//接口转发配置文件
module.exports = {
    "/api":{
        target: "http://localhost:3000",
    },
    "/cb-ew-":{
        target: "http://192.168.130.94:8080",
    },
}
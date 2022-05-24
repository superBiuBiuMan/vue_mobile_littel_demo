import axios from "axios";
import nprogress from "nprogress"
import "nprogress/nprogress.css"

//创建一个axios的实例化对象
//传入配置对象
const service = axios.create({
    //每一个ajax请求都添加/dev前缀
    //比如http://localhost:8080/dev/login
    //http://localhost:8080/dev/home
    baseURL:"/dev",
    //请求超时时间
    timeout: 2000
});
//请求拦截器
service.interceptors.request.use((config) => {
    //进度显示(当然,nprogress是假进度条)
    nprogress.start();
    return config;
})

//响应拦截器
service.interceptors.response.use((response) => {
    nprogress.done();
    return response.data || response;
}, (error) => {
    nprogress.done();
    console.log("未知错误!");
    return new Promise(() => {});
})

export default service;
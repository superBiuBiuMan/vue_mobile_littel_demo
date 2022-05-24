import axios from "./axios"

//发送验证码
export const getCode = (phone) => axios.post("/login/digits",{phone})

//用户登录
export const login = (phone,code) => axios.post("/login/phone",{phone,code})

//验证用户是否登录成功
export const isLogin = () => axios.post("/login/verify");

//退出登录
export const loginOut = (id) => axios.post("/logout",{_id:id})

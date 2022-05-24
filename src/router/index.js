import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);

//解决重复提交相同链接报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            // resolve err
            return err
        }
        // rethrow error
        return Promise.reject(err)
    })
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject){
        //回调函数里面会用到this的指向,所以就要使用call
        return originalReplace.call(this, location, onResolve, onReject)
    }
    return originalReplace.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            //如果为相同链接引发的错误,返回错误原因,promise状态为resolve
            // resolve err
            return err
        }
        // rethrow error
        return Promise.reject(err)
    })
}

const routes = [
    {

        path: "/login",
        component: () => import("@/view/Login.vue")
    },
  
    {
        path:"/",
        redirect:"/login"
    },
    {
        path:"/center",
        name:"center",
        component:() => import("@/view/Center.vue"),
        beforeEach:(to,from,next)=>{
            //token存在并且路径也正确
            if(from.path === "/login" && hasCookie()){
                next();
            }else{
                next("/login");
            }
        }
    },
    
]

const router = new VueRouter({
    routes,
})

//判断是否有我们存储的token数据
function hasCookie(){
    let isHas = false;
    let cookies = document.cookie;
    cookies.split(";").forEach(item=>{
        if(item.startsWith("user_token=")){
            isHas = true;
        }
    });
    return isHas;
}

router.beforeEach((to,from,next)=>{
    if(to.path == "/login"){
        if(hasCookie()){
            next("/center")
        }else{
            next();
        }
    }else{
        next();
    }
})

export default router;
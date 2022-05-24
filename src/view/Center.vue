<template>
  <div class="content">
      <p class="top">个人中心</p>
      <div class="avator">
          <img :src="avatar" >
          <p>欢迎,用户{{username}}</p>
      </div>
      <p class="title">个人信息</p>
      <div class="info">
          <p><span>昵称</span><span style="float:right;color:#a08888">{{nickName}}</span></p>
          <p><span>手机</span><span style="float:right;color:#a08888">{{phone?phone:"暂无"}}</span></p>
      </div>
      <button class="login-out" @click.prevent="loginOut">退出登录</button>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data(){
      return {
          //用户头像
          avatar:"",
          //昵称
          nickName:"",
          //用户名
          username:"",
          //手机
          phone:"",
          //唯一标识
          id:""
      }
  },
  mounted(){
      this.getUserInfo();
  },
  methods:{
      //刚载入路由获取用户信息
      async getUserInfo(){
          const result = await this.$API.isLogin();
          if(result.code === 20000){
              let {avatar,nickName,username,phone,_id} = result.data;
              this.avatar = avatar;
              this.nickName = nickName;
              this.username = username;
              this.phone = phone;
              console.log(_id);
              this.id = _id;
          }
      },
      //退出登录
      loginOut(){
          if(this.id){
              this.$API.loginOut(this.id).then(response=>{
                  alert(response.message || "退出登录成功!");
                  this.$router.push("/login");
              }).catch(reason=>{
                  alert("退出登录失败");
                  console.log(reason);
              })    
          }
      }
  }
}
</script>

<style lang="less" scoped>
@sizeFont:414/10rem;
.content{
background-color: #f5f5f9;
p{
    font-size: (16/@sizeFont);
}
.top{
    text-align: center;
    margin-top: (10/@sizeFont);
    font-size: (19/@sizeFont);
    height: (40/@sizeFont);
    background-color: white;
}
.avator{
    text-align: center;
    margin-top: (40/@sizeFont);
    img{
        border-radius: 50%;
        width: (80/@sizeFont);
        height: (80/@sizeFont);
        vertical-align: bottom;
    }
    p{
        text-align: center;
    }
}
.title{
    color: #98999d;
    text-align: center;
    font-size: (15/@sizeFont);
    margin: (10/@sizeFont) 0;
}
.info{
    &>p{
        line-height: (40/@sizeFont);
        background-color: white;
        border-bottom: 1px solid #eee;
        padding: 0 (10/@sizeFont);
    }
    &>p:last-of-type{
            margin-top: 1px;
     }
}
.login-out{
    width: 100%;
    background-color: red;
    border: none;
    border-radius: (5/@sizeFont) (5/@sizeFont);
    color: white;
    height: (50/@sizeFont);
    font-size: (18/@sizeFont);
}
}
</style>

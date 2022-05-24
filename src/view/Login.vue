<template>
  <div>
    <div class="operation"> 
        <p>手机验证码登录</p>
        <input v-model="phone" placeholder="请输入手机号"><br/>
        <div class="verify">
          <input v-model="code" placeholder="请输入验证码">
          <svg t="1653360400343" class="close" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
          p-id="2946" width="25" height="25"><path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" p-id="2947" fill="#8a8a8a"></path><path d="M927.846568 511.997953c0-229.315756-186.567139-415.839917-415.838893-415.839917-229.329059 0-415.85322 186.524161-415.85322 415.839917 0 229.300406 186.524161 415.84094 415.85322 415.84094C741.278405 927.838893 927.846568 741.29836 927.846568 511.997953M512.007675 868.171955c-196.375529 0-356.172979-159.827125-356.172979-356.174002 0-196.374506 159.797449-356.157629 356.172979-356.157629 196.34483 0 356.144326 159.783123 356.144326 356.157629C868.152001 708.34483 708.352505 868.171955 512.007675 868.171955" p-id="2948" fill="#8a8a8a"></path><path d="M682.378947 642.227993 553.797453 513.264806 682.261267 386.229528c11.661597-11.514241 11.749602-30.332842 0.234337-41.995463-11.514241-11.676947-30.362518-11.765975-42.026162-0.222057L511.888971 471.195665 385.223107 344.130711c-11.602246-11.603269-30.393217-11.661597-42.025139-0.059352-11.603269 11.618619-11.603269 30.407544-0.059352 42.011836l126.518508 126.887922L342.137823 639.104863c-11.662621 11.543917-11.780301 30.305213-0.23536 41.96988 5.830799 5.89015 13.429871 8.833179 21.086248 8.833179 7.53972 0 15.136745-2.8847 20.910239-8.569166l127.695311-126.311801L640.293433 684.195827c5.802146 5.8001 13.428847 8.717546 21.056572 8.717546 7.599072 0 15.165398-2.917446 20.968567-8.659217C693.922864 672.681586 693.950494 653.889591 682.378947 642.227993" p-id="2949" fill="#8a8a8a"></path></svg>
          <button class="get-code" :class="{stop:timer}" @click="getCode">获取验证码</button><br/>
        </div>
        <button class="login" :class="{canlogin:canLogin}" @click.prevent="login">登 录</button>
    </div>
    <div class="other-logo">
      <div class="line">
        <p>其他登录方式</p>
      </div>
      <div class="all-img">
        <img src="@/assets/github.png" @click="githubLogin" alt="">
        <img src="@/assets/qq.png" alt="">
        <img src="@/assets/wechat.png" alt="">
      </div>
    </div>
    <p class="notice">未注册的手机号，验证后会自动创建硅谷账号,登录即代表您同意<a href="javascript:;">《硅谷隐私政策》</a></p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      //手机号
      phone:"",
      //用户输入的验证码
      code:"",
      //是否能够登录
      canLogin:false,
      //计时器
      timer:"",
      //计数器
      number:60
    }
  },
  methods:{
    //github登录
    githubLogin(){
      window.location.href = "https://github.com/login/oauth/authorize?client_id=2b3178d188267a7fca6c";

    },
    //手机号登录
    async login(){
      //可以登录为真的情况下
      if(this.canLogin){
        try {
          const result = await this.$API.login(this.phone,this.code);
          if(result.code === 20000){
            //登录成功
            this.stopTime();
            // 跳转到个人中心页
            this.$router.push({name:'center'})
          }else{
            alert(result.message);
          }
        } catch (error) {
          console.log(error);
          console.log("登录错误!",error);
        }
      }
    },
    stopTime(){
      clearInterval(this.timer);
      this.timer = "";
      this.number = 60;
    },
    //获取验证码
    getCode(){
      //信息不完整
      if(!this.phone){
        return;
      }else{
        //发送登录请求
        if(this.timer){
          return;
        }
        this.$API.getCode(this.phone).then(response=>{
          //请求成功
          if(response.code === 20000){
               //进入倒计时
              if(!this.timer){
                document.querySelector(".get-code").textContent="获取验证码("+this.number+")";
                this.timer = setInterval(() => {
                  //时间到了
                  if(this.number<=0){
                    document.querySelector(".get-code").textContent="获取验证码";
                    this.stopTime();
                  }else{
                      this.number--;
                      document.querySelector(".get-code").textContent="获取验证码("+this.number+")";
                  }
                }, 1000);
              }
          }else{
            alert("获取验证码失败,请重试!");
          }
        }).catch(reason=>{
          alert("获取验证码失败,请重试!");
          console.log(reason);
        })
      }
    },
    //是否可以登录
    can(){
      if (this.code&&this.phone) {
        this.canLogin = true;
      }else{
        this.canLogin = false;
      }
    }
  },
  watch:{
    phone(){
      this.can();
    },
    code(){
      this.can();
    }
  }
}
</script>

<style lang="less" scoped>
@sizeFont:414/10rem;
.operation{
  padding: 0 10px;
  &>p{
    text-align: center;
    font-size: (20/@sizeFont);
    margin-top: (10/@sizeFont);
  }
  // 输入框
  input{
    border: none;
    height: (50/@sizeFont);
    padding: 0 (10/@sizeFont);
    width: 100%;
    box-sizing: border-box;
    border-bottom: (1/@sizeFont) solid #eee;
    //关闭输入时聚焦边框
    outline: none;
    font-size: (16/@sizeFont);
  }
  .verify{
    position: relative;
    display: flex;
    justify-content: space-between;
    // 关闭按钮
    .close{
      position: absolute;
      right: (114/@sizeFont);
      top: (12/@sizeFont);
    }
  }
  //获取验证码
  .get-code{
    color: red;
    border: none;
    background-color: white;
    font-family: "微软雅黑";
    font-weight: 500;
    font-size: (16/@sizeFont);
    width: (150/@sizeFont);
    &.stop{
      color: #808080;
    }
  }
  // 登录按钮
  .login{
    color: #fcbfbd;
    background-color: #f86a66;
    border: none;
    border-radius: (5/@sizeFont);
    font-size: (19/@sizeFont);
    width: 100%;
    line-height: (50/@sizeFont);
    box-shadow: 1px 1px 3px #eee;
    &.canlogin{
      color: white;
      background-color: red;
    }
  }
}
.other-logo{
  padding: 0 (10/@sizeFont);
  margin-top: (50/@sizeFont);
 
  // 线条
  .line{
    outline: (2/@sizeFont) solid #a8a8a8;
    margin: 0  (25/@sizeFont) ;
    position: relative;
    &>p{
      font-size: (16/@sizeFont);
      color: #454b52;
      text-align: center;
      position: absolute;
      background-color: #ffffff;
      left: 50%;
      transform: translate(-50%,-50%);
      line-height: (20/@sizeFont);
      padding: 0 (10/@sizeFont);
    }
  }
  // 图片
  .all-img{
    display: flex;
    padding-top: (20/@sizeFont);
    margin: 0 (100/@sizeFont);
    justify-content: space-around;
    img{
      vertical-align: bottom;
      width: (35/@sizeFont);
      height: (35/@sizeFont);
      margin-right:(8/@sizeFont);
    } 
  }
}
  // 声明
.notice{
  text-align: center;
  margin-top: (70/@sizeFont);
  padding: 0 (10/@sizeFont);
  font-size: (16/@sizeFont);
}
</style>

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/dev":{
        //转发
        target:"http://localhost:5000",
        changeOrigin:true,
        //重写,删除/dev前缀
        pathRewrite:{
          "^/dev":"",
        }
      }
    }
  }
})

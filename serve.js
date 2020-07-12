//[搭建注册接口] 1、安装并引入express
const express = require('express');
//[连接MongoDB] 1、注册MongoDB云数据库Atles 2、安装并引入Mongoose
const mongoose = require('mongoose');
//引入数据库地址URI
const db = require('./config/keys').mongoURI;
//[搭建路由模块] 6. 引入路由器
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

//[搭建注册接口] 1.安装并引入body-parser
const bodyParser = require('body-parser');
//[验证token] 1.安装并引入passport
const passport = require('passport');


//[搭建注册接口] 2、实例化express对象
const app = express();
// const port = process.env.port || 5000 ;
const port = 5000 ;
//[搭建注册接口] 3、响应根路径的请求
app.get("/",(req,res)=>{
    res.send('Hello World')
})
//[搭建注册接口] 4、监听端口 
app.listen(port,()=>{
    console.log(`Serve is running on: ${port}`);
})
//[搭建注册接口] 2. 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())
//[搭建路由模块] 7. 使用路由器中间件
app.use('/api/users',users)
app.use('/api/profiles',profiles)
//[验证token] 2.初始化passport
app.use(passport.initialize())
//把引入的passport传递给passport.js,把passport的配置抽离
require('./config/passport')(passport)


//[连接MongoDB] 3、连接数据库
mongoose.connect(db,{ useUnifiedTopology: true })
.then(()=>{
    console.log('MongoDB Connected');
}).catch(err=>{
    console.log(err);
})
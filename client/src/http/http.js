import axios from 'axios'
import router from '../router/index'
//请求拦截

axios.interceptors.request.use(config =>{
    console.log('请求拦截');
    if(localStorage.getItem('BMStoken')){
        config.headers.Authorization = localStorage.getItem('BMStoken');
    }
    return config
},err=>{
    return Promise.reject(err)
})
//响应拦截
axios.interceptors.response.use(response =>{
    console.log('响应拦截');
    return response
},err=>{
    if (err && err.response) {
        switch (err.response.status) {
          case 400:
              console.log('错误请求')
            break;
          case 401:
              console.log('未授权，请重新登录')
              localStorage.removeItem('BMStoken')
              router.push({name:'login'})
            break;
          case 403:
            console.log('拒绝访问')
            break;
          case 404:
            console.log('账户不存在')
            break;
          case 405:
            console.log('请求方法未允许')
            break;
          case 408:
            console.log('请求超时')
            break;
          case 500:
            console.log('服务器端出错')
            break;
          case 501:
            console.log('网络未实现')
            break;
          case 502:
            console.log('网络错误')
            break;
          case 503:
            console.log('服务不可用')
            break;
          case 504:
            console.log('网络超时')
            break;
          case 505:
            console.log('http版本不支持该请求')
            break;
          default:
            console.log(`连接错误${err.response.status}`)
        }
      } else {
        console.log(err)
      }
    return Promise.reject(err)
})
export default axios;
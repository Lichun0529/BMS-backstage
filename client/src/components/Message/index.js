import MessageComponent from './Message.vue'

const Message = {
  install(Vue) {
    const Constructor = Vue.extend(MessageComponent) //创建一个Message子实例
    let instance = new Constructor({
      el: document.createElement('div') //将Message实例挂载到创建的div上
    })
    document.body.appendChild(instance.$el) //添加到body中
    //绑定到vue原型上，以供全局使用
    Vue.prototype.$message = (msg,type, confirmSure = () => {}) => {
      instance.message = msg //需要显示的信息
      type ? instance.type = type : instance.type = 'success'
      instance.show = true //在调用message时显示组件
      setTimeout(() => {
        instance.show = false
      }, 3000);
      instance.confirmSure = confirmSure //点击关闭的时候触发的回调函数
    }
  }
}
export default Message


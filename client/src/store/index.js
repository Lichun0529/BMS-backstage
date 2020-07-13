import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let state = {
  isAuthenticated:false,
  userInfo:{}
}
let getters = {
  isAuthenticated: state =>{
    return state.isAuthenticated
  },
  userInfo: state =>{
    return state.userInfo
  }
}
let mutations = {
  setAuthenticated:(state,isAuthenticated)=>{
    if(isAuthenticated) state.isAuthenticated = true
    else state.isAuthenticated = false
  },
  setUserInfo:(state,userInfo)=>{
    if(userInfo) state.userInfo = userInfo
    else state.userInfo = {}
  }
}
let actions = {
  setAuthenticated:({commit},isAuthenticated)=>{
    commit('setAuthenticated',isAuthenticated)
  },
  setUserInfo:({commit},userInfo)=>{
    commit('setUserInfo',userInfo)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

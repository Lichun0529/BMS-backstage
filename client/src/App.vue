<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  import jwtdecode from 'jwt-decode'
  export default {
    created(){
      let isAuthenticated = localStorage.getItem('BMStoken') ? true : false ;
      this.$store.dispatch('setAuthenticated',isAuthenticated) 
      if(localStorage.getItem('BMStoken')){
        let userInfo = jwtdecode(localStorage.getItem('BMStoken'));
        this.$store.dispatch('setUserInfo',userInfo)
      }
    }
  }
</script>
<style>
  #app {
    width: 100%;
    height: 100%;
  }
  html,body{
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

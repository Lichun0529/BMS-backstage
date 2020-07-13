<template>
    <div class="container">主页</div>
</template>
<script>
     export default{
         data(){
             return{}
         },
         created(){
             this.get()
         },
         methods:{
             get(){
                this.$axios.get('/api/profiles/allprofile').then(res=>{
                    console.log(res);
                })
             }
         }
     }
</script>
<style lang="less" scoped>

</style>
<template>
    <div style="height:100%">
        <headNav></headNav>   
            <div class="content">
                <div class="left card bg-primary shadow-soft border-light">
                    <left :path="path"></left>
                </div>
                <div class="right card bg-primary shadow-soft border-light">
                    <router-view></router-view>
                </div>
            </div>
    </div>
</template>
<script>
    import headNav from '../components/headNav'
    import left from '../components/left'
     export default{
         data(){
             return{
                 path:''
             }
         },
         created(){
            //  this.get()
         },
         methods:{
             get(){
             }
         },
         watch:{
             $route(){
                 //当前路由路径传给左侧栏
                 this.path = this.$route.path;
                 console.log(this.path);
             }
         },
         components:{headNav,left}
     }
</script>
<style lang="less" scoped>
    .content{
        min-height: 80%;
        display: flex;
        margin: 2rem;
        .left{
            width: 15rem;
            margin-right: 1rem;
        }
        .right{
            flex-grow: 2;
            padding: 1rem;
        }
    }
</style>
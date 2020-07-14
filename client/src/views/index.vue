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
                this.$axios.get('/api/profiles/allprofile').then(res=>{
                })
             }
         },
         watch:{
             $route(){
                 this.path = this.$route.path;
             }
         },
         components:{headNav,left}
     }
</script>
<style lang="less" scoped>
    .content{
        height: 80%;
        display: flex;
        margin: 2rem;
        .left{
            width: 15rem;
            margin-right: 1rem;
        }
        .right{
            flex-grow: 2;
        }
    }
</style>
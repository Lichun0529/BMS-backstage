<template>
    <div style="height:100%">
        <headNav></headNav>   
            <div class="content">
                <div class="left card bg-primary shadow-soft border-light">
                    左侧
                </div>
                <div class="right card bg-primary shadow-soft border-light">
                    <userPage></userPage>
                </div>
            </div>
    </div>
</template>
<script>
    import headNav from '../components/headNav'
    import userPage from '../views/userPage'
     export default{
         data(){
             return{}
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
         components:{headNav,userPage}
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
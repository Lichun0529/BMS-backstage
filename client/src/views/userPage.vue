<template>
        <div class="main">
            <!-- Profile Card -->
                <div class="profile-image shadow-inset border border-light bg-primary rounded-circle p-3 mx-auto">
                    <img :src="userInfo.avatar" class="card-img-top shadow-soft p-2 border border-light rounded-circle" alt="Neil Avatar">
                </div>
                <div class="card-body">
                    <h3 class="h5 mb-2"><i class="fas fa-user" style="margin-right:1rem"></i>{{userInfo.name}}</h3>
                    <h3 class="h5 mb-2"><i class="fas fa-id-badge" style="margin-right:1rem"></i>{{userInfo.identity}}</h3>
                </div>
            <!-- End of Profile Card -->
        </div>
</template>
<script >
     export default{
         name:'userPage',
         data(){
             return{
                 userInfo:''
             }
         },
         created(){
             let userInfo = this.$store.getters.userInfo;
             this.userInfo = userInfo;
         }
     }
</script>
<style lang="less" scoped>
    .main{
        height: 100%;
        display: flex;
        align-items: center;
        padding-left:5rem ;
        .card-body{
            margin-left: 5rem;
        }
    }
    img{
        width: 8rem;
        height: 8rem;
    }
</style>
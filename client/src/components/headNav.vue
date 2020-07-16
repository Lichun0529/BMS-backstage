<template>
    <div class="">
        <div class="header row headroom--not-top">
            <div class="icon icon-shape icon-lg bg-soft shadow-inset border border-light rounded-circle logo">
                <img class="navbar-brand-dark" src="../assets/logo.png" alt="Logo light">
            </div>
            <h3 class="col-md-7 col-lg-9 col-sm-7">Fund Management System</h3>
            <div class="col-md-2 col-lg-2 col-sm-2">
                <div class="avatar">
                    <img src="../assets/404.png" alt="" class="">
                    <div class="welcome">
                        <span >Welcom</span>
                        <span><strong>{{userName}}</strong></span>
                    </div>
                    <div style="height:100%">
                        <ul class="dropdown-lc">
                            <li>
                                <span class="fas fa-angle-down ml-2 dropdown-arrow-lc"></span>
                            </li>
                            <li>
                                <!-- <ul class="dropdown-menu">
                                    <li @click="showInfo" v-for="(item,i) in dropdownItems" :key="i">
                                        <a class="dropdown-item" >{{item.name}}</a>
                                    </li>
                                </ul> -->
                                <ul class="dropdown-menu pl-2 pr-2">
                                    <li @click="showInfo">
                                        <a class="dropdown-item font-weight-bold" style="border-radius: 0.55rem;">Information</a>
                                    </li>
                                    <li @click="signOut">
                                        <a class="dropdown-item font-weight-bold" style="border-radius: 0.55rem;color:#A91E2C">Sign Out</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
     export default{
         name:'headNav',
         data(){
             return{
                 userName:'',
                 dropdownItems:[
                     {name:'Information',path:''},
                     {name:'Sign Out',path:''}
                ]
             }
         },
         created(){
             let userInfo = this.$store.getters.userInfo
             this.userName = userInfo.name;
         },
         methods:{
             showInfo(){
                 this.$router.push('userpage').catch(()=>{})
             },
             signOut(){
                 this.$router.push('login').catch(()=>{})
             }
         }
     }
</script>
<style lang="less" scoped>
    .header{
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
    }
    .row {
        margin: 0;
        padding: 0;
        padding-left:2rem;
    }
    .logo{
        width: 3.5rem;
        height: 3.5rem;
        img {
            max-width: 2rem;
        }
    }
    h3{
        padding: 0;
        margin: 0;
        margin-left: 1rem;
    }
    .welcome{
        display: flex;
        flex-direction: column;
    }
    .avatar{
        height: 100%;
        display: flex;
        align-items: center;
        img{
            width: 2.7rem;
            height: 2.7rem;
            padding: 0;
            border-radius: 50%;
        }
        span{
            margin-left: 1rem;
            white-space: nowrap;  
            text-overflow:ellipsis; 
            overflow:hidden;
            text-align: center;
        }
    }
    .dropdown-arrow-lc{
        transition: transform 0.2s ease;
    }
    .dropdown-menu{
        display: none;
        position: absolute;
        top: 1rem;
    }
    .dropdown-lc:hover .dropdown-menu{
        display: block;
    }
    .dropdown-lc:hover .dropdown-arrow-lc{
        transition: transform 0.2s ease;
        transform:rotate(180deg);
    }
    .dropdown-lc{
        padding: 0;
        margin: 0;
        margin-left: 1rem;
        list-style: none;
        li{
            list-style: none;
        }
    }
</style>
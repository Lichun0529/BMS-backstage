<template>
   <div class="container">
                <div class="row justify-content-center">
                    <div class="col-9 col-md-7 col-lg-10 justify-content-center align-middle">
                        <div v-show="showAlert" class="alert alert-danger alert-dismissible shadow-soft  fade show" role="alert">
                            <span class="alert-inner--icon">
                                <span class="fas fa-fire"></span>
                            </span>
                            <span class="alert-inner--text">
                                <strong>{{alertStr}}</strong>.
                            </span>
                            <button @click="showAlert = false" type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="card bg-primary shadow-soft border-light p-4">
                            <div class="card-header text-center pb-0">
                                <h2 class="h4">Fund Management System</h2>  
                            </div>
                            <div class="card-body">
                                <!-- Form -->
                                <div class="form-group">
                                    <label for="exampleInputIcon3">Your email</label>
                                    <div class="input-group mb-4">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><span class="fas fa-envelope"></span></span>
                                        </div>
                                        <input v-model="email" class="form-control" id="exampleInputIcon3" placeholder="example@company.com" type="email" aria-label="email adress">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="form-group">
                                        <label for="exampleInputPassword6">Password</label>
                                        <div class="input-group mb-4">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><span class="fas fa-unlock-alt"></span></span>
                                            </div>
                                            <input v-model="password" class="form-control" id="exampleInputPassword6" placeholder="Password" type="password" aria-label="Password">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputIcon4">Your Identity</label>
                                        <div class="btn-group mr-2 mb-2">
                                            <button type="button" class="btn btn-primary" :class="identity=='Please choose'?'text-black-50':'shadow-inset'">{{identity}}</button>
                                            <button type="button" @click="chooseIdentity" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="fas fa-angle-down dropdown-arrow"></span>
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <div class="dropdown-menu pl-2 pr-2"   x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(91px, 44px, 0px);">
                                                <a class="dropdown-item " style="border-radius: 0.55rem;" v-for="(item,index) in IdentityList" :key="index" @click="changeIdt(item.idt)">{{item.idt}}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End of Form -->
                                    <div class="d-block d-sm-flex justify-content-between align-items-center mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" v-model="isRemember" id="defaultCheck5">
                                            <label class="form-check-label" for="defaultCheck5">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button @click="signIn" class="btn btn-block btn-primary text-secondary">
                                    Sign Up
                                    <span v-show="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </button>
                                <div class="d-block d-sm-flex justify-content-center align-items-center mt-4">
                                    <span class="font-weight-normal">
                                        Not registered?
                                        <router-link to="/register" class="font-weight-bold">Create account</router-link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script>
    import jwtdecode from 'jwt-decode'
    export default{
        data(){
            return{
                isRemember:false,
                showLoading:false,
                showAlert:false,
                alertStr:'',
                email:'',
                password:'',
                identity:'Please choose',
                IdentityList:[
                    {idt:'employee'},
                    {idt:'administrators'}
                ],
            }
        },
        created(){
            //remember me功能
            if(localStorage.getItem('loginInfo')){
                let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
                //7天有效期，过期删除
                if(Date.now()-loginInfo.time>604800000){
                    localStorage.removeItem('loginInfo')
                }else{
                    this.email = loginInfo.email;
                    this.password = loginInfo.password;
                    this.identity = loginInfo.identity; 
                }
            }
        },
        methods:{
            signIn(){
                let alertList = [];
                let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(this.email == ''){
                    alertList.push('email')
                }
                if(this.password == ''){
                    alertList.push('password')
                }
                if(this.password == ''){
                    alertList.push('password')
                }
                if(this.identity == 'Please choose'){
                    alertList.push('identity')
                }
                if(alertList.length != 0){
                    this.alertStr = 'Please input your ' + alertList.join(',');
                    this.showAlert = true;
                    document.body.scrollTop = document.documentElement.scrollTop = 0;//回顶部
                }else if(alertList.length == 0){
                    this.showLoading = true;
                    this.showAlert = false;
                    this.$axios.post('/api/users/login',{
                        email:this.email,
                        password:this.password,
                        identity:this.identity.toLowerCase()
                    }).then(res=>{
                        if(res.data.status == 1){
                            this.alertStr = 'Please check your email,password and identity';
                            this.showAlert = true;
                            this.showLoading = false;
                            document.body.scrollTop = document.documentElement.scrollTop = 0;//回顶部
                        }else if(res.data.status == 0){
                            this.alertStr = 'Email dosen\'t resigter';
                            this.showAlert = true;
                            this.showLoading = false;
                        }else if(res.data.token){
                            if(this.isRemember){
                                let loginInfo = {
                                    email:this.email,
                                    password:this.password,
                                    identity:this.identity.toLowerCase(),
                                    time:Date.now()
                                }
                                localStorage.setItem('loginInfo',JSON.stringify(loginInfo))
                            }
                            //登录其他账户后清除remeber me
                            if(localStorage.getItem('loginInfo')){
                                let loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
                                if(loginInfo.email!=this.email) localStorage.removeItem('loginInfo');
                            }
                            //本地储存token
                            localStorage.setItem('BMStoken',res.data.token)
                            //解析token并存储用户信息
                            let userInfo = jwtdecode(res.data.token);
                            let isAuthenticated = res.data.token ? true : false;
                            this.$store.dispatch('setAuthenticated',isAuthenticated)
                            this.$store.dispatch('setUserInfo',userInfo)
                            this.$router.push('/index')
                        }else{
                            this.alertStr = 'Failed';
                            this.showAlert = true;
                            this.showLoading = false;
                        }
                    })
                }
            },
            changeIdt(e){
                this.identity = e;
            },
            chooseIdentity(){
            }
        }
    }
</script>
<style lang="less" scoped>
     .container{
        /* height: 100%; */
        padding-top: 5%;
        padding-bottom: 5%;
    }
    @media (min-width: 990px) { 
        .col-lg-10{
            max-width: 500px;
        }
    }
    .btn-group{
        width: 100%;
    }
    .form-group{
        margin-bottom:0;
    }
    .alert{
        padding: 0.5rem 1rem;
    }
</style>

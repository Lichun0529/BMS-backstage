<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-9 col-md-7 col-lg-10 justify-content-center align-middle">
                <div v-show="showAlert" class="alert alert-danger alert-dismissible shadow-soft  fade show" role="alert">
                    <span class="alert-inner--icon">
                        <span class="fas fa-fire"></span>
                    </span>
                    <span class="alert-inner--text">
                        {{alertStr}}.
                    </span>
                    <button @click="showAlert=false" type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="card bg-primary shadow-soft border-light p-4">
                    <div class="card-header text-center pb-0">
                        <h2 class="mb-0 h5">Create Account</h2>                               
                    </div>
                    <div class="card-body">
                        <!-- Form -->
                        <div class="form-group">
                            <div class="form-group">
                            <label for="exampleInputIcon4">Your Name</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><span class="fas fa-envelope"></span></span>
                                </div>
                                <input class="form-control" v-model="name" id="exampleInputIcon4" placeholder="Name" type="text" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputIcon4">Your Email</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><span class="fas fa-envelope"></span></span>
                                </div>
                                <input class="form-control" v-model="email" id="exampleInputIcon4" placeholder="example@company.com" type="email" aria-label="email adress" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword7">Password</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><span class="fas fa-unlock-alt"></span></span>
                                </div>
                                <input class="form-control" @input="checkPwdRules" @focus="showToats = true" @blur="showToats = false" v-model="password" id="exampleInputPassword7" placeholder="Password" type="password" aria-label="Password" >
                            </div>
                            <div class="toast fade" :class="showToats?'show':'hide'" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header text-dark">
                                    <strong class="mr-auto ml-2">Tips</strong>
                                    <button type="button" class="ml-2 mb-1 close" @click="showToats = false" data-dismiss="toast" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div class="toast-body">
                                    <ul>
                                        <li :class="checkPwd.r1?'text-through text-black-50':''">The password length must between <strong>8-16 characters</strong></li>
                                        <li :class="checkPwd.r2?'text-through text-black-50':''">The password must contain at least <strong>1 lowercase alphabetical character</strong></li>
                                        <li :class="checkPwd.r3?'text-through text-black-50':''">The password must contain at least <strong>1 uppercase alphabetical character</strong></li>
                                        <li :class="checkPwd.r4?'text-through text-black-50':''">The password must contain at least <strong>1 numeric character</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleConfirmPassword7">Confirm Password</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><span class="fas fa-unlock-alt"></span></span>
                                </div>
                                <input class="form-control" v-model="confirmPassword" id="exampleConfirmPassword7" placeholder="Confirm password" type="password" aria-label="Password" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputIcon4">Your Identity</label>
                            <div class="btn-group mr-2 mb-2" >
                                <button type="button" class="btn btn-primary" :class="identity=='Please choose'?'text-black-50':'shadow-inset'" style="font-weight:300">{{identity}}</button>
                                <button type="button" @click="chooseIdentity" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="ariaExpanded">
                                    <span class="fas fa-angle-down dropdown-arrow"></span>
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu pl-2 pr-2" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(91px, 44px, 0px);">
                                    <a class="dropdown-item" style="border-radius: 0.55rem;" v-for="(item,index) in IdentityList" :key="index" @click="changeIdt(item.idt)">{{item.idt}}</a>
                                </div>
                            </div>
                        </div>
                        <!-- End of Form -->
                    </div>
                    <button @click="signIn"  class="btn btn-block btn-primary text-secondary" style="margin-top:1.3em">
                        Sign In<span v-show="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                    <div class="d-block d-sm-flex justify-content-center align-items-center mt-4">
                        <span class="font-weight-normal">
                            Already have an account?
                            <router-link to="/login" class="font-weight-bold">Login here</router-link>
                        </span>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!-- Modal Content -->
            <div class="modal fade" :class="showModal?'show':''" :style="showModal?'display: block':'display: none'" id="modal-achievement" tabindex="-1" role="dialog" aria-labelledby="modal-achievement" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content shadow-soft">
                        <div class="modal-body">
                            <div class="py-3 text-center">
                                <span class="modal-icon icon icon-dark display-1-lg"><span class="far fa-check-circle"></span></span>
                                <h2 class="h4 modal-title my-2">Sign In Success!</h2>
                                <p>Login...</p>
                                <div class="progress-wrapper">
                                    <div class="progress">
                                        <div class="progress-bar bg-dark" style="width: 100%; animation: 3s ease 0s 1 normal none running animate-positive; opacity: 1;" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- End of Modal Content -->
        <div class="modal-backdrop show" v-show="showModal"></div>
    </div>
</template>
<script>
    import jwtdecode from 'jwt-decode'
    export default{
        data(){
            return{
                checkPwd:{
                    r1:false,
                    r2:false,
                    r3:false,
                    r4:false,
                },
                showToats:false,
                showModal:false,
                showLoading:false,
                showAlert:false,
                alertStr:'',
                ariaExpanded:false,
                identity:'Please choose',
                IdentityList:[
                    {idt:'employee'},
                    {idt:'administrators'}
                ],
                name:'',
                email:'',
                password:'',
                confirmPassword:''
            }
        },
        methods:{
            chooseIdentity(){
                this.show = !this.show;
                this.ariaExpanded = !this.ariaExpanded
            },
            changeIdt(e){
                this.identity = e;
                this.show = this.ariaExpanded = false ;
            },
            signIn(){
                let alertList = [];
                let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                let pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
                if(this.name == ''){
                    alertList.push('name')
                }
                if(this.email == ''){
                    alertList.push('email')
                }
                if(this.password == ''){
                    alertList.push('password')
                }
                if(this.confirmPassword == ''){
                    alertList.push('confirm password')
                }
                if(this.identity == 'Please choose'){
                    alertList.push('identity')
                }
                if(emailReg.test(this.email) == false){
                    this.alertStr = 'Valid email address format';
                    this.showAlert = true;
                }else if(pwdReg.test(this.password) == false){
                    this.alertStr = 'The password length must between 8-16 characters,at least has 1 lowercase alphabetical character, at least has 1 uppercase alphabetical character,at least has 1 numeric character';
                    this.showAlert = true;
                }else if(this.password != this.confirmPassword){
                    this.showAlert = true;
                    this.alertStr = 'Confirm password not match';
                }else if(alertList.length != 0){
                    this.alertStr = 'Please input your ' + alertList.join(',');
                    this.showAlert = true;
                    document.body.scrollTop = document.documentElement.scrollTop = 0;//回顶部
                }else{
                    this.showLoading = true;
                    this.showAlert = false;
                    this.$axios.post('/api/users/register',{
                        name:this.name,
                        email:this.email,
                        password:this.password,
                        identity:this.identity.toLowerCase()
                    }).then(res=>{
                        if(res.data.success == true){
                            this.showModal = true
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
                            let loginCountdown = setTimeout(() => {
                                this.$router.push('/index').catch(()=>{})
                            }, 3000);
                        }
                    })
                }
            },
            checkPwdRules(){
                let r1Reg = /.{8,16}/;
                let r2Reg = /(?=.*?[a-z])/;
                let r3Reg = /(?=.*?[A-Z])/;
                let r4Reg = /(?=.*?[0-9])/;
                r1Reg.test(this.password)?this.checkPwd.r1 = true:this.checkPwd.r1 = false;
                r2Reg.test(this.password)?this.checkPwd.r2 = true:this.checkPwd.r2 = false;
                r3Reg.test(this.password)?this.checkPwd.r3 = true:this.checkPwd.r3 = false;
                r4Reg.test(this.password)?this.checkPwd.r4 = true:this.checkPwd.r4 = false;
                console.log(this.checkPwd.r1,this.checkPwd.r2,this.checkPwd.r3,this.checkPwd.r4);
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
        display: flex;
        align-items: center;
        .alert-inner--icon{
            width: 5%;
        }
        .alert-inner--text{
            width: 90%;
        }
        .close{
             width: 5%;
        }
    }
    .toast {
        position: absolute;
        right: -21rem;
        top: -36px;
        max-width: 320px;
        ul{
            padding-left: 2rem;
        }
        animation: show-dropdown .2s ease forwards;
    }
</style>
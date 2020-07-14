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
                            <input class="form-control" v-model="password" id="exampleInputPassword7" placeholder="Password" type="password" aria-label="Password" >
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
                        <div class="btn-group mr-2 mb-2" :class="show?'show':''">
                            <button type="button" class="btn btn-primary" >{{identity}}</button>
                            <button type="button" @click="chooseIdentity" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="ariaExpanded">
                                <span class="fas fa-angle-down dropdown-arrow"></span>
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu"  :class="show?'show':''" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(91px, 44px, 0px);">
                                <a class="dropdown-item" v-for="(item,index) in IdentityList" :key="index" @click="changeIdt(item.idt)">{{item.idt}}</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- End of Form -->
                </div>
                <button @click="signIn"  class="btn btn-block btn-primary text-secondary" style="margin-top:1.3em">
                    Sign In
                <span v-show="showLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
        <div class="modal fade" :class="showModal?'show':''" id="modal-notification" tabindex="-1" role="dialog" aria-labelledby="modal-notification" :style="showModal?'display: block; padding-right: 17px;':'display: none;'" :aria-modal="showModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-primary">
                    <div class="modal-body">
                        <div class="py-3 text-center">
                            <span class="modal-icon display-1-lg"><span class="far fa-check-circle"></span></span>
                            <h2 class="h4 my-3">Login...{{countdown}}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop show" v-show="showModal"></div>
    </div>
</template>
<script>
    // import api from '../request/api'
    export default{
        data(){
            return{
                showModal:false,
                countdown:3,
                showLoading:false,
                showAlert:false,
                alertStr:'',
                show:false,
                ariaExpanded:false,
                identity:'Identity',
                IdentityList:[
                    {idt:'Employee'},
                    {idt:'Administrators'}
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
                if(this.identity == 'Identity'){
                    alertList.push('identity')
                }
                if(emailReg.test(this.email) == false){
                    this.alertStr = 'Valid email address format';
                    this.showAlert = true;
                }else if(this.password != this.confirmPassword){
                    this.showAlert = true;
                    this.alertStr = 'Confirm password not match';
                }else if(alertList.length != 0){
                    this.alertStr = 'Please input your ' + alertList.join(',');
                    this.showAlert = true;
                    document.body.scrollTop = document.documentElement.scrollTop = 0;//回顶部
                }else{
                    this.showAlert = false;
                    this.$axios.post('/api/users/register',{
                        name:this.name,
                        email:this.email,
                        password:this.password,
                        identity:this.identity
                    }).then(res=>{
                        console.log(res);
                        this.showModal = true
                        if(res.data.success == true){
                            let countdown = setInterval(() => {
                                this.countdown--
                                if(this.countdown == 0){
                                    this.$router.push({
                                        name:'index'
                                    })
                                }
                            }, 1000);
                        }
                    })
                }
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
</style>

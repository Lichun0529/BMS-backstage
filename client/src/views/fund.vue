<template>
    <div class="container">
        <div class="row justify-content-between">
            <div class="col-md-10 col-lg-10 col-xl-8" >
                <div class="input-daterange datepicker row align-items-center">
                    <div class="col-5">
                        <div class="form-group">
                            <span class="h6" for="exampleInputDate2">From:</span>
                            <div class="input-group input-group-border">
                                <div class="input-group-prepend"><span class="input-group-text"><span class="far fa-calendar-alt"></span></span></div>
                                <input  autocomplete="off" class="form-control datepicker" id="startdate" placeholder="Start date" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="form-group">
                            <label class="h6" for="exampleInputDate3">To:</label>
                            <div class="input-group input-group-border">
                                <div class="input-group-prepend"><span class="input-group-text"><span class="far fa-calendar-alt"></span></span></div>
                                <input autocomplete="off" class="form-control datepicker" id="enddate" placeholder="End date" type="text">
                            </div>
                        </div>
                    </div>
                    <button @click="dateFilter" class="btn btn-primary btn-sm col-1 searchBtn" type="button">
                        <span class="fas fa-search"></span>
                    </button>
                </div>
            </div>
            <button v-if="user.identity == 'administrators'" @click="showModalAdd = true" style="min-width: 5rem;" class="btn btn-primary btn-sm col-md-1 col-lg-1 col-xl-1 text-success" type="button" >
                Add<span class="ml-2"><span class="fas fa-plus"></span></span>
            </button>
        </div>
        <div class="row mt-4">
            <table class="table table-hover shadow-inset rounded">
                <thead>
                    <tr>
                        <th class="border-0" width="13%" style="min-width:10rem;" scope="col" id="creatTime">
                            <a @click="reSort">Create Time
                                <i class="fas fa-sort ml-1"></i>
                            </a>
                        </th>
                        <th class="border-0" width="14%" scope="col" id="type">Type</th>
                        <th class="border-0" width="17%" scope="col" id="describe">Describe</th>
                        <th class="border-0" width="7%" scope="col" id="income">Income</th>
                        <th class="border-0" width="5%" scope="col" id="expend">Expend</th>
                        <th class="border-0" width="7%" scope="col" id="cash">Cash</th>
                        <th class="border-0" width="26%" scope="col" id="remarks">Remarks</th>
                        <th v-if="user.identity == 'administrators'" class="border-0" style="min-width:8rem;" width="1%" scope="col" id="options">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="tableLoading">
                        <td colspan="8" style="font-size:2rem">
                            <span v-show="!tableEmpty" class="spinner-border spinner-border-sm "></span>
                            <span v-show="!tableEmpty" class="ml-2">Loading...</span>
                            <span v-show="tableEmpty" class="ml-2">Empty</span>
                        </td>
                    </tr>
                    <tr v-for="(item,i) in tableData" :key="i">
                        <td >{{item.date}}</td>
                        <td >{{item.type}}</td>
                        <td >{{item.describe}}</td>
                        <td class="text-success" style="font-weight:700">{{item.income}}</td>
                        <td class="text-danger" style="font-weight:700">-{{item.expend}}</td>
                        <td >{{item.cash}}</td>
                        <td >{{item.remark}}</td>
                        <td v-if="user.identity == 'administrators'">
                            <button @click="editData(item._id,i)" class="btn btn-sm  btn-primary text-info mr-2" style="" type="button">
                                <span class="far fa-edit ml-1"></span>
                            </button>
                            <button  id="delBtn" class="btn btn-sm  btn-primary text-danger" type="button" data-toggle="dropdown">
                                <span class="far fa-trash-alt ml-1 mr-1"></span>
                            </button>
                            <div class="dropdown-menu" x-placement="bottom-start">
                                <p class="text-danger">Are you sure?</p>
                                <button class="btn btn-sm  btn-primary mr-2" style="" type="button">No</button>
                                <button v-show="!showLoading" @click="delData(item._id,i)" class="btn btn-sm  btn-primary text-danger" type="button">Yes</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer mt-3">
            <span class="mr-3" style="color:#a1a2b5;">{{allItems}} items</span>
            <select v-model="pageSize" @change="getData" class="custom-select mr-3 shadow-inset" style="width:5.5rem;">
                <option value="10">10/Page</option>
                <option value="15">15/Page</option>
                <option value="20">20/Page</option>
                <option value="25">25/Page</option>
            </select>
            <div class="pageNav">
                <nav aria-label="navigation">
                    <ul class="pagination pagination ">
                        <li class="page-item rounded" >
                            <a class="page-link" @click="lastBtn" style="font-size:0.8rem"  ><span class="fas fa-angle-double-left"></span></a>
                        </li>
                        <li class="page-item rounded" @click="pageButton(i)" :class="{active:pageBtnIndex == i}" v-for="(item,i) in allPages" :key="i">
                            <a class="page-link" style="font-size:0.8rem" >{{i+1}}</a>
                        </li>
                        <li class="page-item rounded">
                            <a class="page-link"  @click="nextBtn" style="font-size:0.8rem" ><span class="fas fa-angle-double-right"></span></a>
                        </li>
                    </ul>
                </nav>
            </div>
            <span class="ml-3" style="color:#a1a2b5;">go to page</span>
            <input type="number" v-model="gotoPage" class="form-control ml-1 mr-1" style="width:4rem;font-size:0.8rem">
            <a @click="goPage" class="text-dark font-weight-bold" style="font-size:0.8rem">
                Go<span class="ml-1"><span class="fas fa-angle-double-right"></span></span>
            </a>
        </div>
        <ModalAdd v-show="showModalAdd"  @close="closeModalAdd" @getData="getData"></ModalAdd>
        <ModalEdit :id="editId" :editData="editDatalist" :loading="editLoading" v-show="showModalEdit" @close="closeModalAdd" @getData="getData"></ModalEdit>
    </div>
</template>
<script >
    import ModalAdd from '../components/modalAdd'
    import ModalEdit from '../components/modaEdit'
     export default{
         name:'fund',
         components:{ModalAdd,ModalEdit},
         data(){
             return{
                tableEmpty:false,
                tableLoading:false,
                editLoading:false,
                showModalAdd:false,
                showModalEdit:false,
                tableData:[],
                showLoading:false,
                editDatalist:[],
                editId:'',
                pageIndex:1,
                allItems:0,
                pageSize:10,
                pageIndex:1,
                sort:-1,//降序排列数据
                pageBtnIndex:0,
                allPages:0,
                gotoPage:1,
                startDate:'',
                endDate:''
             }
         },
         created(){
             this.getData()
         },
         mounted(){
             $(".datepicker").datepicker({
                format: "yyyy-mm-dd", 
                todayBtn: "linked",
                language: "zh-CN",
                orientation: "auto",//日期控件显示位置
                startView:"days",//默认显示视图：months、years、centuries，可选
                minViewMode:"days",//最小显示视图
                keyboardNavigation: false,
                autoclose: true,
                todayHighlight: true
            });
         },
         computed:{
             user(){
                 return this.$store.getters.userInfo
             }
         },
         methods:{
             lastBtn(){
                if(this.pageIndex == 1){
                     return false
                }else{
                     this.pageIndex --
                     this.pageBtnIndex --
                     this.getData()
                }
             },
             nextBtn(){
                 if(this.pageIndex == this.allPages){
                     return false
                }else{
                     this.pageIndex ++
                     this.pageBtnIndex ++
                     this.getData()
                }
             },
             dateFilter(){//时间范围内查找
                this.startDate = $('#startdate').data("datepicker").getDate();
                this.endDate = $('#enddate').data("datepicker").getDate();
                this.getData()
             },
             goPage(){//跳页
                this.pageIndex = this.gotoPage;
                this.getData()  
             },
             pageButton(i){//点击页码
                this.pageBtnIndex = i;
                this.pageIndex = i+1;
                this.getData()
             },
             reSort(){//排序
                 this.sort == -1?this.sort = 1:this.sort = -1;
                 this.getData(this.sort)
             },
             getData(sort){
                this.tableData = [];
                let url = '/api/profiles/getProfile/'
                let params = {
                        sort:this.sort,
                        pageIndex:this.pageIndex,
                        pageSize:parseInt(this.pageSize),
                        startDate:this.startDate,
                        endDate:this.endDate
                    };
                this.tableLoading = true;
                this.$axios.post(url,params).then(res=>{
                    console.log(res);
                    if(res.data){
                        for(let i in res.data.data){
                            // res.data[i].date = new Date(res.data[i].date).valueOf();
                            let timestamp  = new Date(res.data.data[i].date).valueOf();
                            res.data.data[i].date = this.GMTToStr(timestamp);
                        }
                        if(res.data.dateAllitems != -1){//按时间范围筛选时总数据数
                            this.allItems = res.data.dateAllitems;
                            //获取总页数
                            this.allPages = Math.ceil(this.allItems/this.pageSize);
                        }else{
                            //获取数据总数量
                            this.$axios.get('/api/profiles/allprofile/').then(res=>{
                                if(res.status == 200)this.allItems = res.data;
                                //获取总页数
                                this.allPages = Math.ceil(this.allItems/this.pageSize);
                            }).catch(err=>{
                                    console.log(err);
                                })
                        }
                         

                        this.tableLoading = false;
                        this.tableData = res.data.data;
                    }else{
                        this.tableEmpty = true;
                    }
                }).catch(err=>{
                    this.$message('Capture Data Failed.','error')
                    this.tableLoading = false;
                    console.log(err);
                })
                
             },
             editData(id,i){
                this.showModalEdit = true;
                this.editLoading = true;
                this.editId = id;
                this.$axios.get('/api/profiles/'+id).then(res=>{
                    if(res.status == 200){
                        this.editLoading = false;
                        this.editDatalist = res.data;
                    }
                }).catch(err=>{
                    console.log(err);
                })
             },
             delData(id,i){
                this.tableData.splice(i,1)
                this.showLoading = true ;
                this.$axios.delete('/api/profiles/delete/'+id).then(res=>{
                    if(res.status == 200){
                        this.showLoading = false ;
                        this.$message('Success!')
                    }
                }).catch(err=>{
                    this.showLoading = false;
                    this.$message('Failed!','error')
                    console.log(err);
                })
             },
             closeModalAdd(){
                 this.showModalAdd = false;
                 this.showModalEdit = false;
             },
             GMTToStr(time){
                let date = new Date(time);
                let Str = date.getFullYear() + '-' +
                ((date.getMonth() + 1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '-' +
                (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ' +
                (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':' +
                (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':' +
                (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())
                return Str
            }
         },
         watch:{
             gotoPage:function(nVal,oVal){
                 if(nVal<1) this.gotoPage = 1;
                 if(nVal>this.allPages) this.gotoPage = this.allPages;
             }
         }
     }
</script>
<style lang="less" scoped>
    .container{
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: none;
        .row{
            margin: 0;
        }
    }
    .form-group{
        display: flex;
        align-items: center;
        margin-bottom: 0;
        .h6{
            margin-bottom: 0;
            margin-right: 1rem;
        }
    }
    .searchBtn{
        padding: 0.55rem 0;
    }
    .table{
        font-size: 0.8rem;
        th,td{
            text-align: center;
            border-right: 0.0625rem solid #D1D9E6;
            padding: 0.5rem 1rem;
        }
    }
    .border-0{
        border-right: 0.0625rem solid #D1D9E6 !important;
    }
    .btn-sm{
        line-height: 0.5;
    }
    .footer{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .pageNav{
            ul{
                margin: 0;
            }
        }
    }
    .form-control,h6,span,.custom-select{
        font-size: 0.8rem;
    }
    .toast {
        position: absolute;
        right: 1rem;
        top: 20px;
        animation: show-dropdown .2s ease forwards;
    }
    .dropdown-menu{
        padding: 1rem;
        max-width: 9rem;
        min-width: 8rem;  
        text-align: center;
    }
    tbody{
        font-weight: 500;
    }
    .shadow-soft {
    box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #ffffff !important;
}
[class*="shadow"] {
    transition: all 0.2s ease;
}
</style>
<style >
    .datepicker-dropdown{
        box-shadow:6px 6px 12px #b8b9be, -6px -6px 12px #ffffff !important;
        border-radius: 0.55rem !important;
    }
</style>
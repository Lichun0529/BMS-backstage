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
                                <input class="form-control datepicker" @click="picker" id="exampleInputDate2" placeholder="Start date" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="form-group">
                            <label class="h6" for="exampleInputDate3">To:</label>
                            <div class="input-group input-group-border">
                                <div class="input-group-prepend"><span class="input-group-text"><span class="far fa-calendar-alt"></span></span></div>
                                <input class="form-control datepicker" id="exampleInputDate3" placeholder="End date" type="text">
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm col-1 searchBtn" type="button">
                        <span class="fas fa-search"></span>
                    </button>
                </div>
            </div>
            <button class="btn btn-primary btn-sm col-md-1 col-lg-1 col-xl-1" type="button">
                Add<span class="ml-2"><span class="fas fa-plus"></span></span>
            </button>
        </div>
        <div class="row mt-4">
            <table class="table shadow-inset rounded">
                <thead>
                    <tr>
                        <th class="border-0" width="19%" scope="col" id="creatTime">
                            <a>Create Time
                                <i class="fas fa-sort-up ml-1"></i>
                                <i class="fas fa-sort-down " style="position: relative;left: -0.62rem;"></i>
                            </a>
                        </th>
                        <th class="border-0" width="7%" scope="col" id="type">Type</th>
                        <th class="border-0" width="15%" scope="col" id="describe">Describe</th>
                        <th class="border-0" width="7%" scope="col" id="income">Income</th>
                        <th class="border-0" width="5%" scope="col" id="expenditure">Expenditure</th>
                        <th class="border-0" width="7%" scope="col" id="cash">Cash</th>
                        <th class="border-0" width="20%" scope="col" id="remarks">Remarks</th>
                        <th class="border-0" style="min-width:8rem;max-width:8rem;" scope="col" id="options">Options</th>
                    </tr>
                </thead>
                <tbody class="table-hover">
                    <tr v-for="(item,i) in 10" :key="i">
                        <td >5123123123</td>
                        <td >51231</td>
                        <td >523123</td>
                        <td >5123123</td>
                        <td >512312</td>
                        <td >53123</td>
                        <td >5123</td>
                        <td >
                            <button class="btn btn-sm  btn-primary text-info mr-2" style="" type="button">
                                <span class="ml-1"><span class="far fa-edit"></span></span>
                            </button>
                            <button class="btn btn-sm  btn-primary text-danger" type="button">
                                <span class="ml-1 mr-1"><span class="far fa-trash-alt"></span></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer mt-3">
            <span class="mr-3" style="color:#a1a2b5;">15 items</span>
            <select class="custom-select mr-3 shadow-inset" style="width:5.5rem;font-size:0.8rem" id="inlineFormCustomSelectPref">
                <option selected="" value="10">10/Page</option>
                <option value="15">15/Page</option>
                <option value="20">20/Page</option>
                <option value="25">25/Page</option>
            </select>
            <div class="pageNav">
                <nav aria-label="navigation">
                    <ul class="pagination pagination ">
                        <li class="page-item rounded">
                            <a class="page-link" style="font-size:0.8rem" aria-label="first link" href="#"><span class="fas fa-angle-double-left"></span></a>
                        </li>
                        <li class="page-item rounded" v-for="(item,i) in 5" :key="i">
                            <a class="page-link" style="font-size:0.8rem" href="#">{{i+1}}</a>
                        </li>
                        <li class="page-item rounded">
                            <a class="page-link" style="font-size:0.8rem" aria-label="first link" href="#"><span class="fas fa-angle-double-right"></span></a>
                        </li>
                    </ul>
                </nav>
            </div>
            <span class="ml-3" style="color:#a1a2b5;">go to page</span>
            <input type="number" class="form-control ml-1 mr-1" style="width:4rem;font-size:0.8rem">
            <a href="#" class="text-dark font-weight-bold" style="font-size:0.8rem">
                Go<span class="ml-1"><span class="fas fa-angle-double-right"></span></span>
            </a>
        </div>
        
    </div>
</template>
<script >
    
     export default{
         name:'fund',
         data(){
             return{
                 tableData:[]
             }
         },
         created(){
            this.$axios.get('/api/profiles/allprofile').then(res=>{
                console.log(res);
                    
            })
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
         methods:{
             picker(){
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
    .bb{
        border-bottom: 0.0625rem solid #D1D9E6;
    }
    .br{
        border-right: 0.0625rem solid #D1D9E6;
    }
    th,td{
        text-align: center;
        border-right: 0.0625rem solid #D1D9E6;
        padding: 0.5rem 1rem;
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
</style>
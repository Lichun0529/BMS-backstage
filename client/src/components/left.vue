<template>
        <div class="">
            <div class="accordion">
                <div class="card card-sm card-body bg-primary mb-1" :class="item.checked?'checked':''" v-for="(item,i) in items" :key="i">
                    <a class="accordion-panel-header " :data-target="'#panel-'+i" data-toggle="collapse" role="button" aria-expanded="false" :aria-controls="'panel-'+i">
                        <span :class="item.icon"></span>
                        <span class="font-weight-bold">{{item.name}}</span>
                        <span class="icon"><span class="fas fa-plus"></span></span>
                    </a>
                    <div class="collapse" :class="item.checked?'show':''" :id="'panel-'+i" v-for="(children,j) in item.children" :key="j">
                        <ul class="left-list">
                            <router-link :to="children.path"><li class="font-weight-bold" :class="children.checked?'checked':''">{{children.name}}</li></router-link>   
                        </ul>
                    </div>
                </div>
            </div>
        </div>
</template>
<script >
     export default{
         name:'userPage',
         props:['path'],
         data(){
             return{
                //  path:this.$route.path,
                 items:[
                     {
                        icon:'fab fa-leanpub',
                        name:'Billing',
                        path:'fund',
                        checked:false,
                        children:[
                            {path:'/billings',name:'Billings',checked:false},
                            {path:'/billings',name:'Billings',checked:false}
                        ]
                     },
                     {
                        icon:'fas fa-id-badge',
                        name:'Information',
                        path:'information',
                        checked:false,
                        children:[{path:'/userpage',name:'User Information',checked:false}]
                     }
                 ]
             }
         },
         watch:{
             path:(nPath,oPath)=>{
                 console.log(nPath);
             }
         }
     }
</script>
<style lang="less" scoped>
    .checked{
        box-shadow: inset 2px 2px 5px #b8b9be,inset -3px -3px 7px #fff !important;
        border-radius: .55rem !important;
    }
    .accordion{ 
        margin-top: 1rem;
    }
    .left-list{
        padding: 0.5rem 0;
        padding-bottom: 0;
        margin: 0;
        li,ul{
            list-style: none;
        }
        li{
            padding: 0.5rem 0;
            text-align: center;
            font-size: 0.9rem;
        }
        li:hover{
            // box-shadow: inset 2px 2px 5px #b8b9be,inset -3px -3px 7px #fff !important;
            // border-radius: .55rem !important;
            .checked()
        }
    }
    .card-body{
        margin:0 1rem !important;
        padding: 1rem 1.5rem ;
    }
    .card-body:hover{
        // box-shadow: inset 2px 2px 5px #b8b9be,inset -3px -3px 7px #fff !important;
        // border-radius: .55rem !important;
        .checked()
    }
    
</style>
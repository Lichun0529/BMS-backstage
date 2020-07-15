<template>
        <div class="">
            <div class="accordion">
                <div class="card card-sm card-body bg-primary mb-1" :class="item.checked?'checked':''" v-for="(item,i) in items" :key="i">
                    <a class="accordion-panel-header" @click="changeHeader(item.path,i)" :data-target="'#panel-'+i" data-toggle="collapse" role="button" aria-expanded="false" :aria-controls="'panel-'+i">
                        <span :class="item.icon"></span>
                        <span class="font-weight-bold">{{item.name}}</span>
                        <span class="icon"><span class="fas fa-plus " v-show="item.children?true:false"></span></span>
                    </a>
                    <div class="collapse" :class="item.checked?'':''" :id="'panel-'+i" v-for="(children,j) in item.children" :key="j">
                        <ul class="left-list">
                            <a @click="changeItem(children.path,i,j)"><li class="font-weight-bold" :class="children.checked?'checked':''">{{children.name}}</li></a>   
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
                 items:[
                     {
                        icon:'fas fa-home',
                        name:'Home',
                        path:'home',
                        checked:true,
                     },
                     {
                        icon:'fas fa-hand-holding-usd',
                        name:'Fund',
                        checked:false,
                        children:[
                            {path:'/fund',name:'Fund',checked:false},
                            {path:'/fund1',name:'Fund1',checked:false},
                        ]
                     },
                     {
                        icon:'fas fa-cog',
                        name:'Information',
                        checked:false,
                        children:[{path:'/userpage',name:'User Information',checked:false}]
                     }
                 ]
             }
         },
         methods:{
             changeHeader(path,i){
                if(path != 'home'){
                    //展开collapse则为选中状态
                    this.items[i].checked = !this.items[i].checked;
                }
                if(path){
                    this.$router.push(path).catch(()=>{});
                }
                if(path == 'home'){
                    //home或其他二级标题只能有一个被选中
                    this.items[0].checked = true;
                    this.cancelChecked()
                }
             },
             changeItem(path,i,j){
                this.$router.push(path).catch(()=>{});
                this.cancelChecked()
                //当前路由的item设为选中状态
                if(this.items[i].children[j].path==path){
                    this.items[i].children[j].checked = true;
                    //home标题取消选中
                    this.items[0].checked = false;
                }
             },
             cancelChecked(){
                 //所有二级标题取消选中
                for(let k in this.items){
                    for(let l in this.items[k].children){
                        this.items[k].children[l].checked = false;
                    }
                }
             }
         },
         beforeRouteEnter:(to,from,next)=>{
            //此时该组件还没被实例化
            // console.log('未实例化');//弹出消息框信息为 undefined
            next(vm =>{
                //此时该组件被实例化了
                // console.log('实例化');
            })
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
<template>
    <div class="container">
        <div class="row">
            <table class="table shadow-inset rounded">
                <tbody>
                    <tr v-for="(item ,i) in 6" :key=i>
                        <td v-for="(item ,j) in 6" :key=j>
                            <button :id="i+''+j" @click="chlick(i,j)" class="btn btn-icon-only btn-pill btn-primary shadow-soft" ></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="blue = false;red = true" :class="red?'shadow-inset':''" class="btn btn-primary text-danger mr-3" type="button">RED</button>
        <button @click="blue = true;red = false" :class="blue?'shadow-inset':''" class="btn btn-primary text-secondary" type="button">BLUE</button>
    </div>
</template>
<script >
     export default{
         name:'game',
         data(){
             return{
                 checked:false,
                 blue:false,
                 red:true,
                 i:'',
                 j:''
             }
         },
         methods:{
            chlick(i,j){
                let border = this.blue == true?  "border-blue":"border-red"
                if( document.getElementById(i+''+j).classList.contains('shadow-inset')){
                    document.getElementById(i+''+j).classList.remove("shadow-inset","border-blue","border-red");
                    document.getElementById(i+''+j).classList.add("shadow-soft");
                }else{
                    document.getElementById(i+''+j).classList.add("shadow-inset",border);
                }
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
    .table{
        width: 0;
        td{
            border-right: 0.0625rem solid #D1D9E6;
            border-top: 0;
            padding: .5rem;
        }
    }
    .border-red{
        border: 1px solid rgb(169, 30, 44);
    }
    .border-blue{
        border: 1px solid #0056B3;
    }

</style>
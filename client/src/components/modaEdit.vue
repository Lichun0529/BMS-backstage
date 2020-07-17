<template>
  <div class="content">
    <div class="modalAdd modal-content shadow-soft">
      <div class="modal-header">
        <h2 class="h6 modal-title mb-0" style="font-weight:700">Edit Data</h2>
        <button @click="close" type="button" class="close">
          <span>×</span>
        </button>
      </div>
      <form @submit.prevent="save" id="myForm">
        <div class="modal-body">
            <table class="table border-0">
                <tbody>
                    <tr>
                        <th>Type:</th>
                        <td>
                            <select class="custom-select my-1 mr-sm-2 shadow-inset" v-model="type" required>
                                <option value="餐饮">餐饮</option>
                                <option value="交通">交通</option>
                                <option value="日用">日用</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Describes:</th>
                        <td><input v-model="describes" class="form-control" type="text" required></td>
                    </tr>
                    <tr>
                        <th>Income:</th>
                        <td><input v-model="income" class="form-control" type="number" required></td>
                    </tr>
                    <tr>
                        <th>Expend:</th>
                        <td><input v-model="expend" class="form-control" type="number" required></td>
                    </tr>
                    <tr>
                        <th>Cash:</th>
                        <td><input v-model="cash" class="form-control" type="number" required></td>
                    </tr>
                    <tr>
                        <th>Remarks:</th>
                        <td><input v-model="remarks" class="form-control" type="text" ></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div data-v-ff9c8678 class="modal-footer">
            <button type="submit" class="btn btn-primary text-success">Save<span v-show="showLoading" class="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true"></span></button>
            <button @click="close" type="reset" class="btn btn-primary text-danger">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalEdit",
  data(){
      return{
        type:'',
        describes:'',
        income:'',
        expend:'',
        cash:'',
        remarks:'',
        showLoading:false
      }
  },
  methods:{
      close(){
          this.$emit('close')
          document.getElementById("myForm").reset()
      },
      save(){
          this.showLoading = true;
          this.$axios.post('api/profiles/add',{
            type:this.type,
            describe:this.describes,
            income:this.income,
            expend:this.expend,
            cash:this.cash,
            remarks:this.remarks
          }).then(res=>{
              if(res.status == 200){
                  this.showLoading = false;
                  this.close()
                  this.$emit('getData')
                  this.$message('Success!')
              }
          }).catch(err=>{
                this.showLoading = false;
                this.close()
                this.$message('Failed!','error')
                console.log(err);
            })
      },
  }
};
</script>
<style lang="less" scoped>
    .content {
        position: absolute;
        top: 3rem;
        left: 0;
        width: 100%;
    }
    .modalAdd {
        position: relative;
        z-index: 1050;
        max-width: 400px;
        margin: 0 auto;
    }
    .modal-header{
        padding: 0.5rem 1rem;
    }
    .modal-footer{
        padding: 0.8rem 1rem;
        justify-content: space-between;
    }
    table{
        th,td{
            border-top: 0 !important;
            padding: 3px 0;
            text-align: center;
            vertical-align: middle;
        }
    }
</style>
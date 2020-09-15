<template>
 <div class="table-bg">
    <el-table
    :data="rolelist" >
     <el-table-column
      prop="id"
      label="ID">
    </el-table-column>
      <el-table-column
      prop="rolename"
      label="角色名称">
    </el-table-column>
      <el-table-column
      label="状态">
      <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
              </template>
    </el-table-column>
   
    <el-table-column label="修改">
      <template slot-scope="scope">
       <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
      <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
       
      </template>
    </el-table-column>
     </el-table>
 </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex"
import {delRole} from "@/request/role"
export default {
 data(){
 return{
    //  list:[
    //      {id:1,name:"张三",age:22},
    //      {id:2,name:"李四",age:12},
    //      {id:3,name:"王伟",age:54},
    //      {id:4,name:"张是的三",age:78},
    //      {id:5,name:"水电费",age:66}
    //  ]
 }
 },
     computed: {
        ...mapGetters({
            rolelist:"role/rolelist"
        })
    },
    mounted() {
        if(!this.rolelist.length){
            this.get_role_list();
        }
    },
 created(){},
 methods:{
     ...mapActions({
            get_role_list:"role/get_role_list",
            get_menu_list:"menu/get_menu_list"
        }),
        edit(val){
             this.$emit('edit',{...val})
        },
       async del(id){
     this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delRole(id);
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.get_role_list(); // 重新获取列表！
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(()=>{})
        }
 },
 components:{}
}

</script>
<style scoped>
</style>
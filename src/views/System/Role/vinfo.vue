<template>

  <el-dialog :title="info.isAdd ? '添加角色':'修改角色'" @close="cancel()" :visible.sync="info.isShow"   width="40%">
    <!-- 表单 -->

    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      
        <el-form-item label="角色名称" prop="rolename">
            <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
        </el-form-item> 
        <el-form-item label="角色权限"   prop="url">
          <el-tree default-expand-all
                   node-key="id"
                   ref="tree"
                   :data="menulist"
                   show-checkbox
                   :props="{children:'children',label:'title'}"
                   :check-strictly="checkStrictly"
          ></el-tree>
          
        </el-form-item>
        <el-form-item label="角色状态">
            <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</el-dialog>
</template>

<script>
import {addRole,editRole} from "@/request/role"
import {mapGetters,mapActions, mapState, createLogger} from "vuex"
let defaultItem={
                rolename:'',
                menus:'',
                status:1
             }
let resetItem = {...defaultItem}
export default {
    props:{
   info:{
       type:Object,
       default(){
         return {
             isAdd:true,
             isShow:false
         }
       }

   }
    },
 data(){
 return{
    rules:{
        rolename:[{required: true, message: '必填', trigger: 'blur' }],

    },
     forminfo:{...defaultItem},
     checkStrictly:false
 }
 },
 computed: {
     ...mapGetters({
         menulist:"menu/menulist"
     })
 },
 created(){
     console.log(this)
 },
 mounted() {
     console.log(this.menulist)
   if(!this.menulist.length){
          this.get_menu_list()
   }
 },
 methods:{
       setinfo(val){  // 将数据赋给默认defaultItem; 赋给表单
            console.log(val)
            let idarr = val.menus.split(",");
            if(idarr[0]){
                this.checkStrictly = true;
                this.$nextTick(()=>{
                    this.$refs.tree.setCheckedKeys(idarr)
                    this.checkStrictly = false;
                })

             
            }
            defaultItem = {...val};
            this.forminfo = {...val};
        },
     ...mapActions({
get_menu_list:"menu/get_menu_list",
 get_role_list:"role/get_role_list"
     }),
    async submit(){
         let idarr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
            if(idarr.length){
                this.forminfo.menus = idarr;  
            }else{
                this.$message.warning('请选择权限');
                return;
            }
 this.$refs.form.validate(async valid => {
          if (valid) {
            let res;
         if(this.info.isAdd){
           res = await addRole(this.forminfo);
         
         }else{
            res= await editRole(this.forminfo)
         }
          if(res.code==200){
              this.$message.success(res.msg)
              this.info.isShow = false
                this.get_role_list(); // 重新获取角色列表！
                this.cancel()
          }else{
              this.$message.error(res.msg)
          }
          } 
        });

      
     },
     reset(){
        if(this.info.isAdd){ // 添加时候的重置！
                this.forminfo = {...resetItem}
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            }
     },
     cancel(){
         this.$refs.tree.setCheckedKeys([])
         this.forminfo = {...resetItem}
     }

 },
 components:{}
}

</script>
<style scoped>
</style>
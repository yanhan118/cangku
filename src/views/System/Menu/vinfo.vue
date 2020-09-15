<template>

  <el-dialog :title="info.isAdd ? '添加':'修改'"  :visible.sync="info.isShow"   width="40%">
    <!-- 表单 -->

    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
        <el-form-item label="菜单类型">
            <el-radio-group v-model="forminfo.type">
                <el-radio :label="1">目录</el-radio>
                <el-radio :label="2">菜单</el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item v-if="forminfo.type==2" label="上级目录">
            <el-select v-model="forminfo.pid" placeholder="请选择">
                <el-option label="顶级目录" :value="0"></el-option>
                <el-option  v-for="item in menulist" v-if="item.type==1" :key="item.id" :label="item.title"  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="forminfo.type==1 ?'目录名称':'菜单名称'" prop="title">
            <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
            <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
        </el-form-item> 
        <el-form-item label="菜单地址" v-if="forminfo.type==2"  prop="url">
            <el-input v-model="forminfo.url" placeholder="请输入菜单地址"></el-input>
        </el-form-item>
        <el-form-item label="状态">
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
import {addMenu,editMenu} from "@/request/menu"
import {mapGetters,mapActions, mapState} from "vuex"
let defaultItem={
                 pid:0,
                 title:'',
                 icon:'',
                 type:1,
                 url:'',
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
        title:[{required: true, message: '请输入名称', trigger: 'blur' }],
        icon:[{required: true, message: '请输入图标class', trigger: 'blur' }],
        url:[{required: true, message: '请输入菜单地址', trigger: 'blur' }],

    },
     forminfo:{...defaultItem},
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
            defaultItem = {...val};
            this.forminfo = {...val};
        },
     ...mapActions({
get_menu_list:"menu/get_menu_list"
     }),
    async submit(){
 this.$refs.form.validate(async valid => {
          if (valid) {
            let res;
         if(this.info.isAdd){
           res = await addMenu(this.forminfo);
         
         }else{
            res= await editMenu(this.forminfo)
         }
          if(res.code==200){
              this.$message.success(res.msg)
              this.info.isShow = false
              this.get_menu_list()
              this.forminfo = {...resetItem}
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
     }
 },
 components:{}
}

</script>
<style scoped>
</style>
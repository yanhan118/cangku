<template>
 <div>
    <el-button type="primary" @click="add">添加菜单</el-button>
     <vlist @edit="edit"></vlist>
     <vinfo :info="info" ref="dialog"></vinfo>
 </div>
</template>

<script>
import vlist from "./vlist"
import vinfo from "./vinfo"
export default {
 data(){
 return{
     info:{
         isAdd:false,
         isShow:false
     }
 }
 },
 created(){},
 methods:{
     add(){
    this.info.isAdd=true,
    this.info.isShow=true
     },
     edit(val){
         this.info.isAdd=false,
         this.info.isShow=true,
         this.$refs.dialog.setinfo(val);
     }
 },
 components:{
     vlist,vinfo
 }
}

</script>
<style scoped>
</style>
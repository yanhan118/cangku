<template>

<el-container class="page">
         <el-aside :width="iscollapse ? '64px':'220px'" class="nav" >
             <!-- Aside content -->
         <left></left>
         </el-aside>
         <el-container class="content">
             <el-header  class="header" >
                 <!-- Header content -->
                 <top></top>
             </el-header>
             <el-main class="main">
                      <router-view/>
                 <!-- Main content -->
             </el-main>
         </el-container>
     </el-container>

</template>

<script>
import left from "./Left"
import top from "./Header"
import {mapState} from "vuex"
export default {
 data(){
 return{}
 },
 created(){},
 methods:{},
 computed: {
     ...mapState(['iscollapse'])
 },
 components:{
    left,top
 }
}

</script>
<style scoped>
.page{
    width: 100vw;
    height: 100vh;
}
.nav{
    height: 100%;
    background-color: #444;
}
.content{
    height: 100%;
    background-color: #f7f7f7;
}
.header{
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
</style>
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import menu from "./module/menu"
import role from "./module/role"
import user from "./module/user"






let store = new Vuex.Store({
    state:{
       iscollapse:false
    },
    mutations:{
            TOGGLE(state){
      state.iscollapse=!state.iscollapse
            }
    },
    modules:{
        menu,role,user
    }
})

export default store
import $axios from "@/common/http"

export async function getMenu(){
    let res = await $axios.get("/menulist?istree=1 ")
    if(res.code==200&&res.list){
        return res.list
    }else{
        return []
    }
}

export function addMenu(data){
  return $axios.post("/menuadd",data)

}

export function editMenu(data){
  return $axios.post("/menuedit",data)
 
}

export function delMenu(id){
    return $axios.post("/menudelete",{id})
}
<template>
    <div v-if="Loading==true" style="height: 100vh;display: flex;">
        <LoadingVue ></LoadingVue>
    </div>
    <div v-else class="d-flex" style="height: 100vh;">
        <div class="col-2 bg-light  border">
            <MenuBarAdmin/>
        </div>
        <div class="col-10">
            <HeaderAdmin/>
            <h4 class="text-center fw-bold" style="padding-top: 100px;">Quản lý tài khoản người dùng</h4>
            <section class=" " style="padding-top: 10px;width: 100%;">
                <div class="container py-5 h-100 d-flex justify-content-center">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-lg-9 col-xl-7" style="width: 100%;">
                        <div class="card rounded-3">
                        <div class="card-body p-4">

                            
                            <!-- <div class="input-group rounded" style="width: 400px;">
                                <input type="search" class="form-control rounded" placeholder="Vui lòng nhập tên " aria-label="Search" aria-describedby="search-addon"  />
                                <i class="fa-solid fa-magnifying-glass icon-search"></i>
                            </div> -->
                            <table class="table mb-4">
                            <thead>
                                <tr>
                                <th class="text-center"  >Stt</th>
                                <th class="text-center"  >Email</th>
                                <th class="text-center"  >Tên</th>
                                <th class="text-center"  >Trạng thái</th>
                                <th class="text-center"  >Actions</th>
                                <th class="text-center"  >Khoá tài khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(inf, index) in info"  :key="inf">
                                <td class="text-center">{{ index + 1 }}</td>
                                <td class="text-center">{{ inf.email }}</td>
                                <td class="text-center">{{ inf.name }}</td>
                                <td class="text-center" v-if="inf.state==true" >
                                    <div style="display: flex;align-items: center; justify-content: center;">
                                        <div style="width: 7px;height: 7px;background-color: green;border-radius: 50%;"></div>
                                        <div style="padding-left: 6px;">Online</div>
                                    </div>                            
                                </td>
                                <td class="text-center" v-else >
                                    <div  style="display: flex;align-items: center; justify-content: center;">
                                        <div style="width: 7px;height: 7px;background-color: red;border-radius: 50%;"></div>
                                        <div style="padding-left: 6px;">Offline</div>
                                    </div>     
                                </td>
                                <td class="text-center">
                                    <button type="submit" class="btn btn-danger" @click="DeleteUser(inf,inf.id)"><i class="fa-regular fa-trash-can"></i></button>
                                    <button type="submit" class="btn btn-success ms-1"><i class="fa-regular fa-eye"></i></button>
                                    <button type="submit" class="btn btn-warning ms-1"><i class="fa-regular fa-comments"></i></button>
                                </td>
                                <td class="text-center">
                                    <label class="switch" :for="'switch-' + index"  @click="setLockAcc(inf.id , inf.lockAcc1)">
                                      <input :id="'switch-' + index" type="checkbox" v-model="inf.lockAcc1" >
                                      <div class="slider">
                                          <div class="circle">
                                              <svg class="cross" xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 365.696 365.696" y="0" x="0" height="6" width="6" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                  <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"></path>
                                                </g>
                                              </svg>
                                              <svg class="checkmark" xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 24 24" y="0" x="0" height="10" width="10" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                  <path class="" data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                                                </g>
                                              </svg>
                                          </div>
                                        </div>
                                    </label>
                                  </td>
                                </tr>
                            </tbody>
                            </table>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import {ref ,onMounted} from 'vue'
import axios  from 'axios';
import Swal from "sweetalert2";
import HeaderAdmin from '../../components/HeaderAdmin.vue'
import MenuBarAdmin from '../../components/MenuBarAdmin.vue'
import LoadingVue from "../../components/Loading.vue";

const Loading=ref(true)
const info= ref([])
const AdminAcc=ref({id:0,email:"admin@admin.com",username:"admin",name:'admin',password:"admin"})

onMounted( async() => {
    setTimeout(function(){   
        Loading.value=false
    }, 1500);
    try {
        await axios.get("http://localhost:8888/admin/infoUser",{
        }
        ).then(response =>{
            
            for (let i = 0; i < response.data.length; i++) {
                info.value.push(response.data[i])              
            }
            for (let i = 0; i < info.value.length; i++) {
                if(info.value[i].lockAcc==1){
                    info.value[i].lockAcc1=true
                }
                else{
                    info.value[i].lockAcc1=false
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    console.log(info.value);
    
})

const setLockAcc=(id ,p)=>{
    if(p==true){
        ChangeLockAcc(id,p)
        Swal.fire({
            icon: 'success',
            title: 'Mở tài khoản thành công',
            showConfirmButton: false,
            timer: 1000
        })
    } else{
        ChangeLockAcc(id,p)
        Swal.fire({
            icon: 'success',
            title: 'Khóa tài khoản thành công',
            showConfirmButton: false,
            timer: 1000
        })
    }
    

}
const ChangeLockAcc=(id ,p)=>{
    try {
    axios.put(import.meta.env.VITE_UPDATE_LOCK_ACCOUNT_CLIENT,{
        id:id,
        lockAcc:!p
    }).then(response =>
    {
    })
  } catch (error) {
    console.log(error);
  } 
}

const DeleteUser = async (inf,id)=>{

    Swal.fire({
        title: 'Xóa người dùng',
        text: "Bạn có muốn xóa người dùng này không ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tiếp tục!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Xoá người dùng thành công .',
            'success'
            )
            info.value.pop(inf)
            try {axios.delete(import.meta.env.VITE_DELETE_MESAGE,{params:{id:id}})
            } catch (error) {console.log(error);}
            try {
            axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_ID,{params:{id:id}
            }
            ).then(response =>{        
                console.log(response.data);   
                for (let i = 0; i < response.data.length; i++) {
                    try {axios.delete(import.meta.env.VITE_COMMENT_DOCUMENT,{params:{id:response.data[i].id}})
                    } catch (error) {console.log(error);}
                    try {axios.delete(import.meta.env.VITE_DELETE_FINAL_DOCUMENT,{params:{id:response.data[i].id}})
                    } catch (error) {console.log(error);}
                    try {axios.delete(import.meta.env.VITE_DELETE_CONTENT_DOCUMENT,{params:{id:response.data[i].id}})
                    } catch (error) {console.log(error);}         
                    try {axios.delete(import.meta.env.VITE_DELETEUSERINDOCUMENT,{params:{id:response.data[i].id}})
                    } catch (error) {console.log(error);}
                    try {axios.delete(import.meta.env.VITE_DELETEDOCUMENT,{params:{id:response.data[i].id}})
                    } catch (error) {console.log(error);}        
                }
            })
        } catch (error) {console.log(error);}
        try {axios.delete(import.meta.env.VITE_DELETE_USER,{params:{id:id}})
        } catch (error) {console.log(error);}
    }
})



    
}
</script>

<style scoped>
    .icon-search{
        font-size: 26px;
        padding-left: 10px;
        padding-top: 4px;
    }
</style>
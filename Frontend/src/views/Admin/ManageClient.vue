<template>
    <div class="d-flex" style="height: 100vh;">
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
                                <th scope="col">Stt</th>
                                <th scope="col">Email</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(inf, index) in info"  :key="inf">
                                <th>{{ index + 1 }}</th>
                                <td>{{ inf.email }}</td>
                                <td>{{ inf.name }}</td>
                                <td v-if="inf.state==true" scope="row" >
                                    <div style="display: flex;align-items: center;">
                                        <div style="width: 7px;height: 7px;background-color: green;border-radius: 50%;"></div>
                                        <div style="padding-left: 6px;">Online</div>
                                    </div>                            
                                </td>
                                <td v-else scope="row">
                                    <div style="display: flex;align-items: center;">
                                        <div style="width: 7px;height: 7px;background-color: red;border-radius: 50%;"></div>
                                        <div style="padding-left: 6px;">Offline</div>
                                    </div>     
                                </td>
                                <td>
                                    <button type="submit" class="btn btn-danger" @click="DeleteUser(inf,inf.id)"><i class="fa-regular fa-trash-can"></i></button>
                                    <button type="submit" class="btn btn-success ms-1"><i class="fa-regular fa-eye"></i></button>
                                    <button type="submit" class="btn btn-warning ms-1"><i class="fa-regular fa-comments"></i></button>
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

const info= ref([])
const AdminAcc=ref({id:0,email:"admin@admin.com",username:"admin",name:'admin',password:"admin"})

onMounted( async() => {
    try {
        await axios.get("http://localhost:8888/admin/infoUser",{
        }
        ).then(response =>{
            console.log(response.data.length);
            for (let i = 0; i < response.data.length; i++) {
                info.value.push(response.data[i])
            }
            if(response.data.length!=info.value.length){
                location.reload
            }
        })
    } catch (error) {
        console.log(error);
    }
    
})

const DeleteUser = async (inf,id)=>{

    await Swal.fire({
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
            try {
            axios.post(import.meta.env.VITE_DELETE_USER,{
                    id:id,
            })
            } catch (error) {
                console.log(error);
            }
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
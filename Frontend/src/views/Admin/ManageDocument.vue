<template>
    <div v-if="Loading==true" style="height: 100vh;display: flex;">
        <LoadingVue ></LoadingVue>
    </div>
    <div v-else class="d-flex" style="height: 100vh;">
        <div class=" bg-light  border" style="width: 20%;">
            <MenuBarAdmin/>
        </div>
        <div class="col-9">
            <HeaderAdmin/>
            <div class="demo-progress " style="padding-top: 80px;width: 100%;">
                <div class="d-flex justify-content-center mt-4 mb-5">
                    <h2>Quản lý tài liệu</h2>
                </div>
                <div style="width: 100%;">
                    <div class="mt-5">
          <section class="intro">
            <div class="bg-image h-100" >
              <div class="mask d-flex align-items-center h-100" >
                <div class="container">
                  <div class="row justify-content-center">
                    <div class="col-12">
                      <div class="card" style="height: 500px;">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover mb-0" >
                              <thead >
                                <tr >
                                    <th class="text-center">Số thứ tự</th>
                                    <th class="text-center">Tên văn bản</th>
                                    <th class="text-center">Thể loại</th>
                                    <th class="text-center">Chủ sở hữu</th>
                                    <th class="text-center">Mã tài liệu</th>
                                    <th class="text-center">Action</th>
                                    <th class="text-center">Công Khai</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(i, index) in ListDocument">
                                  <td class="text-center">{{ index + 1 }}</td>
                                  <td class="text-center ">{{ i.nameDocument }}</td>
                                  <td class="text-center">{{ i.classify }}</td>
                                  <td class="text-center">Đức An</td>
                                  <td class="text-center" style="cursor: pointer;">
                                    <div class="toggle">
                                      <div class="ellipsis">...</div>
                                      <div class="content">{{ i.password }}</div>
                                    </div>
                                  </td>
                                  <td class="text-center">
                                    <div class="d-flex " style="justify-content: center;">
                                      <!-- <div class="bg-success me-2" @click="OnSearchDocumentbyOwner(i.id,i.nameDocument )" title="Xem văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-eye" style="color: #fff;"></i>
                                      </div> -->
                                      <el-popover placement="top" :width="250" trigger="click">
                                        <template #reference>
                                          <div class="bg-success me-2" @click="OnSearchDocumentbyOwner(i.id )" title="Xem văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                            <i class="fa-solid fa-eye" style="color: #fff;"></i>
                                          </div>
                                        </template>
                                        <div>
                                          <el-table :data="ListVersion" style="display: flex;justify-content: center;">
                                            <el-table-column width="90" property="version1" label="Phiên bản"/>
                                            <el-table-column width="70" label="Xem">
                                              <template #default="{row}">
                                                <i class="fa-solid fa-eye" style="color: #000;" @click="SeeDocumentWithVersion(row.version1,i.id,i.nameDocument)"></i>
                                              </template>
                                            </el-table-column>
                                            <el-table-column width="70" label="Xóa">
                                              <template #default="{row}">
                                                <i class="fa-solid fa-trash-can" style="color: red;" @click="DeleteVersionDocument(row.version1,i.id)"></i>
                                              </template>
                                            </el-table-column>                                      
                                          </el-table>
                                        </div>
                                      </el-popover>
                                      <div class="bg-danger me-2" title="Xóa văn bản"  @click="deleteDocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-trash-arrow-up" style="color: #fff;"></i>
                                      </div>
                                      <el-popover placement="top" :width="300" trigger="click">
                                        <template #reference>
                                          <div class="bg-info me-2" title="Xem thành viên" @click="getUserIndocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                            <i class="fa-solid fa-user" style="color: #fff;"></i>
                                          </div>
                                        </template>
                                        <div>
                                          <el-table :data="ListUserInDocument">
                                            <el-table-column width="80" property="name" label="Name" />
                                            <el-table-column width="150" property="email" label="Email"/>
                                            <el-table-column width="40" property="id" label="" >
                                              <template #default="{row}">
                                                <i class="fa-solid fa-circle-xmark" @click="getIdDeleteUser(row.id)"></i>
                                              </template>
                                            </el-table-column>                                            
                                          </el-table>
                                          <div style="display: flex;justify-content: center;">                                          
                                            <el-popover placement="bottom" :width="300" trigger="click">
                                              <template #reference>
                                                <div class="bg-secondary me-2 mt-2" title="Thêm thành viên"  @click="AddUserDocument()" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">                         
                                              <i class="fa-solid fa-user-plus" style="color: #fff;"></i>
                                            </div>
                                              </template>
                                              <div>
                                                <div style="display: flex;justify-content: center;">Thêm người dùng vào văn bản</div>
                                                <el-table :data="AddUser">
                                                  <el-table-column width="80" property="name" label="Name" />
                                                  <el-table-column width="150" property="email" label="Email"/>
                                                  <el-table-column width="40" property="id" label="" >
                                                    <template #default="{row}">
                                                      <i class="fa-solid fa-circle-plus" @click="AddNewUser(row.id,i.id)"></i>
                                                    </template>
                                                  </el-table-column>
                                                  
                                                </el-table>
                                              </div>
                                            </el-popover>
                                          </div>
                                        </div>
                                      </el-popover>
                                    </div>
                                  </td>
                                  <td class="text-center">
                                    <label class="switch" :for="'switch-' + index"  @click="setPublic(i.id , i.public)">
                                      <input :id="'switch-' + index" type="checkbox" v-model="i.public">
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
                </div>
              </div>
            </div>
          </section>
        </div>
                  
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import HeaderAdmin from '../../components/HeaderAdmin.vue'
import MenuBarAdmin from '../../components/MenuBarAdmin.vue'
import { ref, onMounted } from 'vue'
import LoadingVue from "../../components/Loading.vue";
import axios from 'axios';
import Swal from "sweetalert2";

const infoUser=ref([])
const AddUser=ref([])// thêm user vào văn bản
const ListDocument=ref([])
const Loading=ref(true)
const ListUserInDocument=ref([])
onMounted( async() => {
    setTimeout(function(){   
        Loading.value=false
    }, 1500); 
    getAllDocument()
    await getInfoUser()
})

const getAllDocument=async()=>{
    try {
    await axios.get(import.meta.env.VITE_GET_ALL_DOCUMENT,{
    }).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        ListDocument.value.push(response.data[i])
      }
      for (let i = 0; i < ListDocument.value.length; i++) {
        if(ListDocument.value[i].public==1){
          ListDocument.value[i].public=true
        }
        else{
          ListDocument.value[i].public=false
        }
      }
    })
  } catch (error) {
      console.log(error);
  }
}

const getUserIndocument = async(id)=>{
  console.log(id);
  ListUserInDocument.value=[]
  try {
    await axios.get(import.meta.env.VITE_GETUSERINDOCUMENT_BYID,{
      params:{
        documentId:id
      }
    }).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < infoUser.value.length; j++) {
          if (infoUser.value[j].id==response.data[i].userId) {
            ListUserInDocument.value.push(infoUser.value[j])
          }       
        }
      }
    })
  } catch (error) {
      console.log(error);
  }
}

const getIdDeleteUser=(id)=>{
  Swal.fire({
    title: 'Xóa ',
    text: "Bạn có muốn xóa người dùng này khỏi văn bản không!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        ListUserInDocument.value.forEach(element => {
          if(element.id==id){
            ListUserInDocument.value.pop(element)
          }
        });
        try {axios.delete(import.meta.env.VITE_DELETE_USER_IN_DOCUMENT,{params:{id:id}})
        } catch (error) {console.log(error);} 
        Swal.fire({
          icon: 'success',
          title: 'Xóa thành công',
          showConfirmButton: false,
          timer: 1000})
        window.location.reload();
      }
  })
}

const getInfoUser = async()=>{
  try {await axios.get(import.meta.env.VITE_GETAPI_USER).then(response =>{
      for (let i = 0; i < response.data.length; i++) {
        infoUser.value.push(response.data[i])
      }
    })
  } catch (error) {console.log(error);}
}


const AddUserDocument=()=>{
  AddUser.value = infoUser.value.filter(item => !ListUserInDocument.value.some(obj => obj.id === item.id));
}

const deleteDocument = async(id)=>{
  await Swal.fire({
        title: 'Xóa Tài Liệu',
        text: "Bạn có muốn xóa tài liệu này không ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tiếp tục!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Xoá tài liệu thành công .',
            'success'
            )
            try {axios.delete(import.meta.env.VITE_COMMENT_DOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            try {axios.delete(import.meta.env.VITE_DELETE_FINAL_DOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            try {axios.delete(import.meta.env.VITE_DELETE_CONTENT_DOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}         
            try {axios.delete(import.meta.env.VITE_DELETEUSERINDOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            try {axios.delete(import.meta.env.VITE_DELETEDOCUMENT,{params:{id:id}})
            } catch (error) {console.log(error);}
            window.location.reload();
        }
    })
}

</script>
<template>
  <div v-if="viewDocument==false" style="display: flex;width: 100%;background-color: #F8F8FF;height: 100vh; ">
    <div class="left" style="width: 20%; background-color: slategrey ;">
      <div class="container">
        <div class="top-elements">
          <div style="display: flex;justify-content: center;margin-top: 20px;">
            <img src="../../assets/LogoVienDien_preview_rev_1.png" alt="" style="width: 150px;height: 60px;">
          </div>
          <router-link class="button1" to="/Home/EditDocument"  style="text-decoration: none;z-index: 1;margin-top: 60px;margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-file-word me-3 bg-light " style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;" ></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Word</div>
          </router-link>
          <router-link class="button1" :to="`/Home/NewEdit/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px; display:flex; align-items: center;">    
              <i class="fa-solid fa-book me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
              <div style="font-weight: 700;font-size: 16px;color: #fff;">Document Online</div>   
          </router-link>
          <router-link class="button1" :to="`/Home/EditDocumentUser/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px; display:flex; align-items: center;">
            <i class="fa-solid fa-pen me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Chỉnh Sửa Văn bản</div>
          </router-link>
          <router-link class="button1" :to="`/Home/DocumentApproval/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px; margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-code-merge me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Phê duyệt văn bản</div>
          </router-link>
          <router-link class="button1" :to="`/Home/Community/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-users-line me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div style="font-weight: 700;font-size: 16px;color: #fff;">Cộng đồng</div>
          </router-link>
        </div>
        <div class="bottom-element">
          <div @click="CheckOut" > 
            <div class="line"></div>
            <div  style="display: flex;align-items: center;text-decoration: none ;color: #fff;" >
              <button type="button" class="btn btn-light" @click="LogOut" style="display: flex;align-items: center;">
                <i class="fa-solid fa-circle-arrow-left me-3 ms-3" style="font-size: 30px;"></i>
                <div style="padding-right: 20px;font-weight: 700;">Đăng xuất</div>
              </button>
              
            </div>  
            <div class="line_2"></div>
          </div>
        </div>
    </div>
    </div>
    <div class="right" style="width: 80%;">
      <div class="">
        <nav class="navbar navbar-expand-lg navbar-light " style="background-color: lightgray ;height: 80px; ">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div >
                <img src="../../assets/download_preview_rev_1.png" alt="" style="width: 60px;height: 60px;">
              </div>
              <div class="ms-5" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
                <i class="fa-solid fa-user" style="padding-right: 10px;"></i>
                <div style="font-weight: 700;">{{ name }}</div>
              </div>  
            </div>  
            <div class="d-flex align-items-center">
              <div class="text-reset me-5 " href="#" style="cursor: pointer;" @click="dropdown=!dropdown">
                <i class="fa-regular fa-comments" @click="onConnect()"></i>
                <span class="badge rounded-pill badge-notification bg-danger">1</span>    
              </div>
              <div class="dropdown me-5" style="cursor: pointer; " @click="dropdownRp=!dropdownRp">
                <i class="fas fa-bell"></i>
                <span class="badge rounded-pill badge-notification bg-danger">1</span>    
              </div>       
            </div>
          </div>
        </nav>
      </div>
      <div class="footer">
        <div class="d-flex">
          
          <router-link :to="`/Home/NewEditOneUser/${getid}`"  style="text-decoration: none">
            <div class="btn" style="display: flex;align-items: center;width: 174px;margin-top: 30px; margin-left: 30px;background-color: orange;">
              <i class="fa-solid fa-plus me-2 text-light"></i>
              <div class="fw-bold text-light">Thêm văn bản</div>
            </div>
          </router-link>
          <div class="d-flex">
            <div class="btn btn-danger" @click="checkClickSee=!checkClickSee" style="display: flex;align-items: center;width: 174px;margin-top: 30px; margin-left: 30px;">
              <i class="fa-regular fa-eye me-2"></i>
              <div class="fw-bold">xem văn bản</div>
            </div>
            <form v-if="checkClickSee" @submit.prevent="OnSearchDocument()">
              <input  v-model="passwordDocument" type="text" @submit.prevent="submitCreate()" placeholder="Nhập mã văn bản" style="margin-top: 30px;margin-left: 16px;border-radius: 11px;padding-left: 6px;height: 38px">
              <input type="submit" style="display: none;">
            </form>
          </div>
        </div>
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
                                      <el-popover placement="bottom" :width="350" trigger="click">
                                        <template #reference>
                                          <div class="bg-warning me-2" title="Gửi văn bản"  @click="OnSearchDocumentbyOwner(i.id )" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                            <i class="fa-solid fa-paper-plane" style="color: #fff;"></i>
                                          </div>
                                        </template>
                                        <div>
                                          <div>
                                            <el-tree :data="data" :props="defaultProps" show-checkbox />
                                          </div>
                                          <hr>
                                          <div class="d-flex justify-content-center">
                                            <div class="bg-warning me-2 text-center" plain @click="open1" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                              <i class="fa-solid fa-paper-plane" style="color: #fff;"></i>
                                            </div>
                                          </div>
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
        <div v-if="dropdown==true" class="dropdown-message" >
          <i class="fa-solid fa-circle-xmark icon-close" @click="dropdown=!dropdown"></i>
          <div class="message">Chat </div>
          <div class="input-group1 search-box" >
            <input class="form-control border-end-0 border" type="search" placeholder="search" id="example-search-input" style="border-radius: 18px;">
            <i class="fa fa-search icon-search"></i>
          </div>
          <div class="scroll-snap">
            <!-- danh sách các thành viên trong db -->
            <div v-for="i in users"  @click="chat()">
              <div v-if="i.username==name"></div>
              <div v-else>
                <div @click="onselectedtosend(i)" class="list-message">
                  <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
                  <label for="" style="font-weight: 700;cursor: pointer;" >{{ i.username }}</label>
                </div>
              </div>
            </div>
          </div>          
        </div>
        <div v-if="dropdownRp==true " class="dropdown-message " >
          <i class="fa-solid fa-circle-xmark icon-close" @click="dropdownRp=!dropdownRp"></i>
          <div class="message">Thông báo </div>         
        </div>
        <div v-if="openchat==true " class="message-user" >
          <div style="position: relative; height: 100%;">
            <!-- icon tắt chat -->
            <i class="fa-solid fa-circle-xmark icon-close" @click="openchat=!openchat"></i>
            <!-- hiển thị tên và avatar -->
            <div style="height: 50px;display: flex;align-items: center;padding: 10px;">
              <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
              <label for="" style="font-weight: 700;cursor: pointer;">{{ useridGues }}</label>
            </div>
            <div class="line-1"></div>
            <!-- Hiện tin nhắn  -->
            <div class="scroll-snap" >
              <div v-for="messagee in listMessage" >
                
                  <div class=" you-message"  v-if="messagee.to==1">{{ messagee.message }} </div>
                  <!-- <div class="guest-message" v-if="messagee.to==useridGues"> {{ usernameGues }} :{{ messagee.message }}</div> -->
                  <div class="guest-message" v-else>{{ messagee.message }}</div>               
              </div>
            </div>
            <!-- nhắn tin lên thanh chat -->
            <div class="form-outline send-message">
              <input type="email" id="typeEmail" v-model="message" @keydown.enter="OnSendMessage()" class="form-control " placeholder="input message" style="border-radius: 20px;margin-right: 10px;"/>
              <i class="fa-regular fa-paper-plane" style="padding-top: 10px;cursor: pointer;" @click="OnSendMessage()"></i>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
  <div v-else style="width: 100%;height: 100vh ;" >
    <nav class="navbar navbar-expand-lg navbar-light " style="background-color: #444444;position: fixed;width: 100%">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="navbar-brand mt-2 mt-lg-0" href="#">
            <i class="fa-solid fa-bars" style="color: #fff;"></i>
          </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <div class="text-light">{{ nameDocument }}</div>
            </li>
          </ul>
        </div>
        <div class="d-flex align-items-center">
          <button type="button" class="btn btn-light d-flex me-3" @click="viewDocument=false" style="align-items: center;">
            <div class="me-2">Trang Chủ</div>
            <i class="fa-solid fa-house"></i>
          </button>
          <button type="button" class="btn btn-light d-flex" @click="saveAsPdf" style="align-items: center;">
            <div class="me-2">Tải xuống</div>
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </nav>
    <div class="row" style="display: flex;justify-content: center;height: 100%; ">
      <div style="width: 20%;background-color: #666666;">
        <div class="scrollable-review mt-1" style="border: 1px solid black;width: 19%;height: 50%; top: 30px;background-color: #fff; transform: scale(0.7);position: fixed">
          <div id="content-to-pdf1">
            <div class="mt-1" v-for="item in ListContentDocument" :key="item.id" style="transform: scale(0.5)">
              <h3>{{ item.title }}</h3>
              <div class="ms-4">
                <label class="form-check-label" for="">{{ item.textarea }}</label>
              </div>
            </div>
          </div>  
        </div>
      </div>
      <div  style="width: 80%;height: 1300px; background-color: #DDDDDD; display: flex;justify-content: space-evenly;padding-top: 50px;">
        <div class="scrollable-review mt-5" style="border: 1px solid black;width: 85%;height: 150%; background-color: #fff; ">
          <div id="content-to-pdf">
            <div class="mt-5 ms-5" v-for="item in ListContentDocument" :key="item.id">
              <h3>{{ item.title }}</h3>
              <div class="ms-4">
                <label class="form-check-label" for="">{{ item.textarea }}</label>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
  
</template>
<script setup>
import socket from '../../../plugins/socket'
import { onMounted,ref } from 'vue';
import axios  from 'axios';
import {useRoute ,useRouter} from 'vue-router'
import Swal from "sweetalert2";
import html2pdf from 'html2pdf.js';
import { ElNotification } from 'element-plus'

const open1 = () => {
  ElNotification({
    title: 'Success',
    message: 'Gửi tài liệu thành công',
    type: 'success',
  })
}
const route=useRoute()
const router = useRouter()
const dropdown=ref(false)
const dropdownRp=ref(false)
const openchat=ref(false)
const getid=route.params.id  // id người nhắn
const name=ref('') // tên người nhắn
const usernameGues=ref('') // tên  người nhận
const useridGues=ref('') // id người nhận
const listMessage=ref([]) // danh sách tất cả tin nhắn
const infoUser=ref([])
const message=ref("")
const ListDocument=ref([])
const ListUserInDocument=ref([])
const users=ref([])
const AddUser=ref([])// thêm user vào văn bản
const checkClickSee=ref(false)
const selectUserToSend=ref()
const passwordDocument=ref()
const ListContentDocument=ref([])
const viewDocument=ref(false)
const value = ref(true)
const nameDocument=ref()
const ListVersion =ref([])

const onConnect=()=>{
    socket.auth={
        username:name.value,
    }
    socket.connect()
}

const setPublic=(id ,p)=>{
  try {
    axios.put(import.meta.env.VITE_UPDATE_PUBLIC_DOCUMENT,{
        id:id,
        public:!p
    }).then(response =>
    {
    })
  } catch (error) {
    console.log(error);
  } 
  p=!p
  
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

const AddUserDocument=()=>{
  AddUser.value = infoUser.value.filter(item => !ListUserInDocument.value.some(obj => obj.id === item.id) && item.id != getid);
}

const AddNewUser=(id,documentId)=>{
  Swal.fire({
    title: 'Thêm người dùng  ',
    text: "Bạn có muốn thêm người dùng này vào văn bản không!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Thêm!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {axios.post(import.meta.env.VITE_POSTUSERINDOCUMENT,{documentId:documentId,userId :id,}).then (response => {})
        }catch (error) {console.log(error);}
        Swal.fire({
            icon: 'success',
            title: 'Thêm thành công',
            showConfirmButton: false,
            timer: 1000
        })
        window.location.reload();
      }
  })
}

const OnSendMessage=()=>{
    listMessage.value.push({
        message:message.value,
        to:1,
        from:usernameGues.value
    })
    socket.emit("privateMessaGE",{
        message:message.value,
        to:selectUserToSend.value.userId
    })
    message.value=""
}

const onselectedtosend=(user)=>{
    selectUserToSend.value=user
    usernameGues.value=user.userId
    useridGues.value=user.username
}

onMounted(async()=>{
  await getInfoUser()
  await CheckState()
  await getDocument()
  onConnect()
  socket.on('getUsers',(data)=>{
      data.forEach(user => {
          user.self= user.userId===socket.id
      });
      users.value=data.sort((a,b)=>{
          if(a.self) return -1;
          if(b.self) return 1;
          if(a.username<b.username) return-1
          return a.username>b.username?1:0;
      })
  })
  
  socket.on("userJustConnected",(data)=>{
        users.value.push(data)
    })
    socket.on("privateMessageToReceiver",({message,from})=>{
        listMessage.value.push({
            message:message,
            to:from
        })
    })
})

const saveAsPdf = async () => {
  const content = document.getElementById('content-to-pdf');
  const opt = {
    margin: 1,
    filename: 'your-filename.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(content).save();
};

const chat=()=>{
  
  dropdown.value=!dropdown.value
  openchat.value=!openchat.value
}

// const getMessage = async(id)=>{
//   try {
//     await axios.get('http://localhost:8888/message/messages/user/',{
//       params: {
//         sender: getid, // Kiểm tra giá trị của getid
//         receiver: id // Kiểm tra giá trị của id
//       }
//     }).then(response =>
//     {
//       console.log(response);
//       for (let i = 0; i < response.data.length; i++) {
//         message.value.push(response.data[i].content)
//       }

//     })
//   } catch (error) {
//       console.log(error);
//   }
// }

const getInfoUser = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETAPI_USER).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].id==getid){
          name.value=response.data[i].name
        }
      }
      for (let i = 0; i < response.data.length; i++) {
        infoUser.value.push(response.data[i])
        if (response.data[i].name!=name.value) {
          users.value.push(response.data[i].name)
        }
      }
    })
  } catch (error) {
      console.log(error);
  }
}
const getDocument = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETDOCUMENT_BYID,{
      params:{
        idDocumentOwner:getid
      }
    }).then(response =>
    {
      console.log(response.data);
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
      console.log(ListDocument.value);
    })
  } catch (error) {
      console.log(error);
  }
}
const getUserIndocument = async(id)=>{
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

const CheckState = async()=>{
  try {await axios.post('http://localhost:8888/users/state',{id:localStorage.getItem('iduser')}).then(response =>{})} 
  catch (error) {console.log("error");}
}

const CheckOut = async()=>{
  try {await axios.post('http://localhost:8888/users/stateout',{id:getid}).then(response =>{})} 
  catch (error) {console.log("error");}
}

const OnSearchDocument= async()=>{
  ListContentDocument.value=[]
  var password=passwordDocument.value
  var version =""
  var id =" "
  try {await axios.get(import.meta.env.VITE_GET_ID_DOCUMENT_BY_PASSWORD,{
    params:{password:password}
    }).then(response =>{id= response.data[0].id})
  } catch (error) {console.log(error);} 

  try {await axios.get(import.meta.env.VITE_GET_VERSION,{
    params:{documentid:id,}
    }).then(response =>{version= response.data[response.data.length-1].version1})
  } catch (error) {console.log(error);} 
  console.log(version);

  try {await axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_PASSWORD,{    
    params:{password: password,version1: version}
    }).then(response =>{   
      for (let i = 0; i < response.data.length; i++) {
        ListContentDocument.value.push(response.data[i])
      }
    })
  } catch (error) {console.log(error)}
  viewDocument.value=true
  passwordDocument.value=""
  checkClickSee.value=!checkClickSee.value
}


const OnSearchDocumentbyOwner= async(id,name)=>{
  ListContentDocument.value=[]
  ListVersion.value=[]
  var version =""
  try {
    await axios.get(import.meta.env.VITE_GET_VERSION,{
    params:{
      documentid:id,
    }
    }).then(response =>
    {
      version= response.data[response.data.length-1].version1
      for (let i = 1; i < version+1; i++) {
        ListVersion.value.push({version1:i})
      }
    })
  } catch (error) {
      console.log(error);
  } 
}

const SeeDocumentWithVersion=async(version,id,name)=>{
    try {
      await axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_DOCUMENTOWNER,{
      params:{
        id:id,
        version1: version,
      }
      }).then(response =>
      {
        for (let i = 0; i < response.data.length; i++) {
          ListContentDocument.value.push(response.data[i])
        }
      })
    } catch (error) {
        console.log(error);
    }
    nameDocument.value=name
    viewDocument.value=true
}

const DeleteVersionDocument=()=>{
  Swal.fire({
        title: 'Xóa Phiên bản',
        text: "Bạn có muốn xóa phiên bản này khỏi hệ thống văn bản không ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tiếp tục!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Xoá phiên bản thành công .',
            'success'
            )
        }
    })

}

const LogOut =()=>{
  Swal.fire({
  title: 'Đăng xuất?',
  text: "Bạn có muốn đăng xuất không!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Đăng xuất!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
          icon: 'success',
          title: 'Đăng xuất thành công',
          showConfirmButton: false,
          timer: 1000
      })
      setTimeout(function(){   
        router.push("/")
      }, 1000);
    }
  })
}

const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled',
}

const data = [
  {
    id: 1,
    label: 'Đại học Bách Khoa Hà Nội',
    children: [
      {
        id: 3,
        label: 'Trường Điện , Điện Tử',
        children: [
          {
            id: 4,
            label: 'Khoa Điện Tử Viễn Thông',
          },
          {
            id: 5,
            label: 'Khoa Tự Động Hóa',
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        label: 'Trường Công Nghệ Thông Tin và Truyền Thông',
        disabled: true,
        children: [
          {
            id: 6,
            label: 'Khoa Trí Tuệ Nhân Tạo',
          },
          {
            id: 7,
            label: 'Khoa Toán Tin',
            disabled: true,
          },
        ],
      },
    ],
  },
]
</script>

<style >
.el-table .cell {
  text-align: center;
}
.el-popper.is-light {
    background-color: lavender;
    border: 1px solid var(--el-border-color-light);
}
.el-popover.el-popper {
  margin-top: 20px;
}
.button1 {
  position: relative;
  background-color: #9E9E9E;
  -webkit-border-radius: 10px;
  border: none;
  border-radius: 10px;
  -webkit-box-shadow: 0px 8px 0px #878787, 0px 8px 20px #000000;
  box-shadow: 0px 8px 0px #878787, 0px 8px 20px #000000;
  color: #FFFFFF;
  display: inline-block;
  font-size: 34px;
  padding: 2px 10px;
  text-align: center;
  cursor:pointer;
  text-decoration: none;
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}
.button1:active {
  -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
  box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
  top: 7px;
}
.button1:hover {
  background: darkgray;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; 
}
.top-elements {
  justify-content: flex-start;
}

.bottom-element {
  width: 100%;
  padding-bottom: 10px;
  align-self: flex-end;
}
#toggle {
  display: none;
}

#toggle:checked ~ .content {
  display: block;
}

#toggle:checked ~ label {
  display: none;
}

.content {
  display: none;
}
  .intro {
  height: 100%;
}

table td,
table th {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card {
  border-radius: .5rem;
}
.input-group1 {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 92%;
}
.footer{
  position: relative;
}
.dropdown-message{
  top: 4px;
  right: 10px;
  position: absolute;
  width: 280px;
  height: 370px;
  background-color: #fff;
  border-radius: 20px;
  z-index: 2;
  border: 1px solid #C0C0C0;
}
.search-box{
  position: relative;
  border-radius: 18px;
  border: 1px solid #C0C0C0;
  margin-left: 10px;
}
.icon-search{
  position: absolute;
  right: 10px;
  top: 11px;
}
.message{
  padding: 10px;
  font-weight: 700;
  font-size: 21px;
}
.list-message{
  padding-left: 10px; 
  padding-top: 16px; 
  display: flex; 
  align-items: center;
  scroll-snap-align: start;
}
.icon-users{
  font-size: 36px; 
  color: #CCCCCC;
  padding-right: 10px;
}
.log-out{
  position: absolute; 
  bottom: 12px; 
  left: 178px;
}
.line{
  width: 100%;
  height: 2px;
  background-color: #fff;
  margin-bottom: 10px;
}
.line_2{
  width: 100%;
  height: 2px;
  background-color: #fff;
  margin-top: 10px;
}
.line-1{
  width: 100%;
  height: 2px;
  background-color: #CCCCCC;
}
.message-user{
  top: 4px;
  right: 10px;
  position: absolute;
  width: 280px;
  height: 370px;
  background-color: #fff;
  border-radius: 20px;
  z-index: 2;
  border: 1px solid #C0C0C0;
}
.icon-close{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
}
.guest-message{
  padding: 10px;
  background-color: #EEEEEE; 
  width: 70%;
  border-radius: 20px;
  color: #000; 
  font-weight: 700; 
  margin: 10px;
  scroll-snap-align: start;
}
.you-message{
  padding: 10px;
  background-color: #0066FF; 
  width: 70%;
  border-radius: 20px;
  color: #fff; 
  font-weight: 700;
  margin-top: 10px; 
  margin-left: 72px;
  scroll-snap-align: start;
}
.send-message{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  display: flex;
}
.scroll-snap{
  width: 100%;
  height: 68%;
  display: flex;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  flex-direction: column;
}


.switch {
  /* switch */
  --switch-width: 46px;
  --switch-height: 24px;
  --switch-bg: rgb(131, 131, 131);
  --switch-checked-bg: rgb(0, 218, 80);
  --switch-offset: calc((var(--switch-height) - var(--circle-diameter)) / 2);
  --switch-transition: all .2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
  /* circle */
  --circle-diameter: 18px;
  --circle-bg: #fff;
  --circle-shadow: 1px 1px 2px rgba(146, 146, 146, 0.45);
  --circle-checked-shadow: -1px 1px 2px rgba(163, 163, 163, 0.45);
  --circle-transition: var(--switch-transition);
  /* icon */
  --icon-transition: all .2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
  --icon-cross-color: var(--switch-bg);
  --icon-cross-size: 6px;
  --icon-checkmark-color: var(--switch-checked-bg);
  --icon-checkmark-size: 10px;
  /* effect line */
  --effect-width: calc(var(--circle-diameter) / 2);
  --effect-height: calc(var(--effect-width) / 2 - 1px);
  --effect-bg: var(--circle-bg);
  --effect-border-radius: 1px;
  --effect-transition: all .2s ease-in-out;
}

.switch input {
  display: none;
}

.switch {
  display: inline-block;
}

.switch svg {
  -webkit-transition: var(--icon-transition);
  -o-transition: var(--icon-transition);
  transition: var(--icon-transition);
  position: absolute;
  height: auto;
}

.switch .checkmark {
  width: var(--icon-checkmark-size);
  color: var(--icon-checkmark-color);
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.switch .cross {
  width: var(--icon-cross-size);
  color: var(--icon-cross-color);
}

.slider {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: var(--switch-width);
  height: var(--switch-height);
  background: var(--switch-bg);
  border-radius: 999px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  -webkit-transition: var(--switch-transition);
  -o-transition: var(--switch-transition);
  transition: var(--switch-transition);
  cursor: pointer;
}

.circle {
  width: var(--circle-diameter);
  height: var(--circle-diameter);
  background: var(--circle-bg);
  border-radius: inherit;
  -webkit-box-shadow: var(--circle-shadow);
  box-shadow: var(--circle-shadow);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: var(--circle-transition);
  -o-transition: var(--circle-transition);
  transition: var(--circle-transition);
  z-index: 1;
  position: absolute;
  left: var(--switch-offset);
}

.slider::before {
  content: "";
  position: absolute;
  width: var(--effect-width);
  height: var(--effect-height);
  left: calc(var(--switch-offset) + (var(--effect-width) / 2));
  background: var(--effect-bg);
  border-radius: var(--effect-border-radius);
  -webkit-transition: var(--effect-transition);
  -o-transition: var(--effect-transition);
  transition: var(--effect-transition);
}

/* actions */

.switch input:checked+.slider {
  background: var(--switch-checked-bg);
}

.switch input:checked+.slider .checkmark {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
}

.switch input:checked+.slider .cross {
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.switch input:checked+.slider::before {
  left: calc(100% - var(--effect-width) - (var(--effect-width) / 2) - var(--switch-offset));
}

.switch input:checked+.slider .circle {
  left: calc(100% - var(--circle-diameter) - var(--switch-offset));
  -webkit-box-shadow: var(--circle-checked-shadow);
  box-shadow: var(--circle-checked-shadow);
}
.toggle .content {
  display: none;
}

.toggle:hover .content {
  display: block;
}
.toggle:hover .ellipsis {
  display: none;
}
</style>

<template>
  <div v-if="viewDocument==false" style="display: flex;width: 100%;background-color: #F8F8FF;height: 100vh; ">
    <div class="left" style="width: 20%; background-color: slategrey ;">
      <div class="container">
        <div class="top-elements">
          <div style="display: flex;justify-content: center;margin-top: 20px;">
            <img src="../../assets/LogoVienDien_preview_rev_1.png" alt="" style="width: 150px;height: 60px;">
          </div>
          <router-link class="button" to="/Home/EditDocument"  style="text-decoration: none;z-index: 1;margin-top: 60px;margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-file-word me-3 bg-light " style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;" ></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Word</div>
          </router-link>
          <router-link class="button" :to="`/Home/NewEdit/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px; display:flex; align-items: center;">    
              <i class="fa-solid fa-book me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
              <div style="font-weight: 700;font-size: 16px;color: #fff;">Document Online</div>   
          </router-link>
          <router-link class="button" :to="`/Home/EditDocumentUser/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px; display:flex; align-items: center;">
            <i class="fa-solid fa-pen me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Chỉnh Sửa Văn bản</div>
          </router-link>
          <router-link class="button" :to="`/Home/DocumentApproval/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px; margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-code-merge me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div  style="font-weight: 700;font-size: 16px;color: #fff;">Phê duyệt văn bản</div>
          </router-link>
          <router-link class="button" :to="`/Home/Community/${getid}`"  style="text-decoration: none;z-index: 1;margin-top: 50px;margin-left: 20px;display:flex; align-items: center;">
            <i class="fa-solid fa-users-line me-3 bg-light" style="color: black;width: 30px;height: 30px;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 20px;"></i>
            <div style="font-weight: 700;font-size: 16px;color: #fff;">Cộng đồng</div>
          </router-link>
        </div>
        <div class="bottom-element">
          <div @click="CheckOut" > 
            <div class="line"></div>
            <router-link to="/"  style="display: flex;align-items: center;text-decoration: none ;color: #fff;" >
              <i class="fa-solid fa-circle-arrow-left me-3 ms-3" style="font-size: 30px;"></i>
              <div style="padding-right: 20px;font-weight: 700;">Đăng xuất</div>
            </router-link>  
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
              <i class="fa-solid fa-plus me-2"></i>
              <div>Thêm văn bản</div>
            </div>
          </router-link>
          <div class="d-flex">
            <div class="btn btn-danger" @click="checkClickSee=!checkClickSee" style="display: flex;align-items: center;width: 174px;margin-top: 30px; margin-left: 30px;">

              <i class="fa-regular fa-eye me-2"></i>
              <div>xem văn bản</div>
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
                            <table class="table table-hover mb-0">
                              <thead>
                                <tr>
                                    <th class="text-center">Số thứ tự</th>
                                    <th class="text-center">Tên văn bản</th>
                                    <th class="text-center">Mã tài liệu</th>
                                    <th class="text-center">Action</th>
                                    <th class="text-center">Công Khai</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(i, index) in ListDocument">
                                  <td class="text-center">{{ index + 1 }}</td>
                                  <td class="text-center">{{ i.nameDocument }}</td>
                                  <td class="text-center" style="cursor: pointer;">
                                    <input type="checkbox" id="toggle">
                                    <label for="toggle" >...</label>
                                    <div class="content">{{ i.password }}</div>
                                  </td>
                                  <td class="text-center">
                                    <div class="d-flex " style="justify-content: center;">
                                      <div class="bg-success me-2" @click="OnSearchDocumentbyOwner(i.id)" title="Xem văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-eye" style="color: #fff;"></i>
                                      </div>
                                      <div class="bg-warning me-2" title="Gửi văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-paper-plane" style="color: #fff;"></i>
                                      </div>
                                      <div class="bg-danger me-2" title="Xóa văn bản"  @click="deleteDocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-trash-arrow-up" style="color: #fff;"></i>
                                      </div>
                                      <el-popover placement="right" :width="400" trigger="click">
                                        <template #reference>
                                          <div class="bg-info me-2" title="Thêm thành viên" @click="getUserIndocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                        <i class="fa-solid fa-user" style="color: #fff;"></i>
                                      </div>
                                      </template>
                                        <el-table :data="ListUserInDocument">
                                          <el-table-column width="100" property="name" label="Name" />
                                          <el-table-column width="300" property="email" label="Email" />
                                        </el-table>
                                      </el-popover>
                                    </div>
                                  </td>
                                  <td class="text-center">{{ i.public }}
                                    <el-switch v-model="i.public " class="ml-2" @change="setPublic(i.id , i.public)"/>
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
  <div v-else>
    <button @click="saveAsPdf">Lưu thành PDF</button>
    <div class="col" style="border: 1px solid black;width: 50%;height: 100%;border-top-right-radius: 20px;border-bottom-right-radius: 20px;">
      <div style="width: 100%;max-height: 20%;display: flex;justify-content: center;margin-top: 20px;">
        <div for="">Bản xem trước</div>
      </div>
      <div class="scrollable-review">
        
        <div id="content-to-pdf">
          <div class="mt-5" v-for="item in ListContentDocument" :key="item.id">
            <h3>{{ item.title }}</h3>
            <div class="ms-4">
              <label class="form-check-label" for="">{{ item.textarea }}</label>
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
import {useRoute} from 'vue-router'
import Swal from "sweetalert2";
import html2pdf from 'html2pdf.js';

const route=useRoute()
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
const checkClickSee=ref(false)
const selectUserToSend=ref()
const passwordDocument=ref()
const ListContentDocument=ref([])
const viewDocument=ref(false)
const value = ref(true)

const onConnect=()=>{
    socket.auth={
        username:name.value,
    }
    socket.connect()
}

const setPublic=(id ,p)=>{
  console.log(value.value);
  try {
    axios.put(import.meta.env.VITE_UPDATE_PUBLIC_DOCUMENT,{
        id:id,
        public:!p
    }).then(response =>
    {
        console.log(response);
    })
  } catch (error) {
    console.log(error);
  } 
  p=!p
  
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
    console.log(usernameGues.value);
}

onMounted(async()=>{
  await getInfoUser()
  await CheckState()
  await getDocument()
  console.log(users.value);
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
      console.log(users.value);
  })
  
  socket.on("userJustConnected",(data)=>{
        users.value.push(data)
        console.log("user Just Connected",users.value);
    })
    socket.on("privateMessageToReceiver",({message,from})=>{
        console.log("tesst ",from,":",message);
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
      for (let i = 0; i < response.data.length; i++) {
        ListDocument.value.push(response.data[i])
        console.log("ListDocument",response.data[i]);
      }
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
      console.log(ListUserInDocument.value);
    })
  } catch (error) {
      console.log(error);
  }
}

const deleteDocument = async(id)=>{
  // console.log(id,ListDocument.value);
  // ListDocument.value.splice(id-1, 1);
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
            try {
               axios.delete(import.meta.env.VITE_DELETE_CONTENT_DOCUMENT,{
                params:{
                  id:id
                }
              })
            } catch (error) {
              console.log(error);
            }
            
            try {
               axios.delete(import.meta.env.VITE_DELETEUSERINDOCUMENT,{
                params:{
                  id:id
                }
              })
            } catch (error) {
              console.log(error);
            }

            try {
               axios.delete(import.meta.env.VITE_DELETEDOCUMENT,{
                params:{
                  id:id
                }
              })
            } catch (error) {
              console.log(error);
            }

            window.location.reload();

        }
    })


  
}

const CheckState = async()=>{
  try {
    await axios.post('http://localhost:8888/users/state',{
        id:localStorage.getItem('iduser')
    }
    ).then(response =>{
    })
  } 
  catch (error) {
    console.log("error");
  }
}
const CheckOut = async()=>{
  try {
    await axios.post('http://localhost:8888/users/stateout',{
        id:getid
    }
    ).then(response =>{
    })
  } 
  catch (error) {
    console.log("error");
  }
}


const OnSearchDocument= async()=>{
  ListContentDocument.value=[]
  console.log(passwordDocument.value);
  var password=passwordDocument.value
  try {
    await axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_PASSWORD,{
    params:{
      password: password
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
  viewDocument.value=true
  console.log(ListContentDocument.value);
}

const OnSearchDocumentbyOwner= async(id)=>{
  ListContentDocument.value=[]
  console.log(passwordDocument.value);
  try {
    await axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_DOCUMENTOWNER,{
    params:{
      idDocumentOwner: getid,
      id:id
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
  viewDocument.value=true
  console.log(ListContentDocument.value);
}
</script>

<style >
.button {
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
 
.button:active {
  -webkit-box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
  box-shadow: 0px 2px 0px #878787, 0px 2px 8px #000000;
  top: 7px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Đảm bảo chiều cao của container đủ để chứa các phần tử con */
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
</style>

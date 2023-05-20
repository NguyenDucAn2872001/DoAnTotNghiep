<template>
  <div style="display: flex;width: 100%;background-color: #F8F8FF;">
    <div class="right" style="width: 80%;">
      <div class="">
        <nav class="navbar navbar-expand-lg navbar-light " style="background-color: #C6E2FF ;">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <a class="navbar-brand mt-2 mt-lg-0 me-5" href="#">
                <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="15" alt="MDB Logo" loading="lazy"/>
              </a>
              <div style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
                <i class="fa-solid fa-user" style="padding-right: 10px;"></i>
                <div style="font-weight: 700;">{{ name }}</div>
              </div>  
            </div>  
            <div class="d-flex align-items-center">
              <div class="text-reset me-5 " href="#" style="cursor: pointer;" @click="dropdown=!dropdown">
                <i class="fa-regular fa-comments"></i>
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
        <div class="btn btn-success" style="display: flex;align-items: center;width: 150px;margin-top: 30px; margin-left: 30px;">
          <!-- <input type="file" class="form-control"> -->
          <i class="fa-solid fa-plus me-2"></i>
          <div>Thêm văn bản</div>
        </div>
        
        
        <div v-if="dropdown==true" class="dropdown-message" >
          <i class="fa-solid fa-circle-xmark icon-close" @click="dropdown=!dropdown"></i>
          <div class="message">Chat </div>
          <div class="input-group search-box" >
            <input class="form-control border-end-0 border" type="search" placeholder="search" id="example-search-input" style="border-radius: 18px;">
            <i class="fa fa-search icon-search"></i>
          </div>
          <div class="scroll-snap">
            <div v-for="i in infoUser"  @click="chat()">
              <div @click="GetIdUserOnclick(i.id,i.name)" class="list-message">
                <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
                <label for="" style="font-weight: 700;cursor: pointer;" >{{ i.name }}</label>
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
            <i class="fa-solid fa-circle-xmark icon-close" @click="openchat=!openchat"></i>
            <div style="height: 50px;display: flex;align-items: center;padding: 10px;">
              <i class="fa-solid fa-circle-user icon-users" style="cursor: pointer;"></i>
              <label for="" style="font-weight: 700;cursor: pointer;">{{ nameOnclick }}</label>
            </div>
            <div class="line-1"></div>
            <div class="scroll-snap" >
              <div class="guest-message"  >Hello </div>
              <!-- <div class="guest-message" >how are you doing </div> -->
              <div class="you-message" v-for="mes in message">{{ mes }}</div>

            </div>
            
            <div class="form-outline send-message">
              <input type="email" id="typeEmail" v-model="newmessage" @keydown.enter="sendmessage()" class="form-control " placeholder="input message" style="border-radius: 20px;margin-right: 10px;"/>
              <i class="fa-regular fa-paper-plane" style="padding-top: 10px;cursor: pointer;" @click="sendmessage()"></i>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div class="left" style="width: 20%; background-color: #B9D3EE ;height: 739px; position: relative;">
      <router-link to="/Home/EditDocument"  style="text-decoration: none;z-index: 1;margin-top: 50px; position: absolute;margin-left: 20px;">
            <div class="text-black " style="font-weight: 700;font-size: 16px;color: black;">Chỉnh sửa văn bản</div>
      </router-link>
      <div class="line"></div>
      <div @click="CheckOut" class="log-out" > 
        <router-link to="/"  style="display: flex;align-items: center;text-decoration: none ;color: black;" >
          <div style="padding-right: 20px;font-weight: 700;">Log out</div>
          <i class="fa-solid fa-right-from-bracket"></i>
        </router-link>  
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
import axios  from 'axios';
import {useRoute} from 'vue-router'

const route=useRoute()
const dropdown=ref(false)
const dropdownRp=ref(false)
const openchat=ref(false)
const getid=route.params.id
const name=ref('')
const nameOnclick=ref('')
const infoUser=ref([])
const message=ref([])
const newmessage=ref('')

onMounted(()=>{
  getInfoUser()
  CheckState()
})

const sendmessage=()=>{
  message.value.push(newmessage.value)
  newmessage.value=''
}
const GetIdUserOnclick=(id,name)=>{
  // console.log(getid);
  // console.log(id);
  nameOnclick.value=name
  getMessage(id)
}
const chat=()=>{
  dropdown.value=!dropdown.value
  openchat.value=!openchat.value
  //console.log("aaa");
  
}

const getMessage = async(id)=>{
  try {
    await axios.get('http://localhost:8888/message/messages/user/',{
      params: {
        sender: getid, // Kiểm tra giá trị của getid
        receiver: id // Kiểm tra giá trị của id
      }
    }).then(response =>
    {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        message.value.push(response.data[i].content)
      }

    })
  } catch (error) {
      console.log(error);
  }
}

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
      }
    })
  } catch (error) {
      console.log(error);
  }
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
</script>

<style >

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
    width: 238px;
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
    position: absolute; 
    bottom: 50px; 
    width: 100%;
    height: 2px;
    background-color: #fff;
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

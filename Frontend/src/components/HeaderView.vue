<template>
  <!-- <div class="" style="position: fixed;width: 100%">
    <nav class="navbar navbar-expand-lg navbar-light " id="my-element" >

      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div >
            <img src="../assets/download_preview_rev_1.png" alt="" style="width: 60px;height: 60px;">
          </div>
          <div class="ms-5" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">      
            <div style="font-weight: 700;">{{ nameInput }}</div>
          </div>  
        </div>  
        <div class="d-flex  col" style="justify-content: flex-end;align-items: center;">
              <div class="text-reset me-3 button" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
                <i class="fa-solid fa-user bell text-light me-1" style="font-size: 24px;"></i>        
              </div>  
              <div class="button me-3" href="#" style="cursor: pointer;" @click="dropdown=!dropdown">
                <i class="fa-brands fa-facebook-messenger text-light bell me-1" style="font-size: 24px;"></i>
              </div>
              <button class="button" @click="dropdownRp=!dropdownRp">
                <svg viewBox="0 0 448 512" class="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
              </button>
            </div>
      </div>
    </nav>
  </div> -->
  <div class="" style="width: 100%;position: fixed">
        <nav class="navbar navbar-expand-lg navbar-light " id="my-element" style="width: 100%;">
          <div class="row " style="width: 100%;">

            <div class="d-flex col" id="navbarSupportedContent" style="align-items: center;">
              <router-link :to="`/Home/${data}`" style="z-index: 2;">
                <div class="text-reset me-5 ">
                  <i class="fa-solid fa-house text-dark" style="font-size: 25px; padding-left: 20px;"></i>
                </div>
            </router-link>
              <div style="font-weight: 700;font-family: system-ui;font-size: 20px;">{{ nameInput }}</div>
            </div> 

            <div class="col" style="display: flex;justify-content: center;margin-top: 20px;">
              <img src="https://ctt.hust.edu.vn/Images/logo.png" alt="" style="width: 350px;height: 60px;margin-bottom: 18px;">
            </div> 

            <div class="d-flex  col" style="justify-content: flex-end;align-items: center;">
              <div class="text-reset me-3 button" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
                <i class="fa-solid fa-user bell text-light me-1" style="font-size: 24px;"></i>        
              </div>  
              <div class="button me-3" href="#" style="cursor: pointer;" >
                <i class="fa-brands fa-facebook-messenger text-light bell me-1" style="font-size: 24px;"></i>
                <!-- <span class="badge rounded-pill badge-notification bg-danger">1</span>     -->
              </div>
              <button class="button">
                <svg viewBox="0 0 448 512" class="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
              </button>
            </div>

          </div>
        </nav>
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios  from 'axios';


const props = defineProps(['data']);
const data = ref('');
const nameInput = ref("");

onMounted( async() => {
  
  data.value = props.data;
  await getInfoUser()
});
const getInfoUser = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETAPI_USER).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].id==data.value){
            nameInput.value=response.data[i].name
        }
      }
    })
  } catch (error) {
      console.log(error);
  }
}
</script>

<style >
#my-element {
  background-image: url("../assets/header.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 80px;
}
</style>

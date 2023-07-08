<template>
  <div class="" style="position: fixed;width: 100%">
    <nav class="navbar navbar-expand-lg navbar-light " style="background-color: lightgray ;height: 80px; ">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div >
            <img src="../assets/download_preview_rev_1.png" alt="" style="width: 60px;height: 60px;">
          </div>
          <div class="ms-5" style="display: flex;align-items: center;text-decoration: none ;cursor: pointer;">
            <div class="bg-dark me-2" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: flex-end;border-radius: 50%;">
                <i class="fa-solid fa-user text-light" style="padding-right: 10px;"></i>
            </div>
            
            <div style="font-weight: 700;">{{ nameInput }}</div>
          </div>  
        </div>  
        <div class="d-flex align-items-center">
          <div class="text-reset me-5 " href="#" style="cursor: pointer;" >
            <i class="fa-regular fa-comments" ></i>
            <span class="badge rounded-pill badge-notification bg-danger">1</span>    
          </div>
          <div class="dropdown me-5" style="cursor: pointer; " >
            <i class="fas fa-bell"></i>
            <span class="badge rounded-pill badge-notification bg-danger">1</span>    
          </div>       
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

</style>

<template>
    <div >
        <section class="vh-100 bg-image"
            style="background-image: url('https://hainh2k3.com/wp-content/uploads/2018/11/CSS-Particles.gif');">
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" style="border-radius: 15px;position: relative;">

                        <router-link :to="`/Home/NewEdit/${getid}`" style="position: absolute; top:20px; right: 20px;font-size: 30px;cursor: pointer;color: black;" >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </router-link>
                        <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-5"></h2>

                        <form  @submit.prevent="CreateDocument()" >
                            
                            <div class="form-outline mb-2">
                                <label class="form-label" for="form3Example1cg">Tên Tài Liệu</label>
                                <input type="text" v-model="info.NameDocument" id="form3Example1cg" class="form-control form-control-lg" />
                            </div>

                            <div class="form-outline mb-2" style="display: grid;">
                                <label class="form-label" for="form3Example3cg">Loại tài liệu </label>
                                <el-select v-model="info.Classify" filterable placeholder="Select" >
                                    <el-option v-for="item in ListClassifyDocument" :key="item.id" :label="item.name" :value="item.name"/>     
                                </el-select>
                            </div>

                            <div class="form-outline mb-2" style="display: grid;">
                                <label class="form-label" for="form3Example3cg">Người Chỉnh Sửa Văn Bản</label>
                                <el-select-v2 v-model="info.ListUserInDocument" filterable :options="infoUser.map(name => ({ value: name.id, label: name.name }))" placeholder=" "  multiple />
                            </div>

                            <div class="d-flex justify-content-center">
                                <input type="submit" class="btn btn-danger btn-block btn-lg gradient-custom-4 text-light" style="width: 40%;" value="Tạo Tài Liệu">
                            </div>
                        </form>

                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import {ref ,onMounted} from 'vue'
import axios from 'axios';
import {useRoute} from 'vue-router'

const route=useRoute()
const getid=route.params.id 
const info = ref({
    ListUserInDocument :[],
    Classify:"",
    NameDocument : "",
})
const IdDocument=ref()
const infoUser =ref([])
const ListClassifyDocument=ref([])

onMounted(async()=>{
    await getClassifyDocument()
    await getInfoUser()
});

const CreateDocument=async()=>{
  console.log(info.value);
  try {await axios.post(import.meta.env.VITE_POST_CONTENT_DOCUMENT_REAL_TIME,{
    content:"",
    classify:info.value.Classify,  
    idDocumentOwner:parseInt(getid),     
    nameDocument:info.value.NameDocument 
  }).then (response => {})
  }catch (error) {console.log(error);}

  await getIdDocumentRealTime()

  for (let i = 0; i < info.value.ListUserInDocument.length; i++) {
    try {await axios.post(import.meta.env.VITE_POST_USER_IN_DOCUMENT_REAL_TIME,{
        documentId:IdDocument.value,
        userId:info.value.ListUserInDocument[i],  

    }).then (response => {})
    }catch (error) {console.log(error);}
    
  }
  try {await axios.post(import.meta.env.VITE_POST_USER_IN_DOCUMENT_REAL_TIME,{
        documentId:IdDocument.value,
        userId:parseInt(getid),  

    }).then (response => {})
    }catch (error) {console.log(error);}
  IdDocument.value=null
//   CloseForm.value=false
}

const getClassifyDocument = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GET_CLASSIFY_DOCUMENT).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        ListClassifyDocument.value.push(response.data[i])
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
            if (response.data[i].id!=getid) {
                infoUser.value.push(response.data[i])                
            }
        }
    })
  } catch (error) {
      console.log(error);
  }
}

const getIdDocumentRealTime = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GET_ID_DOCUMENT_REAL_TIME,{params: {id: parseInt(getid) }}).then(response =>
    {
        for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].nameDocument==info.value.NameDocument){
            IdDocument.value=response.data[i].id
        }
      }
        
    })
  } catch (error) {
      console.log(error);
  }
}
</script>
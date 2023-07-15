<template>
    <HeaderView :data="getid" style="z-index: 1;"/>
    <div  style="width: 100%;padding-top: 80px;" >
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
            <router-link :to="`/Home/Community/${getid}`" style="z-index: 2;text-decoration: none;">
                <button type="button" class="btn btn-light d-flex me-3" @click="viewDocument=false" style="align-items: center;">
                    <i class="fa-solid fa-backward"></i>
                    <div class="ms-2">Trang Trước</div>
                </button>
            </router-link>
            <button type="button" class="btn btn-light d-flex" @click="saveAsPdf" style="align-items: center;">
                <div class="me-2">Tải xuống</div>
                <i class="fa-solid fa-download"></i>
            </button>
        </div>
      </div>
    </nav>
    <div class="row" style="display: flex;justify-content: center;height: 100%;width: 101%; ">
      <div style="width: 20%;background-color: #666666; padding-top: 80px;">
        <div class="text-center mb-3">
          <div class="text-light fw-bold">Bình Luận </div>
        </div>
        <div style="display: flex;justify-content: center;">
          <div style="width: 90%;height: 500px; border: 1px solid #000;border-radius: 10px;background-color: #fff;margin-left: 10px;position: relative;">
            <div class="parent" style="height: 444px;width: 100%;; border-bottom: 1px solid #666666;">
              <div class="child">

                <div class="mt-3" style="display: flex;" v-for="i in CommentPassword">
                  <div class="ms-2 me-2 " style="width:30px;height:30px;border-radius:50%; display:flex;justify-content:center;align-items:center;background-color:#777777">
                    <i class="fa-solid fa-user-secret text-light" style="font-size:22px;"></i>
                  </div>
                  <div class="pt-1" style="width:75%;height:auto; background-color:#DDDDDD;border-radius:10px">
                    <div class="ms-3 fw-bold"> {{ i.name }}</div>
                    <div class="ms-3 mt-1 pb-2" style="width:80%">{{ i.comments }}</div>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="" style="position: absolute; bottom: 10px;width: 100%;display: flex;">
              <input type="text" id="typeEmail" v-model="comments" class="form-control ms-2" placeholder="input comment" style="border-radius: 20px;width: 80%;"/>
              <i class="fa-regular fa-paper-plane ms-2 mt-1" @click="PostComment()" style="padding-top: 10px;cursor: pointer;" ></i>
            </div>
          </div>
        </div>
      </div>
      <div class="parent" style="width: 80%;height: 723px; background-color: #DDDDDD; display: flex;justify-content: space-evenly;padding-top: 50px;">
        <div class=" mt-5 child" style="border: 1px solid black;width: 85%;height: 1700px; background-color: #fff; margin-bottom: 50px;">
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HeaderView from '../../components/HeaderView.vue'
import axios  from 'axios';
import html2pdf from 'html2pdf.js';

const route = useRoute();
const getIdDocument = parseInt(route.query.id) 
const getid = parseInt(route.query.getid) 
const ListContentDocument=ref([])
const CommentPassword=ref([])
const comments=ref('')
onMounted(() => {
    getDocument()
    GetCommentDocument()
    console.log(typeof(getid),getIdDocument);
});

const getDocument= async()=>{
    var version =""
    try {await axios.get(import.meta.env.VITE_GET_VERSION,{
    params:{documentid:getIdDocument}
    }).then(response =>{
        version= response.data[response.data.length-1].version1
    })
  } catch (error) {console.log(error);} 
  // console.log(version);

  try {await axios.get(import.meta.env.VITE_GET_DOCUMENT_BY_DOCUMENTOWNER,{params:{id:getIdDocument,version1: version,}}).then(response =>{
    for (let i = 0; i < response.data.length; i++) {
      ListContentDocument.value.push(response.data[i])
    }})
  } catch (error) {console.log(error);}
}

const GetCommentDocument =async()=>{
  try {await axios.get(import.meta.env.VITE_GET_COMMENT_DOCUMENT,{
    params:{documentId:getIdDocument,}
    }).then(response =>{
      for (let i = 0; i < response.data.length; i++) {
        CommentPassword.value.push(response.data[i])      
      }

    })
    
  } catch (error) {console.log(error);} 
}

const PostComment =()=>{
  CommentPassword.value.push({
    documentId: 56, userId: 20, comments: comments.value, feeling: 1,name:"test"
  })
  try {axios.post(import.meta.env.VITE_POST_COMMENT_DOCUMENT,{
    documentId:getIdDocument,
    userId :getid,
    comments:comments.value,
    
  }).then (response => {})
        }catch (error) {console.log(error);}

        comments.value=""
}

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

</script>
<template>
  <div v-if="Loading==true" style="height: 100vh;display: flex;">
      <LoadingVue ></LoadingVue>
  </div>
  <div v-else>
    <HeaderView :data="getid" style="z-index: 1;"/>
    <div>
      
      <div  style="padding-top: 100px;">
        <div class="mb-3" @click="newDocumentRealTime()" style="margin-left: 70px;width: 200px;">
          <div class="btn" style="display: flex;align-items: center;width: 174px;margin-top: 30px; margin-left: 30px;background-color: orange;">
            <i class="fa-solid fa-plus me-2 text-light"></i>
            <div class="fw-bold text-light">Thêm văn bản</div>
          </div>
        </div>
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
                                          <th class="text-center">Thể Loại</th>
                                          <th class="text-center">Chủ sở hữu</th>
                                          <th class="text-center">Action</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <tr v-for="(i, index) in ListDocumentRealTime">
                                          <td class="text-center">{{ index + 1 }}</td>
                                          <td class="text-center">{{ i.nameDocument }}</td>
                                          <td class="text-center">{{ i.classify }}</td>
                                          <td class="text-center">Duc An</td>
                                          <td class="text-center">
                                          <div class="d-flex " style="justify-content: center;">
                                              <div class="bg-info me-2" title="Xem thành viên"  style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                              <i class="fa-solid fa-user" style="color: #fff;"></i>
                                          </div>
                                          <div class="bg-danger me-2" @click="getIdDocumentRealTime(i.id)" title="Phê duyệt văn bản văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                              <i class="fa-solid fa-file-pen" style="color: #fff;"></i>
                                          </div>
                                          </div>
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
</template>
  
<script setup>
import axios  from 'axios';
import { useRoute,useRouter} from 'vue-router'
import { ref,onMounted } from "vue";
import Table from '@tiptap/extension-table'

import HeaderView from '../../components/HeaderView.vue'
import LoadingVue from "../../components/Loading.vue";

const Loading=ref(true)
const route=useRoute()
const router = useRouter()
const getid=route.params.id 
const ListDocumentRealTime=ref([])
onMounted(async()=>{
  setTimeout(function(){   
      Loading.value=false
  }, 1500);
  await getAllDocumentRealTime()
});

const getAllDocumentRealTime = async () => {
  try {
    await axios.get(import.meta.env.VITE_GET_ALL_DOCUMENT_REAL_TIME,{ params: { id: parseInt(getid) } }).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        ListDocumentRealTime.value.push(response.data[i])
      }
    })
  } catch (error) {
      console.log(error);
  }
};

const getIdDocumentRealTime=(id)=>{
  return router.push({ name: 'EditDocumentRealTime', query: { id, getid } });
}

const newDocumentRealTime=()=>{
  Loading.value=true
  setTimeout(function(){   
      Loading.value=false
      return router.push(`/Home/NewEdit/NewDocumentRealTime/${getid}`);
  }, 1500);
}
</script>
  
  
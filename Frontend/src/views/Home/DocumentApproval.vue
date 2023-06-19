<template>
    <div>
        <div class="mt-5" v-if="CloseForm==true">
            <section class="intro">
                <div class="bg-image h-100" >
                    <div class="mask d-flex align-items-center h-100" >
                        <div class="container">
                            <div class="row justify-content-center">
                            <div class="col-12">
                                <div class="card" style="height: 640px;">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                        <table class="table table-hover mb-0">
                                            <thead>
                                            <tr>
                                                <th class="text-center">Số thứ tự</th>
                                                <th class="text-center">Tên văn bản</th>
                                                <th class="text-center">Chủ sở hữu</th>
                                                <th class="text-center">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(i, index) in ListDocumentMerge">
                                                <td class="text-center">{{ index + 1 }}</td>
                                                <td class="text-center">{{ i.document_name }}</td>
                                                <td class="text-center">{{ i.owner_name }}</td>
                                                <td class="text-center">
                                                <div class="d-flex " style="justify-content: center;">
                                                    <div class="bg-info me-2" title="Xem thành viên" @click="getUserIndocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                                    <i class="fa-solid fa-user" style="color: #fff;"></i>
                                                </div>
                                                <div class="bg-danger me-2" @click="{getAllContentDocument(i.idDocumentOwner,i.id);CloseForm=false}" title="Phê duyệt văn bản văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                                    <i class="fa-solid fa-code-merge" style="color: #fff;"></i>
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
        <div v-else >
            <div style="display: flex;justify-content: center;">
                <div class="row" style="width: 90%; height: 600px; background-color: #fff; margin-top: 80px;border: 1px solid black;border-radius: 20px; ">
                    <div class="col" style="border: 1px solid black;width: 50%;border-top-left-radius: 20px;border-bottom-left-radius: 20px;">
                        <div style="width: 100%;display: flex;justify-content: center;margin-top: 20px;">
                            <label for="">Lựa chọn văn bản</label>
                        </div>
                        <div v-for="(text, title) in textareaByTitle" :key="title">
                        <h3>{{ title }}</h3>
                        <ul>
                            <li v-for="item in text" :key="item.id">
                            <label>
                                <input type="checkbox" @click="showPreview(item,item.id)">
                                {{item.name }}:{{item.textarea }}
                            </label>
                            </li>
                        </ul>
                        </div>
                            <!-- <div v-for="(text, title) in textareaByTitle" :key="title">
                                <h3>{{ title }}</h3>
                                <ul>
                                    <li v-for="item in text" :key="item.id">
                                    <div @click="showPreview(item,item.id)">{{ item.textarea }}</div>
                                    </li>
                                </ul>
                            </div> -->
                        <!-- <div>
                            <div v-for="(text, title) in textareaByTitle" :key="title">
                            <h3>{{ title }}</h3>
                            <ul>
                                <li v-for="item in text" :key="item.id">
                                <div @click="logTextareaId(item.id)">{{ item.textarea }}</div>
                                </li>
                            </ul>
                            </div>
                        </div> -->
                    </div>
                    <div class="col" style="border: 1px solid black;width: 50%;border-top-right-radius: 20px;border-bottom-right-radius: 20px;">
                        <div style="width: 100%;display: flex;justify-content: center;margin-top: 20px;">
                            <label for="">Bản xem trước</label>
                        </div>
                        <div class="preview" v-for="item in selectedTextareas" :key="item.id">
                            <h3>{{ item.title }}</h3>
                            <div>{{ item.textarea }}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted ,computed } from "vue";
import {required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import axios  from 'axios';
import {useRoute} from 'vue-router'
import Swal from "sweetalert2";

const route=useRoute()
const getid=route.params.id 
const ListDocumentMerge =ref([]) // danh sách các document được quyền merge
const ListContentDocumentMerge =ref([]) // danh sách các content ứng với các document được quyền merge

const CloseForm =ref(true)

onMounted(async()=>{
    await GetInfoDocument()
    console.log(ListDocumentMerge.value);
})
const GetInfoDocument =async()=>{
    try {
        await axios.get(import.meta.env.VITE_GET_INFO_DOCUMENT_MERGE,{
        params:{
            id:getid
        }
        }).then(response =>
        {
            for (let i = 0; i < response.data.length; i++) {
                ListDocumentMerge.value.push(response.data[i])    
            }
        })
    } catch (error) {
        console.log(error);
    }        
}

const getAllContentDocument=async(idOwner,idDocument)=>{
    try {
        await axios.get(import.meta.env.VITE_GET_CONTENT_DOCUMENT_MERGE,{
        params:{
            documentId:idDocument,
            userId:idOwner
        }
        }).then(response =>
        {
            for (let i = 0; i < response.data.length; i++) {
                ListContentDocumentMerge.value.push(response.data[i]) 
            }
        })
    } catch (error) {
        console.log(error);
    } 
}
const textareaByTitle = computed(() => {
  const grouped = {};
  ListContentDocumentMerge.value.forEach(item => {
    if (!grouped[item.title]) {
      grouped[item.title] = [];
    }
    grouped[item.title].push(item);
  });
  return grouped;
});

// function logTextareaId(id) {
//   console.log('Textarea ID:', id);
// }
const selectedTextareas = ref([]);

// Hiển thị bản xem trước của textarea được chọn
function showPreview(item,id) {
    console.log('Textarea ID:', id);
  const existingIndex = selectedTextareas.value.findIndex(
    selected => selected.title === item.title
  );
  if (existingIndex === -1) {
    selectedTextareas.value.push({ ...item });
  }else {
    selectedTextareas.value.splice(existingIndex, 1, { ...item });
  }
}
</script>
<style>

</style>
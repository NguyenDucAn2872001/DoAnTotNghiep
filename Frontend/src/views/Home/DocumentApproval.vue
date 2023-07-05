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
        <div v-else style="">
          <HeaderView />
          <div style="display: flex;justify-content: center; ;padding-top: 80px;width: 100%;height: 100vh;">
            <div style="width: 20%;background-color: #9C9C9C;">
              <div class="mb-5" style="display: flex;justify-content: flex-end;margin-right: 60px;">
                <button type="button" class="btn btn-success" @click="saveDocument" style="padding: 5px 20px 5px;">Cập nhât phiên bản mới</button>
              </div>
              <div class="mb-5" style="display: flex;justify-content: flex-end;margin-right: 60px;">
                <button type="button" class="btn btn-success" @click="saveDocument" style="padding: 5px 20px 5px;">Giữ lại phiên bản cũ</button>
              </div>
            </div>
            <div style="width: 80%;display: flex;justify-content: center;background-color: #4F4F4F;">
              <div class="row" style="width: 90%; height: 600px; background-color: #fff;border: 1px solid black;margin-top: 20px;">
                <div class="col" style="border: 1px solid black;width: 50%;height: 100%;">
                    <div style="width: 100%;max-height: 20%;display: flex;justify-content: center;margin-top: 20px;">
                        <div for="">Lựa chọn văn bản</div>
                    </div >
                    <div class="mt-5 scrollable-div">
                      <div class="mt-4" v-for="(text, title) in textareaByTitle" :key="title">                     
                        <div>
                          <h3>{{ title }}</h3>
                        </div>
                        <div>
                            <div class="ms-4" v-for="item in text" :key="item.id">
                              <div class="d-flex">
                                <input class="form-check-input me-2 col-2" @click="showPreview(item,item.id)" type="radio" :name="title" :id="item.id" :value="item.id">
                                <label class="form-check-label highlightable" :for="item.id">{{ item.name }} : {{ item.textarea }}</label>
                              </div>
                            </div>
                          </div>                       
                      </div>
                    </div>
                </div>
                <div class="col" style="border: 1px solid black;width: 50%;height: 100%;">
                    <div style="width: 100%;max-height: 20%;display: flex;justify-content: center;margin-top: 20px;">
                        <div for="">Bản xem trước</div>
                    </div>
                    <div class="scrollable-review">
                      <div class="mt-5 " v-for="item in selectedTextareas" :key="item.id">
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
import HeaderView from '../../components/HeaderView.vue'


const props = defineProps(['foo'])
const route=useRoute()
const getid=route.params.id 
const ListDocumentMerge =ref([]) // danh sách các document được quyền merge
const ListContentDocumentMerge =ref([]) // danh sách các content ứng với các document được quyền merge
const version=ref()
const CloseForm =ref(true)
const DocumentID=ref()

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
  DocumentID.value=idDocument
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
const saveDocument= async()=>{
  console.log(selectedTextareas.value);
  try {
        await axios.get(import.meta.env.VITE_GET_VERSION,{
        params:{
          documentid:DocumentID.value,
        }
        }).then(response =>
        {
          if(response.data[response.data.length-1]==null){
            version.value=1
          }
          else{
            version.value = response.data[response.data.length-1].version1 +1
          }
            console.log(response.data[response.data.length-1].version1);
        })
    } catch (error) {
        console.log(error);
    } 

  for (let i = 0; i < selectedTextareas.value.length; i++) {
    try {
      axios.post(import.meta.env.VITE_POST_FINAL_DOCUMENT,{
        title:selectedTextareas.value[i].title,
        textarea:selectedTextareas.value[i].textarea,
        documentid:selectedTextareas.value[i].documentId,
        version1:version.value
    }
    ).then (response => {
    })
    } catch (error) {
        console.log(error);
    }
    // try {
    //     axios.put(import.meta.env.VITE_UPDATE_PICK_DOCUMENT_MERGE,{
    //         id:selectedTextareas.value[i].id,
    //     }).then(response =>
    //     {
    //         console.log(response);
    //     })
    // } catch (error) {
    //     console.log(error);
    // } 
  }
  Swal.fire({
    icon: 'success',
    title: 'Lưu nội dung văn bản thành công',
    showConfirmButton: false,
    timer: 1000
  })
  CloseForm.value=!CloseForm.value
  ListContentDocumentMerge.value=[]
  version.value=""
  DocumentID.value=""
  window.location.reload();
}
</script>
<style>
.highlightable:hover {
  /* Style when hovered */
  background-color: #EEEEEE;
}
.scrollable-div {
  overflow: auto;
  max-height: 80%;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.scrollable-div::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}
.scrollable-div::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.scrollable-review {
  overflow: auto;
  max-height: 88%; 
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.scrollable-review::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}

.scrollable-review::-webkit-scrollbar-thumb {
  background-color: transparent;
}
.form-check-input{
  
  border-color: #333333;
}
.form-check-input:checked {
    background-color: #DD0000;
    border-color: #DD0000;
}
.form-check-input:hover {
  border-color: #DD0000;
}
input[type="radio"]:checked {
    outline: none;
    box-shadow: none;
  }
</style>
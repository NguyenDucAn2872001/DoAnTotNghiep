<template>
    <div v-for="i in ListContentDocument[0]">
        <div>{{ i }}</div>
    </div>
    <div v-for="i in ListInfoDocument">
        <div @click="getidOnclickDocument(i.id)">{{ i }}</div>
    </div>
    <div v-for="i in ListContentDocument">
        <div @click="getidOnclickDocument(i)">{{ i }}</div>
    </div>
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
                                                <th class="text-center">Hợp Nhất Văn Bản</th>
                                                <th class="text-center">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(i, index) in ListInfoDocument">
                                                <td class="text-center">{{ index + 1 }}</td>
                                                <td class="text-center">{{ i.document_name }}</td>
                                                <td class="text-center">{{ i.owner_name }}</td>
                                                <td class="text-center">{{ i.merge_name }}</td>
                                                <td class="text-center">
                                                <div class="d-flex " style="justify-content: center;">
                                                    <div class="bg-info me-2" title="Xem thành viên" @click="getUserIndocument(i.id)" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
                                                    <i class="fa-solid fa-user" style="color: #fff;"></i>
                                                </div>
                                                <div class="bg-danger me-2" @click="{getContentDocumnetbyid(i.id);CloseForm=false}" title="Chỉnh sửa văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
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
        <div  v-else class="nav">
            <div style="margin: 100px;">
                <button class="me-3" @click="SaveDocument">Save</button>
                <button @click="PosttData">Lưu Văn Bản</button>
                <div style="width: 1000px;height: 800px;border: 1px solid black; border-radius: 10px;" >
                    <div v-for="item in items"  style="display: flex;justify-content: center;"> 
                        <div class="box-textarea">
                            <div >
                                <div>{{ item.title }}</div>
                            </div>
                            <div>
                                <textarea class="custom-textarea" v-model="item.textarea"></textarea>
                            </div>
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <button @click="PosttData">save </button> -->
</template>
<script setup>
import { ref,onMounted,computed } from "vue";
import {required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import axios  from 'axios';
import {useRoute} from 'vue-router'
import Swal from "sweetalert2";

const route=useRoute()
const getid=route.params.id 
const ListDocumentIdEdit =ref([]) // id của văn bản được quyền chỉnh sửa
const ListInfoDocument =ref([]) // thông tin của văn bản được quyền chỉnh sửa
const ListContentDocument =ref([]) // thồng tin và nội dung của văn bản khi chủ sở hữu khởi tạo
const ListUserInDocument=ref([])
const infoUser=ref([])
const CloseForm =ref(true)
const items = ref([]);

const arrayToObject = (arr)=> {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    obj[i] = arr[i];
  }
  return obj;
}

// const addTextarea = () => {
//   const newItem = {
//     type: 'titleAndTextarea',
//     titleContent: '',
//     textareaContent: ''
//   };
//   items.value.push(newItem);
// }

onMounted(async()=>{
    await getInfoUser()
    await GetDocumentIdEdit()
    await GetInfoDocument()
    await GetContentDocument()
})

const GetDocumentIdEdit =async()=>{
    try {
        await axios.get(import.meta.env.VITE_GET_DOCUMENT_ID_EDIT,{
        params:{
            userId:getid
        }
        }).then(response =>
        {
            for (let i = 0; i < response.data.length; i++) {
                ListDocumentIdEdit.value.push(response.data[i].documentId)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const GetInfoDocument =async()=>{
    for (let i = 0; i < ListDocumentIdEdit.value.length; i++) {
        try {
            await axios.get(import.meta.env.VITE_GET_INFO_DOCUMENT,{
            params:{
                id:ListDocumentIdEdit.value[i]
            }
            }).then(response =>
            {
                console.log(response.data[0]);
                ListInfoDocument.value.push(response.data[0] )
            })
        } catch (error) {
            console.log(error);
        }
        
    }
}

const GetContentDocument =async()=>{
    for (let i = 0; i < ListDocumentIdEdit.value.length; i++) {
        try {
            await axios.get(import.meta.env.VITE_GET_CONTENT_DOCUMENT,{
            params:{
                documentid:ListDocumentIdEdit.value[i]
            }
            }).then(response =>
            {
                console.log(response.data);
                ListContentDocument.value.push(response.data)
                for (let j = 0; j < response.data.length; j++) {
                    console.log(response.data[j]);
                    
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }
}

const getContentDocumnetbyid=async(id)=>{
    items.value=[]
    try {
        await axios.get(import.meta.env.VITE_GET_CONTENT_DOCUMENT,{
        params:{
            documentid:id
        }
        }).then(response =>
        {
            for (let j = 0; j < response.data.length; j++) {
                console.log(response.data[j]);  
                items.value.push(response.data[j])            
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
        infoUser.value.push(response.data[i])
      }
    })
  } catch (error) {
      console.log(error);
  }
  console.log(infoUser.value);
}

const getUserIndocument= async(id)=>{
    console.log(id);
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

const PosttData = async() => {
    console.log(items.value);
    for (let i = 0; i < items.value.length; i++) {
        try {
            await axios.post(import.meta.env.VITE_POST_CONTENT_DOCUMENT_EDIT,{
                userId:getid,
                title:items.value[i].title,
                textarea:items.value[i].textarea,
                documentid:items.value[i].documentid,
            }
            ).then (response => {
                console.log(response);
            })
        } catch (error) {
            console.log(error);
        }
        
    }
    Swal.fire({
        icon: 'success',
        title: 'Lưu nội dung văn bản thành công',
        showConfirmButton: false,
        timer: 1000
    })
    items.value=[]
}

const getidOnclickDocument=(id)=>{
    console.log(id);
}

</script>
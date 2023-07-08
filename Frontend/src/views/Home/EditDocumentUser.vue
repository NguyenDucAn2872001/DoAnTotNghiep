<template>
    <div style="height: 100vh; ">
    <HeaderView :data="getid" />
        <div v-if="CloseForm==true">
            <section class="intro">
                <div class="bg-image h-100" >
                    <div class="mask d-flex align-items-center h-100" >
                        <div class="container" style="margin-top: 100px;">
                            <div class="row justify-content-center">
                            <div class="col-12">
                                <div class="card" style="height: 600px;">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                        <table class="table table-hover mb-0 " >
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
                                                    <div class="bg-danger me-2" @click="{getContentDocumnetbyid(i.id,i.idDocumentOwner);CloseForm=false}" title="Chỉnh sửa văn bản" style="cursor: pointer;width: 30px;height: 30px;display: flex;align-items: center;justify-content: space-around;border-radius: 50%;">
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
        <div  v-else class="nav" style="width: 100%; height: 100vh;">
            <div class="d-flex" style="width: 100%;">
                <div class="border" style="width: 20%;margin-top: 80px;display: flex;justify-content: center;">
                    <div style="width: 70%;margin-top: 40px;">
                        <button style="width: 90%;" @click="addTextarea">
                            <span class="shadow"></span>
                            <span class="edge1"></span>
                            <span class="front text bg-warning" style="font-size: 16px;">
                                Lưu PDF
                                <i class="fa-solid fa-download ms-2"></i>
                            </span>
                        </button>  
                        <button style="width: 90%;margin-top: 20px;"  @click="PosttData">
                            <span class="shadow"></span>
                            <span class="edge2"></span>
                            <span class="front text bg-success" style="font-size: 16px;">
                                Lưu văn bản
                                <i class="fa-solid fa-floppy-disk ms-2"></i>
                            </span>
                        </button>  
                    </div>
                </div>
                <div style="width: 80% ;margin-top: 80px;">
                    <div class="" style="width: 100%;height: 80px;background-color: #205AA7;display: flex;justify-content: center;padding-top: 20px;">
                        <div>
                            <el-dropdown class=" me-1" >
                                <el-button type="success">
                                    <i class="fa-solid fa-plus me-3" style="color: #fff;"></i>
                                    <i class="fa-solid fa-table"></i>
                                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <button type="button" class="btn" style="background-color: #958DF1; width: 100%;">
                                                insertTable
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #FFCC99; width: 100%;">
                                                addColumnBefore
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #CCCCFF; width: 100%;">
                                                deleteColumn
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #99CC99; width: 100%;">
                                                addRowBefore
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #BB0000; width: 100%;">
                                                deleteRow
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn" style="background-color: #99FFFF; width: 100%;">
                                                deleteTable
                                            </button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <button type="button" class="btn me-1" @click="addImage" style="background-color: #958DF1; width: 80px;height: 32px;">
                                <i class="fa-solid fa-plus me-3" style="color: #fff;"></i>
                                <i class="fa-solid fa-image" style="color: #fff;"></i>
                            </button>
                        </div>
                        <div>
                            <el-dropdown class=" me-1" >
                                <el-button type="warning">
                                    <i class="fa-solid fa-plus me-3" style="color: #fff;"></i>
                                    <i class="fa-solid fa-heading"></i>
                                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>
                                    <button type="button" class="btn" style="background-color: #33FFFF; width: 100%;">
                                        H1
                                    </button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <button type="button" class="btn"  style="background-color: #FFCCFF; width: 100%;">
                                        H2
                                    </button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                    <button type="button" class="btn"  style="background-color: #99CCFF; width: 100%;">
                                        H3
                                    </button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <el-dropdown class=" me-1" >
                                <el-button type="primary">
                                    <i class="fa-solid fa-plus me-3" style="color: #fff;"></i>
                                    <i class="fa-solid fa-palette"></i>
                                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <input type="color">
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #958DF1; width: 100%;">
                                                purple
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button"  style="background-color: #F98181; width: 100%;">
                                                red
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #FBBC88; width: 100%;">
                                                orange
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #FAF594; width: 100%;">
                                                yellow
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #70CFF8; width: 100%;">
                                                blue
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #94FADB; width: 100%;">
                                                teal
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn btn-light"  style=" width: 100%;">
                                                unsetColor
                                            </button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <el-dropdown class=" me-1" >
                                <el-button type="info">
                                    <i class="fa-solid fa-plus me-3" style="color: #fff;"></i>
                                    <i class="fa-solid fa-list-check"></i>
                                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #958DF1; width: 100%;">
                                                toggleBulletList
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #99FF33; width: 100%;">
                                                splitListItem
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #33FFFF; width: 100%;">
                                                sinkListItem
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="background-color: #FFCCFF; width: 100%;">
                                                liftListItem
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>Action 5</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <el-dropdown class=" me-1" >
                                <el-button type="#b3e19d" style="background-color: #b3e19d;">
                                    <i class="fa-solid fa-plus me-3" style="color: #fff;"></i>
                                    <i class="fa-solid fa-bold"></i>
                                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                        <button type="button" class="btn"  style="background-color: #958DF1; width: 100%;">
                                            toggleBold
                                        </button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                        <button type="button" class="btn"  style="background-color: #00CC00; width: 100%;">
                                            setBold
                                        </button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                        <button type="button" class="btn"  style="background-color: 	#339999; width: 100%;">
                                            unsetBold
                                        </button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <el-dropdown class=" me-1" >
                                <el-button type="" style="background-color:  #f3d19e;">
                                    <i class="fa-solid fa-highlighter"></i>
                                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <button type="button" class="btn"  style="width: 100%;background-color: orange;">
                                                orange
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn btn-success"  style="width: 100%;">
                                                green
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn btn-primary"  style="width: 100%;">
                                                blue
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn"  style="width: 100%; background-color: yellow;">
                                                Yellow
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn btn-danger"  style="width: 100%;">
                                                red 
                                            </button>
                                            </el-dropdown-item>
                                            <el-dropdown-item>
                                            <button type="button" class="btn btn-light"  style="width: 100%;">
                                                Tắt Highlight
                                            </button>
                                            </el-dropdown-item>
                                        <el-dropdown-item>Action 5</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>  
                    <div class="parent" style="height: 578px;width: 100%;display: flex;justify-content: center;">
                        <div class="child" style="width: 85%;">          
                            <div style="display: flex;justify-content: center;width: 100%;padding-top: 40px;">
                                <div style="width: 100%;height: 800px;border: 1px solid black; " >
                                    <div v-for="item in items"  style="width: 100%;"> 

                                            <div class="ms-5" style="padding-top: 70px;">
                                                <div style="font-size: 24px;">{{ item.title }}</div>
                                            </div>
                                            <div style="width: 100%;display: flex;justify-content: center;">
                                                <textarea class="custom-textarea1"  v-model="item.textarea" style="width: 90%;border: none;outline: none;resize: none;" placeholder="Nhập nội dung vào đây"></textarea>
                                            </div>
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
import { ref,onMounted,computed } from "vue";
import {required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import axios  from 'axios';
import {useRoute} from 'vue-router'
import Swal from "sweetalert2";
import HeaderView from '../../components/HeaderView.vue'


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
                ListDocumentIdEdit.value.push(response.data[i])
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
                id:ListDocumentIdEdit.value[i].documentId
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
                documentid:ListDocumentIdEdit.value[i].documentId,
                userId:ListDocumentIdEdit.value[i].idDocumentOwner
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

const getContentDocumnetbyid=async(id,idDocumentOwner)=>{
    items.value=[]
    try {
        await axios.get(import.meta.env.VITE_GET_CONTENT_DOCUMENT,{
        params:{
            documentid:id,
            userId:idDocumentOwner
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

<style>
.custom-textarea1 {
    padding: 10px;
    resize: none;
    width: 100%;
    height: 100px;
    border: 1px solid #DDDDDD;
    border-radius: 10px;
    margin-top: 20px;
}
</style>
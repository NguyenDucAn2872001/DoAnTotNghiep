<template>
    <div v-if="Loading==true" style="height: 100vh;display: flex;">
        <LoadingVue ></LoadingVue>
    </div>
   <div v-else style="width: 100%; ">
    <div v-if="CloseForm==true" >
        <section class="vh-100 bg-image"
            style="background-image: url('https://hainh2k3.com/wp-content/uploads/2018/11/CSS-Particles.gif');">
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" style="border-radius: 15px;position: relative;">

                        <router-link :to="`/Home/${getid}`" style="position: absolute; top:20px; right: 20px;font-size: 30px;cursor: pointer;color: black;" >
                            <i class="fa-solid fa-circle-xmark"></i>
                        </router-link>
                        <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-5"></h2>

                        <form  @submit.prevent="CreateDocument()" >
                            
                            <div class="form-outline mb-2">
                                <label class="form-label" for="form3Example1cg">Tên Tài Liệu</label>
                                <input type="text" v-model="info.NameDocument" id="form3Example1cg" class="form-control form-control-lg" />
                                <span class="text-danger" v-for="error in v$.NameDocument.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </span>
                            </div>

                            <div class="form-outline mb-2" style="display: grid;">
                                <label class="form-label" for="form3Example3cg">Loại tài liệu </label>
                                <el-select v-model="info.Classify" filterable placeholder="Select" >
                                    <el-option v-for="item in ListClassifyDocument" :key="item.id" :label="item.name" :value="item.name"/>     
                                </el-select>
                                <span class="text-danger" v-for="error in v$.Classify.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </span>
                            </div>

                            <div class="form-outline mb-2" style="display: grid;">
                                <label class="form-label" for="form3Example3cg">Người Chỉnh Sửa Văn Bản</label>
                                <el-select-v2 v-model="info.ListUserInDocument" filterable :options="infoUser.map(name => ({ value: name.id, label: name.name }))" placeholder=" "  multiple />
                                <span class="text-danger" v-for="error in v$.ListUserInDocument.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </span>
                            </div>

                            <div class="form-outline mb-2" style="display: grid;">
                                <label class="form-label" for="form3Example3cg">Người Hợp Nhất Văn Bản </label>
                                <el-select v-model="info.MergeUser" filterable placeholder="Select" >
                                    <el-option v-for="item in infoUser" :key="item.id" :label="item.name" :value="item.id"/>     
                                </el-select>
                                <span class="text-danger" v-for="error in v$.MergeUser.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </span>
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example4cg">Mã Tài Liệu</label>
                                <input type="text" v-model="info.PassWordDocument" id="form3Example3cg" class="form-control form-control-lg" />
                                <span class="text-danger" v-for="error in v$.PassWordDocument.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </span>
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
        <div  v-else style="width: 100%;background-color: rgb(156, 156, 156);">
            <HeaderView :data="getid" style="z-index: 2;"/>
            <div class="d-flex" style="width: 100%;z-index: 1;;">
                <div class="border" id="bg-left" style="width: 20% ;display:flex ;justify-content: center;position: relative;">
                    <div style="margin-top: 100px; width: 80%;">
                        <button style="width: 90%;" @click="addTextarea">
                            <span class="shadow"></span>
                            <span class="edge1"></span>
                            <span class="front text bg-warning" style="font-size: 16px;">
                                <i class="fa-solid fa-plus me-2 "></i>
                                Thêm Nội dung
                            </span>
                        </button>  
                        <button style="width: 90%;margin-top: 20px;" @click="PosttData">
                            <span class="shadow"></span>
                            <span class="edge2"></span>
                            <span class="front text bg-success" style="font-size: 16px;">
                                <i class="fa-solid fa-floppy-disk me-2"></i>
                                Lưu văn bản
                            </span>
                        </button>  
                        <router-link :to="`/Home/${getid}`" style="z-index: 2;">
                            <button style="width: 80%;margin-top: 20px;position: absolute;bottom: 20px;left: 28px;">
                                <span class="shadow"></span>
                                <span class="edge"></span>
                                <span class="front text" style="font-size: 16px;">
                                    <i class="fa-solid fa-house me-2"></i>
                                    Trang chủ
                                </span>
                            </button>
                        </router-link>
                    </div>
                </div>
                <div class="parent" style="width: 80%;margin-top: 120px;display: flex;justify-content: center;height: 618px;background-color: rgb(156, 156, 156);">     
                    <div class="child" style="width: 80%;height: 900px;border: 1px solid black;margin-bottom: 40px;background-color: #fff;padding-top: 40px;" >
                        <div v-for="(item, index) in items" :key="index" style="display: flex;justify-content: center;width: 100%;">
                            <template v-if="item.type === 'titleAndTextarea'">
                                <div class="box-textarea">
                                    <div >
                                        <input class="custom-input" type="text" v-model="item.titleContent" placeholder="Nhập tiêu đề tài liệu">
                                    </div>
                                    <div>
                                        <textarea class="custom-textarea" v-model="item.textareaContent"></textarea>
                                    </div>
                                    <i class="fa-solid fa-circle-xmark close-textarea" @click="removeTextarea(item, index)"></i>
                                </div>
                            </template>
                        </div>
                        <div style="display: flex;justify-content: center;">
                            <i class="fa-solid fa-circle-plus iconplus" @click="addTextarea"></i>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
   </div>
</template>
<script setup>
import { ref,onMounted,computed,defineExpose  } from "vue";
import {required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import axios  from 'axios';
import {useRoute} from 'vue-router'
import Swal from "sweetalert2";
import HeaderView from '../../components/HeaderView.vue'
import LoadingVue from "../../components/Loading.vue";

const Loading=ref(true)
const route=useRoute()
const getid=route.params.id 
const infoUser =ref([])
const items = ref([]);
const idDocument=ref()
const ListClassifyDocument=ref([])
const name = ref('');
const info = ref({
    ListUserInDocument :[],
    Classify:"",
    NameDocument : "",
    MergeUser:"",
    PassWordDocument : "",
})
const rules= computed(()=>{
    return{
        ListUserInDocument:{required},
        Classify:{required},
        NameDocument : {required},
        PassWordDocument : {required},
        MergeUser : {required},
    }
})
const v$ = useVuelidate(rules,info.value)

onMounted(async()=>{
    setTimeout(function(){   
        Loading.value=false
    }, 1500);
    await getInfoUser()
    await getClassifyDocument()
})

const CloseForm =ref(true)
const CreateDocument = async()=>{
    var result = await v$.value.$validate();
    if(result)
    {
        await postDocument();
        await getDocument();
        for (let i = 0; i < info.value.ListUserInDocument.length; i++) {
            try {
                await axios.post(import.meta.env.VITE_POSTUSERINDOCUMENT,{
                    documentId:idDocument.value,
                    userId :info.value.ListUserInDocument[i],
                    idDocumentOwner:getid,
                }
                ).then (response => {
                    console.log(response);
                })
            } catch (error) {
                console.log(error);
            }
                
        }  
        CloseForm.value=false
        console.log(info.value);
    }
}
const SaveDocument= async()=>{

    console.log(info.value.ListUserInDocument);
    console.log(items.value);
    
}
const postDocument= async()=>{
    console.log(info.value.ListUserInDocument.length,'test here');
    try {
        await axios.post(import.meta.env.VITE_POSTDOCUMENT,{
            nameDocument:info.value.NameDocument,
            classify :info.value.Classify,
            password :info.value.PassWordDocument,
            idDocumentOwner:getid,
            mergeUser :info.value.MergeUser,
        }
        ).then (response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Tạo Văn bản thành công',
                showConfirmButton: false,
                timer: 1000
            })
        })
    } catch (error) {
        console.log(error);
    }
}

const getDocument = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETDOCUMENT_BYID,{
      params:{
        idDocumentOwner:getid
      }
    }).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].nameDocument==info.value.NameDocument){
            idDocument.value=response.data[i].id
        }
      }
    })
  } catch (error) {
      console.log(error);
  }
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

const addTextarea = () => {
  const newItem = {
    type: 'titleAndTextarea',
    titleContent: '',
    textareaContent: ''
  };
  items.value.push(newItem);
}

const removeTextarea = (item, index) => {
    console.log(item,index);
  items.value.splice(index, 1);
}

const PosttData = async() => {
    for (let i = 0; i < items.value.length; i++) {
        try {
            await axios.post(import.meta.env.VITE_POST_DATA_CONTENT,{
                userId:getid,
                title:items.value[i].titleContent,
                textarea:items.value[i].textareaContent,
                documentid:idDocument.value,
            }
            ).then (response => {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Lưu nội dung văn bản thành công',
                    showConfirmButton: false,
                    timer: 1000
                })
            })
        } catch (error) {
            console.log(error);
        }      
    }

    try {
        await axios.post(import.meta.env.VITE_POST_NEW_NOTIFICATION,{
            notification_sender:parseInt(getid),
            notification_recipient :parseInt(info.value.MergeUser),
            content :`Bạn được ${name.value} thêm vào quyền Phê Duyệt văn bản ${info.value.NameDocument} (mã vb:${info.value.PassWordDocument})`,
            name_document:info.value.NameDocument,
            password_document :info.value.PassWordDocument,
            edit:0,
        }
        ).then (response => {
        })
    } catch (error) {
        console.log(error);
    }

    for (let i = 0; i < info.value.ListUserInDocument.length; i++) {
        try {
            await axios.post(import.meta.env.VITE_POST_NEW_NOTIFICATION,{
                notification_sender:parseInt(getid),
                notification_recipient :info.value.ListUserInDocument[i],
                content :`Bạn được ${name.value} thêm vào quyền Chỉnh Sửa văn bản ${info.value.NameDocument} (mã vb:${info.value.PassWordDocument})`,
                name_document:info.value.NameDocument,
                password_document :info.value.PassWordDocument,
                edit:1,
            }
            ).then (response => {
            })
        } catch (error) {
            console.log(error);
        }
        
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
            if (response.data[i].id!=getid) {
                infoUser.value.push(response.data[i])                
            }
        }
    })
  } catch (error) {
      console.log(error);
  }
}
defineExpose({
    info,
});

</script>

<style >
.parent {
  width: 300px; /* Độ rộng của div cha */
  height: 200px; /* Chiều cao của div cha */
  overflow: auto; /* Hiển thị thanh cuộn khi cần thiết */
}

.child {
  width: 100%; /* Độ rộng của div con */
  height: 400px; /* Chiều cao của div con (lớn hơn chiều cao của div cha) */
}
.el-select .el-input {
    display: flex;
    height: 48px;
}

.el-tooltip__trigger{
    height: 48px;
}
.nav{
    background-color: #fff;
    display: flex;
    justify-content: center;
}
.iconplus{
    margin-top: 20px;
    font-size: 30px;
    color: darkgray;
    cursor: pointer;
}
.close-textarea{
    position: absolute;
    top: 71px;
    right: 11px;
    color: red;
    cursor: pointer;
}
.box-textarea{
    position: relative;
}
.custom-input {
  width: 900px;
  height: 20px;
  border: none;
  margin-top: 20px;
  border-radius: 5px;
  padding: 5px;
  transition: border-color 0.3s ease;
}

.custom-input:hover {
  border-color: transparent;
}
.custom-input:focus {
  outline: none; 
  border-color: transparent;
}
.custom-textarea{
  padding: 10px;
  resize: none;
  width: 900px;
  height: 100px;
  border: none; 
  border-radius: 10px;
  margin-top: 20px;
}
.custom-textarea:focus {
  outline: none; 
  border-color: #DDDDDD; 
}
.edge1 {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 border-radius: 12px;
 background: linear-gradient(
    to left,
    #CDAD00 ,
    #CDAD00,
    #CDAD00,
    #CDAD00
  );
}
.edge2 {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 border-radius: 12px;
 background: linear-gradient(
    to left,
    #006241,
    #006241,
    #006241,
    #006241
  );
}
</style>
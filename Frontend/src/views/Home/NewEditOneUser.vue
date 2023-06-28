<template>
   <div style="height: 100vh; ">
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
                            
                            <div class="form-outline mb-4">
                                <label class="form-label" for="form3Example1cg">Tên Tài Liệu</label>
                                <input type="text" v-model="info.NameDocument" id="form3Example1cg" class="form-control form-control-lg" />
                                <span class="text-danger" v-for="error in v$.NameDocument.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </span>
                            </div>

                            <div class="form-outline mb-4" style="display: grid;">
                                <label class="form-label" for="form3Example3cg">Người Chỉnh Sửa Văn Bản</label>
                                <el-select-v2 v-model="info.ListUserInDocument" filterable :options="infoUser.map(name => ({ value: name.id, label: name.name }))" placeholder=" "  multiple />
                                <span class="text-danger" v-for="error in v$.ListUserInDocument.$errors" :key="error.$uid">
                                    {{ error.$message }}
                                </span>
                            </div>

                            <div class="form-outline mb-4" style="display: grid;">
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
        <div  v-else class="nav">
            <div style="margin: 100px;">
                <button @click="SaveDocument">Save</button>
                <button @click="PosttData">Get Data</button>
                <div style="width: 1000px;height: 800px;border: 1px solid black; border-radius: 10px;" >
                    <div v-for="(item, index) in items" :key="index" style="display: flex;justify-content: center;">
                        <template v-if="item.type === 'titleAndTextarea'">
                            <div class="box-textarea">
                                <div >
                                    <input class="custom-input" type="text" v-model="item.titleContent" placeholder="Input Title here">
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
const infoUser =ref([])
const items = ref([]);
const idDocument=ref()
const info = ref({
    ListUserInDocument :[],
    NameDocument : "",
    MergeUser:"",
    PassWordDocument : "",
})
const rules= computed(()=>{
    return{
        ListUserInDocument:{required},
        NameDocument : {required},
        PassWordDocument : {required},
        MergeUser : {required},
    }
})
const v$ = useVuelidate(rules,info.value)

onMounted(async()=>{
    await getInfoUser()
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
    try {
        await axios.post(import.meta.env.VITE_POSTDOCUMENT,{
            nameDocument:info.value.NameDocument,
            password :info.value.PassWordDocument,
            idDocumentOwner:getid,
            mergeUser :info.value.MergeUser,
        }
        ).then (response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Tạo tài khoản thành công',
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
    console.log(items.value);
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
                return route.push(`/Home/${getid}`)
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
        console.log(response.data[i].name);
        if (response.data[i].id!=getid) {
            infoUser.value.push(response.data[i])                
        }
      }
    })
  } catch (error) {
      console.log(error);
  }
}

</script>

<style >
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
  width: 960px;
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
  width: 960px;
  height: 100px;
  border: 1px solid #DDDDDD; 
  border-radius: 10px;
  margin-top: 20px;
}
.custom-textarea:focus {
  outline: none; 
  border-color: #DDDDDD; 
}
</style>
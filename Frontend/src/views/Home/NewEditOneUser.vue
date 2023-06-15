<template>
   <div >
    <div v-if="CloseForm==true">
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
                                <label class="form-label" for="form3Example3cg">Người Chỉnh Sửa </label>
                                <el-select-v2 v-model="info.ListUserInDocument" filterable :options="infoUser.map(name => ({ value: name, label: name }))" placeholder=" " style="width: 538.4px;" multiple />
                                <span class="text-danger" v-for="error in v$.ListUserInDocument.$errors" :key="error.$uid">
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
            <div>
                <button @click="addTextarea">Thêm Textarea</button>
                <button @click="addTitle">Thêm Title</button>
                <button >Save</button>
                <div @click="ViewTextarea">click me</div>
                <div style="width: 1000px;height: 800px;border: 1px solid black; border-radius: 10px;" >
                    <div v-for="(item, index) in items" :key="index" style="display: flex;justify-content: center;">
                        <template v-if="item.type === 'textarea'" >
                            <div class="box-textarea">
                                <textarea class="custom-textarea" v-model="item.content" ></textarea>
                                <i class="fa-solid fa-circle-xmark close-textarea" ></i>
                            </div>
                        </template>
                        <template v-else-if="item.type === 'title'">
                            <div >
                                <input class="custom-input" type="text" v-model="item.content" placeholder="Input Title here">
                                <!-- <i class="fa-solid fa-circle-xmark"></i> -->
                            </div>
                        </template>
                    </div>
                    <div style="display: flex;justify-content: center;">
                        <i class="fa-solid fa-circle-plus iconplus"></i>
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

const route=useRoute()
const getid=route.params.id  // id người nhắn

const infoUser =ref([])
// const ListUserInDocument = ref([])
// const NameDocument = ref([])
// const PassWordDocument = ref([])

const info = ref({
    ListUserInDocument :[],
    NameDocument : "",
    PassWordDocument : "",

})
const rules= computed(()=>{
    return{
        ListUserInDocument:{required},
        NameDocument : {required},
        PassWordDocument : {required},
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
        CloseForm.value=false
        console.log(info.value);
    }
    
}
const items = ref([]);

const addTextarea =()=> {
  items.value.push({ type: 'textarea', content: '' });
}

const addTitle =()=> {
  items.value.push({ type: 'title', content: '' });
}

const ViewTextarea = () => {
  for (let i = 0; i < items.value.length; i++) {
    if(items.value[i].type=='textarea')
    console.log(items.value[i].content);
  }
}

const getInfoUser = async()=>{
  try {
    await axios.get(import.meta.env.VITE_GETAPI_USER).then(response =>
    {
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].name);
        infoUser.value.push(response.data[i].name)
        // infoUser.value.push(response.data[i])
        // if (response.data[i].name!=name.value) {
        //   users.value.push(response.data[i].name)
          
        // }
      }
    })
  } catch (error) {
      console.log(error);
  }
}

</script>

<style >
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
    top: 14px;
    right: -4px;
    color: red;
    cursor: pointer;
}
.box-textarea{
    position: relative;
}
.custom-input {
  width: 980px;
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
  resize: none;
  width: 980px;
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
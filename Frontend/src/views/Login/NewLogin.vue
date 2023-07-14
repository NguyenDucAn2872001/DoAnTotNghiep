<template>
    <section class="vh-100 mt-5 mb-5" >
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style="border-radius: 25px;">
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                        <form class="mx-1 mx-md-4" @submit.prevent="submitCreate()">
                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example3c">Email</label>
                                    <input type="text"  v-model="info.email"  id="form3Example3c" class="form-control" placeholder="Nhập Email"/>
                                    <span class="text-danger" v-for="error in v$.email.$errors" :key="error.$uid">
                                        {{ error.$message }}
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example1c">Tên người dùng</label>
                                    <input type="text"  id="form3Example1c" v-model="info.username" class="form-control" placeholder="Nhập tên người dùng"/>
                                    <span class="text-danger" v-for="error in v$.username.$errors" :key="error.$uid">
                                        {{ error.$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example1c">Tên</label>
                                    <input type="text"  id="form3Example1c" v-model="info.name" class="form-control" placeholder="Nhập tên của bạn"/>
                                    <span class="text-danger" v-for="error in v$.name.$errors" :key="error.$uid">
                                        {{ error.$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>                              
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example1c">Mã số sinh viên</label>
                                    <input type="text"  id="form3Example1c" v-model="info.studentCode" class="form-control" placeholder="Nhập mã số sinh viên"/>
                                    <span class="text-danger" v-for="error in v$.studentCode.$errors" :key="error.$uid">
                                        {{ error.$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center mb-4">
                                <!-- <i class="fas fa-user fa-lg me-3 fa-fw" ></i> -->
                                <i class="fa-solid fa-image me-3 fa-fw" style="font-size: 20px;"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example1c">Your avatar</label>
                                    <input type="text"  id="form3Example1c" v-model="info.avata" class="form-control" />
                                    <span class="text-danger" v-for="error in v$.avata.$errors" :key="error.$uid">
                                        {{ error.$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example4c">Mật khẩu</label>
                                    <input type="password"   id="form3Example4c" v-model="info.password" class="form-control" placeholder="Nhập mật khẩu"/>
                                    <span class="text-danger" v-for="error in v$.password.$errors" :key="error.$uid">
                                        {{ error.$message }}
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example4cd">Nhập lại mật khẩu</label>
                                    <input type="password"  id="form3Example4cd" class="form-control" placeholder="Nhập mật khẩu"/>
                                    <!-- <span class="text-danger" v-for="error in v$.repeatPassword.$errors" :key="error.$uid">
                                        {{ error.$message }}
                                    </span> -->
                                </div>
                            </div>

                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4" style="padding-left: 20px;">
                                <router-link class="me-3" to="/" style="width: 40%;">         
                                    <button class="btn btn-danger btn-lg " style="width: 100%;">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        Login
                                    </button>
                                </router-link>
                                <input type="submit" class="btn btn-primary btn-lg" style="width: 40%;" value="Create">
                            </div>                     
                        </form>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid" alt="Sample image">

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>
<script  setup>
import {required , minLength,email} from "@vuelidate/validators"
//import {required , minLength,email} from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import {ref,onMounted,computed} from 'vue'
import axios  from 'axios';
import Swal from "sweetalert2";

const emailUser= ref([])
const nameUser= ref([])

onMounted( async() => {
    try {
        await axios.get(import.meta.env.VITE_GETAPI_USER,{
        }
        ).then(response =>{
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                emailUser.value.push(response.data[i].email)
            }
            for (let i = 0; i < response.data.length; i++) {
                nameUser.value.push(response.data[i].name)
            }

        })
    } catch (error) {
        console.log(error);
    }
})
const info = ref({
    email : "",
    password : "",
    name : "",
    username : "",
    studentCode : "",
    createdAt : null,
    avata : "",
    repeatPassword: "",

})

const rules= computed(()=>{
    return{
        //email:{required,email,containerUser: helpers.withMessage("please enter email",containerUser)},
        email:{required,email},
        password : {required, minLength:minLength(4)},
        name : {required},
        username : {required},
        studentCode : {required},
        avata : {required},
        //repeatPassword: {required},
    }
})
const v$ = useVuelidate(rules,info.value)
const  submitCreate  = async()=>{
    var result = await v$.value.$validate();
    if(result)
    {
        if(emailUser.value.indexOf(info.value.email)==-1){
            if(nameUser.value.indexOf(info.value.name)==-1){
                try {
                await axios.post(import.meta.env.VITE_NEW_LOGIN,{
                    email:info.value.email,
                    password :info.value.password,
                    name:info.value.name,
                    username :info.value.username,
                    studentCode:info.value.studentCode,
                    createdAt :info.value.createdAt,
                    avata:info.value.avata
                }
                ).then (response => {
                    console.log(response);
                        Swal.fire({
                            icon: 'success',
                            title: 'Tạo tài khoản thành công',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        setTimeout(function(){
                            location.reload();   
                        }, 1000);
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Đăng ký lỗi!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký lỗi',
                    text: 'Tên người dùng đã tồn tại!',
                })
            }

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký lỗi',
                text: 'Tài khoản email này đã từng đăng ký trước kia!',
            })
        }
        
    }
    else{
        console.log("error");
    }
}

</script>
<style>

</style>
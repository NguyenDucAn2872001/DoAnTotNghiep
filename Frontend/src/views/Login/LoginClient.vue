<template>
    <!-- <div>{{ store.state.check }}</div>
    <button @click="store.state.check = !store.state.check"> check here</button> -->
    <section class="vh-100 ">
        <div class="container-fluid h-custom ">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit.prevent="submitCreate()">
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form3Example3">Địa chỉ Email</label>
                            <input v-model="info.email" type="email" id="form3Example3" class="form-control form-control-lg"
                            placeholder="Nhập địa chỉ Email" />
                            <span class="text-danger" v-for="error in v$.email.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </span>
                        </div>
                        <div class="form-outline mb-3">
                            <label class="form-label" for="form3Example4">Mật Khẩu</label>
                            <input v-model="info.password" type="password" id="form3Example4" class="form-control form-control-lg"
                            placeholder="Nhập  mật khẩu" />
                            <span class="text-danger" v-for="error in v$.password.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="form-check mb-0">
                            <input class="form-check-input me-2 " type="checkbox" value="" id="form2Example3" />
                            <label class="form-check-label" for="form2Example3">
                                Remember me
                            </label>
                            </div>
                            <router-link to="/Login/ForgotPassword" >
                                <a href="#!" class="text-body">Forgot password?</a>
                            </router-link>               
                        </div>
                        <div class="text-center text-lg-start mt-4 pt-2">
                            <input type="submit" value="Đăng Nhập" class="btn btn-primary btn-lg"
                            style="padding-left: 2.5rem; padding-right: 2.5rem;">
                            <p class="small fw-bold mt-2 pt-1 mb-0">Bạn chưa có tài khoản? 
                                <router-link to="/Login/NewLogin" >
                                    <a href="#!" class="link-danger">Đăng ký</a>
                                </router-link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script setup>
    import {ref,computed,onMounted } from 'vue'
    import {required , minLength,email} from "@vuelidate/validators"
    import useVuelidate from "@vuelidate/core"
    import axios  from 'axios';
    import { useRouter } from 'vue-router';
    import Swal from "sweetalert2";

    const check=ref(false)
    const route = useRouter()
    const info = ref({
        email : "",
        password : "",
    })
    const rules= computed(()=>{
        return{
            email:{required,email},
            password : {required, minLength:minLength(4)},
    
            }
    })
    const v$ = useVuelidate(rules,info.value)
    const  submitCreate  = async()=>{
        var result = await v$.value.$validate();
        if(result)
        {
            try {
                console.log("1");
                await axios.post(import.meta.env.VITE_LOGIN_CLIENT,{
                    email:info.value.email,
                    password :info.value.password,
                }
                ).then(response =>{
                    console.log(response.data[0].email );
                    if ( response.data[0].email=== info.value.email &&  response.data[0].password=== info.value.password) {
                        Swal.fire({
                            // position: 'top-end',
                            icon: 'success',
                            title: 'Đăng nhập thành công',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        localStorage.removeItem('id');
                        localStorage.setItem('id','true')
                        setTimeout(function(){   
                            return route.push('/Home') 
                        }, 1000);
                        check.value=true
                    }
                    else{
                        console.log("error");
                    }
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng nhập thất bại!',
                    text: 'Tài khoản hoặc mật khẩu sai ',
                    //footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        }else{
            console.log("error");
        }
    }

    

    
  </script>
  <style>
    .butonicon{
        border-radius: 50%;
    }
    .divider:after,
    .divider:before {
        content: "";
        flex: 1;
        height: 1px;
        background: #eee;
    }
    .h-custom {
        height: calc(100% - 73px);
    }
    @media (max-width: 450px) {
        .h-custom {
        height: 100%;
    }
    }
  </style>
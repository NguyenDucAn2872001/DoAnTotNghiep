<template>
    <section class="vh-100 ">
        <div class="container-fluid h-custom ">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-3 offset-xl-1 form_main formLogin">
                        <div class="text-dark mb-3" style="z-index: 2;font-size: 30px;font-weight: 700;">Login</div>
                        <div class="form-outline mb-3" style="z-index: 2;">
                            <lable class="text-dark fw-bold" for="form3Example3">Địa chỉ Email</lable>
                            <input v-model="info.email" type="email" id="form3Example3" class="form-control form-control-lg"
                            placeholder="Nhập địa chỉ Email" style="width: 345px;"/>
                            <span class="text-danger" v-for="error in v$.email.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </span>
                        </div>
                        <div class="form-outline mb-3" style="z-index: 2;">
                            <label class="text-dark fw-bold" for="form3Example4">Mật Khẩu</label>
                            <input v-model="info.password" type="password" id="form3Example4" class="form-control form-control-lg"
                            placeholder="Nhập  mật khẩu" style="width: 345px;"/>   
                            <span class="text-danger" v-for="error in v$.password.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </span>                      
                        </div>                                      
                        <div class="text-center text-lg-start mt-4 pt-2" style="z-index: 2;">
                            <button @click="submitCreate()" class="me-4">
                                <span class="shadow"></span>
                                <span class="edge"></span>
                                <span class="front text"> Đăng Nhập
                                </span>
                            </button>                                               
                            <router-link to="/Login/ForgotPassword" style="z-index: 2;">
                                <button>
                                    <span class="shadow"></span>
                                    <span class="edge"></span>
                                    <span class="front text bg-warning"> Forgot pass
                                    </span>
                                </button>
                            </router-link>               
                            
                            <p class="small fw-bold mt-2 pt-1 mb-0 text-dark d-flex justify-content-center mt-4" >Bạn chưa có tài khoản? 
                                <router-link to="/Login/NewLogin" >
                                    <a href="#!" class="link-danger ms-2">Đăng ký</a>
                                </router-link>
                            </p>                         
                        </div>
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
    const AdminAcc=ref({id:0,email:"admin@admin.com",username:"admin",name:'admin',password:"admin"})
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
    onMounted(()=>{
        localStorage.setItem('id','false')
        console.log(localStorage.getItem('id'));
    })
    const v$ = useVuelidate(rules,info.value)
    const  submitCreate  = async()=>{
        var result = await v$.value.$validate();
        if(result)
        {
            try {
                if(info.value.email===AdminAcc.value.email && info.value.password===AdminAcc.value.password){
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng nhập thành công',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    localStorage.removeItem('id');
                    localStorage.setItem('id','true')
                    setTimeout(function(){   
                        return route.push('/ManageClient') 
                    }, 1000);
                }else{
                    await axios.post(import.meta.env.VITE_LOGIN_CLIENT,{
                        email:info.value.email,
                        password :info.value.password,
                    }
                    ).then(response =>{
                        console.log(response.data[0].email );
                        if ( info.value.email===response.data[0].email  && info.value.password=== response.data[0].password) {
                            localStorage.setItem('iduser',response.data[0].id)
                            Swal.fire({
                                icon: 'success',
                                title: 'Đăng nhập thành công',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            localStorage.removeItem('id');
                            localStorage.setItem('id','true')
                            setTimeout(function(){   
                                return route.push(`/Home/${response.data[0].id}`) 
                            }, 1000);
                            check.value=true
                        }
                        else
                        {
                            console.log("error");
                        }
                    
                    })
                }
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
.formLogin{
    width: 400px;
    background: linear-gradient(#fff, #FFCC99) padding-box,
              linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 16px;
}
button {
 position: relative;
 border: none;
 background: transparent;
 padding: 0;
 cursor: pointer;
 outline-offset: 4px;
 transition: filter 250ms;
 user-select: none;
 touch-action: manipulation;
}

.shadow {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 border-radius: 12px;
 background: hsl(0deg 0% 0% / 0.25);
 will-change: transform;
 transform: translateY(2px);
 transition: transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

.edge {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 border-radius: 12px;
 background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}

.front {
 display: block;
 position: relative;
 padding: 12px 27px;
 border-radius: 12px;
 font-size: 1.1rem;
 color: white;
 background: hsl(345deg 100% 47%);
 will-change: transform;
 transform: translateY(-4px);
 transition: transform
    600ms
    cubic-bezier(.3, .7, .4, 1);
}

button:hover {
 filter: brightness(110%);
}

button:hover .front {
 transform: translateY(-6px);
 transition: transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

button:active .front {
 transform: translateY(-2px);
 transition: transform 34ms;
}

button:hover .shadow {
 transform: translateY(4px);
 transition: transform
    250ms
    cubic-bezier(.3, .7, .4, 1.5);
}

button:active .shadow {
 transform: translateY(1px);
 transition: transform 34ms;
}

button:focus:not(:focus-visible) {
 outline: none;
}

.form_main {
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: blanchedalmond;
  padding: 30px 30px 30px 30px;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.062);
  position: relative;
  overflow: hidden;
}

.form_main::before {
    position: absolute;
    content: "";
    width: 485px;
    height: 413px;
    background-color: rgb(209, 193, 255);
    transform: rotate(45deg);
    left: -254px;
    bottom: 156px;
    z-index: 1;
    border-radius: 30px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.082);
}
  </style>
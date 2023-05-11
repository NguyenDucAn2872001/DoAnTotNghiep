<template>
    <div class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center
          min-vh-100">
        <div class="col-12 col-md-8 col-lg-4">
          <div class="card shadow-sm">

            <div class="card-body" v-if="check==true">
              <div class="mb-4">
                <h5>Forgot Password?</h5>
                <p class="mb-2">Vui lòng nhập địa chỉ email để lấy lại mật khẩu
                </p>
              </div>
              <form @submit.prevent="submitCreate()">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" class="form-control" v-model="info.email" name="email" placeholder="Enter Your Email">
                </div>
                <div class="mb-3 d-grid" >
                  <input type="submit" value="Đăng Nhập" class="btn btn-primary ">
                </div>
                <span >Bạn chưa có tài khoản ? 
                  <router-link to="/Login/NewLogin" >
                    <a href="sign-in.html">Đăng ký tài khoản</a>
                  </router-link>
                </span>
              </form>
            </div>
            <div class="card-body" v-else>
                <div class="mb-4">
                    <h5>Lấy lại mật khẩu thành công</h5>
                    <p class="mb-2">Below is your account and password </p>
                </div>
                <div class="row">
                    <div class="col-4">
                        Tài Khoản: 
                    </div>
                    <div class="col">
                      {{ info.email }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        Mật Khẩu: 
                    </div>
                    <div class="col">
                      {{ info.password }}
                    </div>
                </div>
                <div class="mt-3 d-grid" >
                  <router-link to="/" >
                    <button type="submit" class="btn btn-primary"  >
                      Trở lại trang đăng nhập
                    </button>
                  </router-link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
    import {ref } from 'vue'
    import axios  from 'axios';
    import Swal from "sweetalert2";
    const check= ref(true)
    const info = ref({
        email : "",
        password:""
    })
    const submitCreate  = async()=>{
            try {
                console.log("1");
                await axios.post(import.meta.env.VITE_FORGOT_PASSWORD,{
                    email:info.value.email,
                }
                ).then(response =>{
                    console.log(response.data,"test here");
                    if ( response.data[0].email=== info.value.email ) {
                      let timerInterval
                      Swal.fire({
                        icon: 'success',
                        title: 'Đang lấy lại mật khẩu!',
                        html: 'Vui lòng chờ trong <b></b> ms giây',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                          Swal.showLoading()
                          const b = Swal.getHtmlContainer().querySelector('b')
                          timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                          }, 100)
                        },
                        willClose: () => {
                          clearInterval(timerInterval)
                        }
                      }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                          console.log('I was closed by the timer')
                        }
                      })
                        info.value.password =response.data[0].password
                        check.value=false    
                        
                    }
                    else{
                        console.log("error");
                    }
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tài khoản không tồn tại!',
                    text: 'Vui lòng nhập lại hoặc tạo tài khoản mới ',
                })
            }
    }
</script>
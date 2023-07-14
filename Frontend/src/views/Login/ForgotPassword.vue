<template>
    <div v-if="Loading==true" style="height: 100vh;display: flex;">
      <LoadingVue ></LoadingVue>
    </div>
    <div v-else class="container d-flex flex-column">
      <div class="row align-items-center justify-content-center
          min-vh-100">
        <div class="col-12 col-md-8 col-lg-4">
          <div class="">

            <div class="card-body form_main1 formLogin1" v-if="check==true">
              <div class="mb-4 " style="z-index: 2; color: #000;">
                <h5 class="d-flex justify-content-center fw-bold fs-2 text">Forgot Password?</h5>
                <p class="mb-2 fw-bold">Vui lòng nhập địa chỉ email và mssv để lấy lại mật khẩu
                </p>
              </div>
                <div class="mb-3" style="z-index: 2;color: #000;">
                  <label for="email" class="form-label fw-bold">Email</label>
                  <input type="email" id="email" class="form-control" v-model="info.email" name="email" placeholder="Nhập Email">
                </div>

                <div class="mb-3" style="z-index: 2;color: #000;">
                  <label for="text" class="form-label fw-bold">Mã số sinh viên</label>
                  <input type="text" id="text" class="form-control" v-model="info.role"  placeholder="Nhập mã số sinh viên">
                </div>
                <div class="mb-3 d-grid d-flex justify-content-center" style="z-index: 2;" >
                  <button @click="submitCreate()" class="me-4">
                                <span class="shadow"></span>
                                <span class="edge"></span>
                                <span class="front text"> Lấy lại mật khẩu
                                </span>
                            </button>
                </div>
                <span class="text-dark" style="z-index: 2;">Bạn chưa có tài khoản ? 
                  <router-link to="/Login/NewLogin" >
                    <a href="sign-in.html" class="text-danger fw-bold ms-2">Đăng ký tài khoản</a>
                  </router-link>
                </span>
            </div>
            <div class="card-body form_main1 formLogin1 pt-5 pb-5" v-else>
                <div class="mb-4" style="z-index: 2;">
                    <h5 class="fw-bold text-dark">Lấy lại mật khẩu thành công</h5>
                    <p class="mb-2 fw-bold text-dark">Below is your account and password </p>
                </div>
                <div class="row" style="z-index: 2;">
                    <div class="col fw-bold text-dark">
                        Tài Khoản: 
                    </div>
                    <div class="col fw-bold text-dark">
                      {{ info.email }}
                    </div>
                </div>
                <div class="row fw-bold text-dark" style="z-index: 2;">
                    <div class="col">
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
import {ref,onMounted } from 'vue'
import axios  from 'axios';
import Swal from "sweetalert2";
import LoadingVue from "../../components/Loading.vue";

const Loading=ref(true)
const check= ref(true)
const info = ref({
    email : "",
    password:""
})
onMounted( async() => {
  setTimeout(function(){   
    Loading.value=false
  }, 1500);
})
const submitCreate  = async()=>{
  try {
    await axios.post(import.meta.env.VITE_FORGOT_PASSWORD,{
        email:info.value.email,
    }
    ).then(response =>{
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

<style>
.formLogin1{
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
.form_main1 {
  width: 420px;
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

.form_main1::before {
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
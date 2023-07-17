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
              <div class="mb-2 " style="z-index: 2; color: #000;">
                <h5 class="d-flex justify-content-center fw-bold fs-2 text">Forgot Password?</h5>
                <p class="mb-1 fw-bold">Vui lòng nhập địa chỉ email và mssv để lấy lại mật khẩu
                </p>
              </div>
                <div class="mb-3" style="z-index: 2;color: #000;">
                  <label for="email" class="form-label fw-bold" style="font-size: 18px;">Email</label>
                  <input type="email" id="email" class="form-control" v-model="email" name="email" placeholder="Nhập Email">
                </div>

                <div class="mb-3" style="z-index: 2;color: #000;">
                  <label for="text" class="form-label fw-bold" style="font-size: 18px;">Mã số sinh viên</label>
                  <input type="text" id="text" class="form-control" v-model="studentCode"  placeholder="Nhập mã số sinh viên">
                </div>
                <div class="mb-3 d-grid d-flex justify-content-center" style="z-index: 2;" >
                  <button @click="SendOtpToEmail()" class="me-4">
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
            <div class="" v-else>
              <form v-if="checkOTP==true" class="form" >
                <span class="close" @click="check=!check">X</span>

                <div class="info">
                <span class="title">OTP Verification</span>
                <p class="description">Vui lòng nhập mã OTP được gửi vào Email của bạn. </p>
                  </div>
                    <div class="inputs">
                    <input placeholder="" type="tel" v-model="otp1" maxlength="1">
                    <input placeholder="" type="tel" v-model="otp2" maxlength="1">
                    <input placeholder="" type="tel" v-model="otp3" maxlength="1">
                    <input placeholder="" type="tel" v-model="otp4" maxlength="1">
                  </div>
                    <a class="validate fw-bold text-light mt-5 mb-3" href="#" @click="CheckOtp()" >Xác nhận</a>
                <p class="resend">Bạn không nhận được OTP ?<a class="resend-action">Gửi lại</a></p>
              </form>
              <div v-else>
                <div class="card-body form_main1 formLogin1" >
                <div class="mb-2 " style="z-index: 2; color: #000;">
                  <h5 class="d-flex justify-content-center fw-bold fs-2 text">Đổi mật khẩu </h5>
                </div>

                  <div class="mb-3" style="z-index: 2;color: #000;">
                    <label for="email" class="form-label fw-bold" style="font-size: 18px;">Mật khẩu mới</label>
                    <input type="email" id="email" class="form-control" v-model="newPassword" name="email" placeholder="Nhập Email">
                  </div>

                  <div class="mb-3" style="z-index: 2;color: #000;">
                    <label for="text" class="form-label fw-bold" style="font-size: 18px;">Nhập lại mật khẩu mới</label>
                    <input type="text" id="text" class="form-control"  placeholder="Nhập mã số sinh viên">
                  </div>
                  <div class="mb-3 d-grid d-flex justify-content-center" style="z-index: 2;" >
                    <button @click="ChangePasswod()" class="me-4">
                      <span class="shadow"></span>
                      <span class="edge"></span>
                      <span class="front text"> Đổi mật khẩu
                      </span>
                    </button>
                  </div>
                  <span class="text-dark" style="z-index: 2;">
                    <router-link to="/Login" >
                      <a href="sign-in.html" class="text-danger fw-bold ms-2">Quay lại trang đăng nhập</a>
                    </router-link>
                  </span>
              </div>
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
import { ElNotification } from 'element-plus'

const Loading=ref(true)
const check= ref(true)
const checkOTP= ref(true)
const otp1=ref()
const otp2=ref()
const otp3=ref()
const otp4=ref()
const newPassword=ref('')
const email=ref('')
const studentCode=ref('')
onMounted( async() => {
  setTimeout(function(){   
    Loading.value=false
  }, 1500);
})
const SendOtpToEmail  = async()=>{
  check.value=false 
  // try {
  //   await axios.post(import.meta.env.VITE_FORGOT_PASSWORD,{
  //       email:info.value.email,
  //   }
  //   ).then(response =>{
  //     if ( response.data[0].email=== info.value.email ) {
  //       let timerInterval
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Đang lấy lại mật khẩu!',
  //         html: 'Vui lòng chờ trong <b></b> ms giây',
  //         timer: 2000,
  //         timerProgressBar: true,
  //         didOpen: () => {
  //           Swal.showLoading()
  //           const b = Swal.getHtmlContainer().querySelector('b')
  //           timerInterval = setInterval(() => {
  //             b.textContent = Swal.getTimerLeft()
  //           }, 100)
  //         },
  //         willClose: () => {
  //           clearInterval(timerInterval)
  //         }
  //       }).then((result) => {
  //         if (result.dismiss === Swal.DismissReason.timer) {
  //           console.log('I was closed by the timer')
  //         }
  //       })
  //         info.value.password =response.data[0].password
             
  //     }
  //     else{
  //         console.log("error");
  //     }
  //   })
  // } catch (error) {
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Tài khoản không tồn tại!',
  //     text: 'Vui lòng nhập lại hoặc tạo tài khoản mới ',
  //   })
  // }
}
const CheckOtp=()=>{
  if (otp1.value==null||otp2.value==null||otp3.value==null||otp4.value==null){
    ElNotification({
      title: 'Warning',
      message: 'Vui lòng nhập OTP',
      type: 'warning',
    })
  }else{
    checkOTP.value=false
  }
}

const ChangePasswod =()=>{

}
</script>

<style scoped>
.form-control {

    display: block;
    width: 370px;
    height: 44px;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    background-clip: padding-box;
    border: var(--bs-border-width) solid var(--bs-border-color);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: var(--bs-border-radius);
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
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

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: #606c88;
  background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
  background: linear-gradient(to right, #3f4c6b, #606c88);
  border-radius: 10px;
  box-shadow: 0px 87px 78px -39px rgba(0,0,0,0.4);
  max-width: 320px;
}

.info {
  margin-bottom: 10px;
}

.title {
  color: #fff;
  font-size: 1.5rem;
  line-height: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.description {
  color: #fff;
  margin-top: 10px;
  font-size: 15px;
}

.form .inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.form .inputs input {
  height: 2.5em;
  width: 2.5em;
  outline: none;
  text-align: center;
  font-size: 1.5em;
  color: #fff;
  border-radius: 0.3em;
  border: 1px solid rgba(253, 253, 253, 0.363);
  background-color: rgb(255 255 255 / 0.05);
}

.form .inputs input:focus {
  border: 1px solid rgb(99 102 241);
}

.resend {
  color: #fff;
  margin-top: 10px;
  font-size: 15px;
  text-align: center;
}

.resend-action {
  text-decoration: none;
  cursor: pointer;
  margin-left: 6px;
  color: rgb(255, 255, 255);
  font-weight: 600;
}

.resend-action:hover {
  text-decoration: underline #2b8af7;
}

.validate {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  text-decoration: none;
  background-color: #606c88;
  padding: 10px 20px;
  margin: 8px 0 0 0;
  font-size: 13px;
  font-weight: 600;
  border-radius: 10px;
  transition: .3s ease;
}

.validate:hover {
  background-color: #3f4c6b;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #3f4c6b;
  height: 30px;
  width: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 600;
  transition: .3s ease;
}

.close:hover {
  background-color: rgba(255, 0, 0, 0.603);
}
</style>
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
              <form>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" class="form-control"  name="email" placeholder="Enter Your Email">
                </div>
                <div class="mb-3 d-grid" >
                  <button type="submit" class="btn btn-primary" @click="submitCreate()" >
                    Reset Password
                  </button>
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
                    <h5>Forgot Password Success</h5>
                    <p class="mb-2">Below is your account and password </p>
                </div>
                <div class="row">
                    <div class="col-4">
                        Tài Khoản: 
                    </div>
                    <div class="col">

                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        Mật Khẩu: 
                    </div>
                    <div class="col">

                    </div>
                </div>
                <div class="mt-3 d-grid" >
                  <!-- <router-link to="/Login" >
                    <button type="submit" class="btn btn-primary"  >
                      Back to Login
                    </button>
                  </router-link> -->
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

    const check= ref(true)
    const info = ref({
        email : "",
        password:""
    })
    const submitCreate  = async()=>{
            try {
                console.log("1");
                await axios.post("http://localhost:8888/users/forgot",{
                    email:info.value.email,
                }
                ).then(response =>{
                    console.log(response.data[0].password ,"test here");
                    if ( response.data[0].email=== info.value.email ) {
                        check.value=false
                        console.log("2");
                        
                    }
                    else{
                        console.log("error");
                    }
                })
            } catch (error) {
                console.log("3",error);
            }
    }
</script>
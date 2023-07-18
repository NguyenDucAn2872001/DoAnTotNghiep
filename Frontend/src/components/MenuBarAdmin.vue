<template>
    <div id="bg-left" style="height: 100vh;">
        <div class="text-center pt-4 fw-bold fs-2">
            Dash Board
        </div>
        <div style="width: 100%;display: flex;justify-content: center;height: 90%;">
            <div style="width: 80%;margin-top: 100px; position: relative;">
                <router-link to="/ManageClient" style="z-index: 2;">
                    <button style="width: 100%;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Quản lý tài khoản
                        </span>
                    </button>               
                </router-link> 
                <router-link to="/ManageClient/ManageDocument" style="z-index: 2;">
                    <button style="width: 100%;margin-top: 20px;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Quản lý tài liệu
                        </span>
                    </button>               
                </router-link>         
                <router-link to="/ManageClient/ContributionStatistics" style="z-index: 2;">
                    <button style="width: 100%;margin-top: 20px;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Thống Kê Tài Khoản
                        </span>
                    </button>               
                </router-link> 
                <router-link to="/ManageClient/AccountStatistics" style="z-index: 2;">
                    <button style="width: 100%;margin-top: 20px;">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front text" style="font-size: 16px;"> Thống Kê Tài Liệu
                        </span>
                    </button>               
                </router-link>
                <button class="Btn12 ms-4" @click="LogOut" style="position: absolute;bottom: 20px;">
                    <div class="sign12"><i class="fa-solid fa-circle-arrow-left text-light" style="font-size: 30px;"></i></div>              
                    <div class="text12 ms-5">Đăng xuất</div>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router'
import Swal from "sweetalert2";

const router = useRouter()
const LogOut =()=>{
  Swal.fire({
  title: 'Đăng xuất?',
  text: "Bạn có muốn đăng xuất không!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Đăng xuất!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
          icon: 'success',
          title: 'Đăng xuất thành công',
          showConfirmButton: false,
          timer: 1000
      })
      setTimeout(function(){   
        router.push("/")
      }, 1000);
    }
  })
}
</script>